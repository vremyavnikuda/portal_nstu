package controller

import (
	"facultiesService/database"
	"facultiesService/models"
	"fmt"
	"github.com/gofiber/fiber/v2"
)

/*Остановился тут ,проблема с маршалингом данных перед добавление в базу данных*/
func AddNewFaculties(context *fiber.Ctx) error {
	var dataBase map[string]interface{}

	if err := context.BodyParser(&dataBase); err != nil {
		return err
	}

	faculty := models.Faculty{
		Name:                 fmt.Sprintf("%v", dataBase["name"]),
		ReductionFacultyName: fmt.Sprintf("%v", dataBase["reduction_faculty_name"]),
	}

	database.DB.Create(&faculty)
	return context.JSON(fiber.Map{
		"message": "ok",
	})
}
