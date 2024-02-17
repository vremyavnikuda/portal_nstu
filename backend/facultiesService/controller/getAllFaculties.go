package controller

import (
	"facultiesService/database"
	"facultiesService/models"
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
)

func GetAllFaculties(context *fiber.Ctx) error {
	var faculties []models.Faculty
	database.DB.Find(&faculties)
	pterm.Info.Printfln("GetAllFaculties: %v", faculties)
	return context.JSON(faculties)
}
