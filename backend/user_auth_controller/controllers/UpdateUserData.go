package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
	"strconv"
	"user_auth_controller/controllerMQ"
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
	controllerMQ.PublishStudentMessage(requestData, user, "", "")

	// Возврат успешного ответа
	return context.JSON(fiber.Map{
		"message": "success",
	})
}
