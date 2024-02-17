package controller

import (
	"facultiesService/database"
	"facultiesService/models"
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
)

func GetAllGroups(context *fiber.Ctx) error {
	var groups []models.Group
	database.DB.Find(&groups)
	pterm.Info.Printfln("GetAllGroups: %v", groups)
	return context.JSON(groups)
}
