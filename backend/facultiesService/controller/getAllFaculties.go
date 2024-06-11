package controller

import (
	"facultiesService/database"
	"facultiesService/models"
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
)

func GetAllFaculties(context *fiber.Ctx) error {
	var faculties []models.Faculty

	// Запросить базу данных, чтобы найти все факультеты
	if err := database.DB.Preload("Groups").Find(&faculties).Error; err != nil {
		// Зарегистрировать ошибку
		pterm.Error.Printfln("Не удалось получить факультеты.: %v", err)
		// Возвращает статус внутренней ошибки сервера 500 с сообщением об ошибке.
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Не удалось получить факультеты.",
		})
	}

	// Зарегистрируйте полученные факультеты для целей отладки.
	pterm.Info.Printfln("GetAllFaculties: %v", faculties)

	// Верните факультеты в виде ответа JSON.
	return context.JSON(fiber.Map{
		"message":   "Факультеты успешно восстановлены",
		"faculties": faculties,
	})
}
