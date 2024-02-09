package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
	"strconv"
	"user_auth_controller/database"
	"user_auth_controller/models"
)

// GetUserInfo TODO API User_Auth_Controller: GetUserInfo() -> функция получения информации о пользователе
// Получаем информацию о пользователе
func GetUserInfo(context *fiber.Ctx) error {
	id := context.Params("id")

	if id == "" {
		pterm.Warning.Printfln("Users: ID пользователя не указан")
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "ID пользователя не указан",
		})
	}

	_, err := strconv.Atoi(id)
	if err != nil {
		pterm.Warning.Printfln("Users: ID пользователя должен быть числом")
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "ID пользователя должен быть числом",
		})
	}

	var user models.Users

	if err := database.DB.First(&user, id).Error; err != nil {
		pterm.Fatal.Printfln("Users: Пользователь не найден", "error", err)
		return context.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Пользователь не найден",
		})
	}

	pterm.Info.Printfln("Users: Пользователь успешно найден")

	return context.JSON(user)
}
