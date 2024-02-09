package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
	"user_auth_controller/database"
	"user_auth_controller/models"
)

// GetAllUser TODO API User_Auth_Controller: GetAllUser -> функция получения всех пользователей
func GetAllUser(context *fiber.Ctx) error {
	var users []models.Users
	database.DB.Find(&users)

	if err := database.DB.Error; err != nil {
		pterm.Fatal.Printfln("Ошибка при получении пользователей из базы данных:", err)
		return err
	}

	if len(users) == 0 {
		pterm.Warning.Printfln("Пользователи не найдены")
		return context.JSON([]models.Users{})
	}
	pterm.Info.Printfln("Пользователи успешно получены")
	return context.JSON(users)
}
