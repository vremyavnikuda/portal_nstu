package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
	"github.com/streadway/amqp"
	"strconv"
	"user_auth_controller/database"
	"user_auth_controller/models"
)

// UpdateUserData TODO API User_Auth_Controller: UpdateUserData() -> функция обновления информации о пользователя
func UpdateUserData(context *fiber.Ctx) error {
	id := context.Params("id")

	if id == "" {
		pterm.Warning.Printfln("Users: ID пользователя не указан")
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "ID пользователя не указан",
		})
	}

	_, err := strconv.Atoi(id)

	if err != nil {
		pterm.Warning.Printfln("Users: ID пользователя должен быть числом")
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "ID пользователя должен быть числом",
		})
	}
	var user models.Users

	if err := database.DB.First(&user, id).Error; err != nil {
		pterm.Fatal.Printfln("Users: Пользователь не найден", "error", err)
		return context.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Пользователь не найден",
		})
	}

	// Парсинг данных из запроса
	var requestData map[string]interface{}
	if err := context.BodyParser(&requestData); err != nil {
		pterm.Warning.Printfln("Ошибка при парсинге данных запроса", err)
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Ошибка при обновлении данных пользователя",
		})
	}

	// Обновление данных пользователя с использованием WHERE-условия
	if err := database.DB.Model(&user).Where("user_id = ?", id).Updates(requestData).Error; err != nil {
		pterm.Warning.Printfln("Ошибка при обновлении данных пользователя в базе данных", err)
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Ошибка при обновлении данных пользователя",
		})
	}

	// Если роль обновлена до "студента", добавляем пользователя в таблицу студентов
	if role, ok := requestData["role"]; ok && role == "Студент" {
		// Объединяем имя, фамилию и отчество пользователя
		fullname := fmt.Sprintf("%s %s %s", user.FirstName, user.LastName, user.MiddleName)

		// Получаем подключение к RabbitMQ
		rabbitMQ, err := database.GetConnection()
		if err != nil {
			pterm.Fatal.Printfln("Failed to connect to RabbitMQ: %v", err)
			return err
		}
		defer rabbitMQ.Close()

		// Создаем канал для ошибок
		errors := make(chan *amqp.Error)
		rabbitMQ.NotifyClose(errors)

		// Проверяем состояние подключения
		go func() {
			err := <-errors
			if err != nil {
				pterm.Warning.Printfln("Connection to RabbitMQ lost: %v", err)
			}
		}()

		// Создаем студента
		student := models.Student{
			UserID:   user.UserID,
			FullName: fullname,
			// Здесь вы можете установить GroupId, если у вас есть информация о группе
			// GroupId: groupId,
		}

		// Конвертируем студента в JSON
		body, err := json.Marshal(student)
		if err != nil {
			pterm.Warning.Printfln("Failed to marshal body: %v", err)
			return err
		}

		channel, err := rabbitMQ.Channel()
		if err != nil {
			pterm.Warning.Printfln("Failed to create channel: %v", err)
		}

		// Отправляем сообщение в RabbitMQ
		err = channel.Publish(
			"",           // exchange
			"queue-name", // routing key
			false,        // mandatory
			false,        // immediate
			amqp.Publishing{
				ContentType: "application/json",
				Body:        body,
			})

		if err != nil {
			pterm.Warning.Printfln("Failed to publish message: %v", err)
			return err
		}

		pterm.Info.Printfln("Пользователь %v обновлен", fullname)

		// Добавляем студента в базу данных
		result := database.DB.Create(&student)
		if result.Error != nil {
			pterm.Warning.Printfln("Failed to create student in database: %v", result.Error)
			return result.Error
		}
	}

	pterm.Info.Printfln("Данные пользователя успешно обновлены")
	return context.JSON(fiber.Map{
		"message": "success",
	})

	pterm.Info.Printfln("Данные пользователя успешно обновлены")
	return context.JSON(fiber.Map{
		"message": "success",
	})
}
