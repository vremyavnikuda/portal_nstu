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
		pterm.Error.Printfln("Failed to retrieve faculties: %v", err)
		// Возвращает статус внутренней ошибки сервера 500 с сообщением об ошибке.
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve faculties",
		})
	}

	// Зарегистрируйте полученные факультеты для целей отладки.
	pterm.Info.Printfln("GetAllFaculties: %v", faculties)

	// Верните факультеты в виде ответа JSON.
	return context.JSON(fiber.Map{
		"message":   "Faculties retrieved successfully",
		"faculties": faculties,
	})
}
