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
/*
RemoveStudentFromGroup -> Удаление пользователя из базы данных студентов
*/
func RemoveStudentFromGroup(context *fiber.Ctx) error {
	// Извлеките student_id из параметров запроса
	studentID := context.Params("id")
	pterm.Debug.Printfln("Удаление студента из группы: %s", studentID)

	// Преобразуйте student_id в целое число
	studentIDInt, err := strconv.ParseUint(studentID, 10, 64)
	if err != nil {
		pterm.Error.Printfln("Не удалось разобрать id: %s", studentID)
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Неверный ID",
		})
	}

	// Найдите студента по идентификатору в базе данных
	var student models.Student
	if err := database.DB.First(&student, studentIDInt).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			pterm.Debug.Printfln("Студент с id не найден: %s", studentID)
			return context.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "Студент не найден",
			})
		}
		pterm.Error.Printfln("Ошибка базы данных: %v", err)
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Ошибка базы данных",
		})
	}

	// Удалите студента из базы данных
	if err := database.DB.Delete(&student).Error; err != nil {
		pterm.Error.Printfln("Не удалось удалить студента: %v", err)
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Не удалось удалить студента",
		})
	}

	// Лог успешного удаления
	pterm.Debug.Printfln("Студент с id %s успешно удален", studentID)

	// Вернуть успешный ответ
	return context.JSON(fiber.Map{
		"message": "Студент успешно удален из группы",
	})
}
