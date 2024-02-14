package controller

import (
	"facultiesService/database"
	"facultiesService/models"
	"github.com/gofiber/fiber/v2"
	"strconv"
)

/*Остановился тут ,проблема с маршалингом данных перед добавление в базу данных*/
func AddNewFaculties(context *fiber.Ctx) error {
	var dataBase map[string]string

	if err := context.BodyParser(&dataBase); err != nil {
		return err
	}

	userID, err := strconv.ParseUint(dataBase["user_id"], 10, 64)
	if err != nil {
		return err
	}

	faculty := models.Faculty{
		UserID: uint(userID),
		Name:   dataBase["name"],
	}

	database.DB.Create(&faculty)
	return context.JSON(fiber.Map{
		"message": "ok",
	})
}
