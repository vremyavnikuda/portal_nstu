package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
	"time"
)

// Logout TODO API User_Auth_Controller: Logout -> Деавторизация пользователя
// посредством удаления cookie файлов (установления сроков хранения файлов cookie)
func Logout(context *fiber.Ctx) error {

	cookie := fiber.Cookie{
		Name:     "jwt-token",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}
	context.Cookie(&cookie)

	pterm.Info.Printfln("App:Login out")
	return context.JSON(fiber.Map{
		"message": "success",
	})
}
