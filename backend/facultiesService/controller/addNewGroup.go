package controller

import (
	"errors"
	"facultiesService/database"
	"facultiesService/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

/*
TODO:AddNewGroup
Добавление новой группы к факультету
*/

// AddNewGroup Метод для добавления новой группы
func AddNewGroup(context *fiber.Ctx) error {
	// Разобрать тело запроса на карту
	var requestData map[string]interface{}
	if err := context.BodyParser(&requestData); err != nil {
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Не удалось проанализировать тело запроса.",
		})
	}

	// Извлечь и проверить ReductionFacultyName
	reductionFacultyName, ok := requestData["reduction_faculty_name"].(string)
	if !ok || reductionFacultyName == "" {
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Недействителен или отсутствует: reduction_faculty_name",
		})
	}

	// Проверьте, существует ли факультет
	var faculty models.Faculty
	if err := database.DB.Where("reduction_faculty_name = ?", reductionFacultyName).First(&faculty).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return context.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "Факультет не найден",
			})
		}
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Не удалось запросить факультет",
		})
	}

	// Извлеките и проверьте имя группы
	groupName, ok := requestData["name"].(string)
	if !ok || groupName == "" {
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Неверное или отсутствующее имя группы.",
		})
	}

	// Создать новую группу
	group := models.Group{
		Name:      groupName,
		FacultyID: faculty.ID,
	}

	// Сохраните новую группу в базе данных.
	if err := database.DB.Create(&group).Error; err != nil {
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Не удалось создать группу",
		})
	}

	// Вернуть успешный ответ
	return context.JSON(fiber.Map{
		"message": "Группа успешно создана",
		"group":   group,
	})
}
