package controller

import (
	"facultiesService/database"
	"facultiesService/models"
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
)

// GetAllGroups -> Получаем список групп
func GetAllGroups(context *fiber.Ctx) error {
	var groups []models.Group
	// Запрос в базу данных на получение списка групп
	if err := database.DB.Preload("Students").Find(&groups).Error; err != nil {
		pterm.Error.Printfln("Не удалось получить список групп: %v", err)
		// Возвращает статус внутренней ошибки сервера 500 с сообщением об ошибке.
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Не удалось получить список групп",
		})
	}

	pterm.Info.Printfln("Список групп: %v", groups)

	//JSON ответ с группами.
	return context.JSON(fiber.Map{
		"message": "Список групп",
		"groups":  groups,
	})
}
