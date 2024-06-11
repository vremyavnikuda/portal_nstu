package controller

import (
	"facultiesService/database"
	"facultiesService/models"
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
)

// GetAllFaculties -> Получаем список факультетов
func GetAllFaculties(context *fiber.Ctx) error {
	var faculties []models.Faculty

	// Запросить базу данных, чтобы найти все факультеты и предварительно загрузить связанные группы и студентов
	if err := database.DB.Preload("Groups.Students").Find(&faculties).Error; err != nil {
		// Логирование ошибки
		pterm.Error.Printfln("Не удалось получить факультеты: %v", err)
		// Возвращает статус внутренней ошибки сервера 500 с сообщением об ошибке.
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Не удалось получить факультеты.",
		})
	}

	// Зарегистрируй полученные факультеты для отладки.
	pterm.Info.Printfln("GetAllFaculties: %v", faculties)

	// Верни факультеты в виде ответа JSON.
	return context.JSON(fiber.Map{
		"message":   "Факультеты успешно получены",
		"faculties": faculties,
	})
}
