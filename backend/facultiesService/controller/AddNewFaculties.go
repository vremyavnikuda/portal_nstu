package controller

import (
	"github.com/gofiber/fiber/v2"

	"facultiesService/database"
	"facultiesService/models"
)

// AddNewFaculties /*TODO:AddNewFaculties -> Добавление нового факультета
func AddNewFaculties(context *fiber.Ctx) error {
	var dataBase map[string]interface{}

	if err := context.BodyParser(&dataBase); err != nil {
		return err
	}

	faculty := models.Faculty{
		Name:                 dataBase["name"].(string),
		ReductionFacultyName: dataBase["reduction_faculty_name"].(string),
	}

	database.DB.Create(&faculty)
	return context.JSON(fiber.Map{
		"message": "ok",
	})
}
