package controller

import (
	"facultiesService/database"
	"facultiesService/models"
	"fmt"
	"github.com/gofiber/fiber/v2"
)

/*TODO:AddNewGroup
Добавление новой группы к факультету

*/

func AddNewGroup(context *fiber.Ctx) error {
	var dataBase map[string]interface{}

	if err := context.BodyParser(&dataBase); err != nil {
		return err
	}

	group := models.Group{
		Name:                 fmt.Sprintf("%v", dataBase["name"]),
		ReductionFacultyName: dataBase["reduction_faculty_name"].(string),
	}

	// Добавляем группу в базу данных
	database.DB.Create(&group)
	return context.JSON(fiber.Map{
		"message": "ok",
	})
}
