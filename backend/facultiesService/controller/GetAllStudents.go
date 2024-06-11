package controller

import (
	"facultiesService/database"
	"facultiesService/models"
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
)

func GetAllStudents(context *fiber.Ctx) error {
	var students []models.Student

	// Запроси базу данных, чтобы найти всех студентов и предварительно загрузить соответствующие группы.
	if err := database.DB.Find(&students).Error; err != nil {
		// Зарегистрируй ошибку
		pterm.Error.Printfln("Не удалось получить студентов: %v", err)
		// Возвращает статус внутренней ошибки сервера 500 с сообщением об ошибке.
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Не удалось отобразить студентов.",
		})
	}

	// Зарегистрируй полученных студентов в целях отладки.
	pterm.Info.Printfln("GetAllStudents: %v", students)

	// Верни студентов в виде ответа JSON.
	return context.JSON(fiber.Map{
		"message":  "Студенты успешно получены",
		"students": students,
	})
}
