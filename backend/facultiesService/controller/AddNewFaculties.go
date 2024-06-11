package controller

import (
	"facultiesService/database"
	"facultiesService/models"
	"github.com/gofiber/fiber/v2"
)

// AddNewFaculties /*TODO:AddNewFaculties -> Добавление нового факультета
func AddNewFaculties(context *fiber.Ctx) error {
	// Разобрать тело запроса на карту
	var requestData map[string]interface{}
	if err := context.BodyParser(&requestData); err != nil {
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Не удалось проанализировать тело запроса.",
		})
	}

	// Извлеки и проверь поля имени и ReductionFacultyName.
	name, nameOk := requestData["name"].(string)
	reductionName, reductionNameOk := requestData["reduction_faculty_name"].(string)
	if !nameOk || !reductionNameOk {
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Неверные входные данные",
		})
	}

	// Создайте новый экземпляр факультета
	faculty := models.Faculty{
		Name:                 name,
		ReductionFacultyName: reductionName,
	}

	// Сохрани новый факультет в базу данных
	if err := database.DB.Create(&faculty).Error; err != nil {
		// Проверь, не связана ли ошибка с повторяющимся именем сокращения.
		if database.DB.Where("reduction_faculty_name = ?", reductionName).First(&models.Faculty{}).Error == nil {
			return context.Status(fiber.StatusConflict).JSON(fiber.Map{
				"error": "Название факультета : сокращения уже существует",
			})
		}
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Не удалось создать факультет.",
		})
	}

	// Вернуть успешный ответ
	return context.JSON(fiber.Map{
		"message": "Факультет создан успешно",
		"faculty": faculty,
	})
}
