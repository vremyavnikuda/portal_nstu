package controller

import (
	"errors"
	"facultiesService/database"
	"facultiesService/models"
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
	"gorm.io/gorm"
	"strconv"
)

/* @AddUserInStudents
API : добавить пользователя в базу данных студентов
*/
func AddUserInStudents(context *fiber.Ctx) error {
	// Извлечь идентификатор из параметров URL
	userID := context.Params("id")
	pterm.Debug.Printfln("Добавление пользователя в базу данных 'Students': %s", userID)

	// Преобразуем идентификатор в целое число
	userIDInt, err := strconv.ParseUint(userID, 10, 64) // Changed to ParseUint to match uint type
	if err != nil {
		pterm.Error.Printfln("Не удалось проанализировать id: %s", userID)
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid ID",
		})
	}

	// Найди пользователя в таблице «Пользователи».
	var user models.Users
	if err := database.DB.Where("user_id = ?", userIDInt).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			pterm.Debug.Printfln("Ни один пользователь не найден с id %s", userID)
			return context.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"message": "Пользователь не найден",
			})
		}
		pterm.Error.Printfln("Database error: %v", err)
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Ошибка базы данных",
		})
	}

	// Разбери тело запроса, чтобы получить GroupID
	var requestBody map[string]interface{}
	if err := context.BodyParser(&requestBody); err != nil {
		pterm.Error.Printfln("Не удалось проанализировать тело запроса.: %v", err)
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Неверное тело запроса",
		})
	}

	groupID, ok := requestBody["group_id"].(float64)
	if !ok || groupID == 0 {
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Недействителен или отсутствует group_id",
		})
	}

	//Существует ли GroupID?
	var group models.Group
	if err := database.DB.Where("id = ?", uint(groupID)).First(&group).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return context.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "Группа не найдена",
			})
		}
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Не удалось запросить группу",
		})
	}

	// Создай новую запись студента с данными пользователя и GroupID.
	student := models.Student{
		FullName: user.FirstName + " " + user.LastName + " " + user.MiddleName,
		GroupID:  uint(groupID),
		Status:   "active",
	}

	// Сохрани новую запись об студенте в базе данных
	if err := database.DB.Create(&student).Error; err != nil {
		pterm.Error.Printfln("Не удалось создать студента: %v", err)
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Не удалось создать студента",
		})
	}

	// Логирование успешного добавления
	pterm.Debug.Printfln("Пользователь %s добавлено студентам как %s", userID, student.FullName)

	// Вернуть успешный ответ
	return context.JSON(fiber.Map{
		"message": "Пользователь успешно добавлен в список студентов",
		"student": student,
	})
}
