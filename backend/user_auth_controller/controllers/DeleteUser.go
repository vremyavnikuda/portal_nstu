package controllers

import (
	"fmt"
	"github.com/go-resty/resty/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
	"user_auth_controller/database"
	"user_auth_controller/models"
)

// DeleteUser TODO API User_Auth_Controller: DeleteUser-> функция удаления пользователя
// DeleteUser deletes a user from the database.
func DeleteUser(context *fiber.Ctx) error {

	id := context.Params("id")

	var user models.Users

	// Check if the ID is empty
	if id == "" {
		pterm.Fatal.Printfln("Id cannot empty")
	}

	// Delete the user from the database
	if err := database.DB.Delete(&user, id).Error; err != nil {
		pterm.Fatal.Printfln("Failed to delete user: %v", err)
		return err
	}

	deleteUserTemporaryDataAPI := fmt.Sprintf("http://localhost:8001/api/user-temporary-data/deleteUserTemporaryData/%s", id)
	resp, err := resty.New().R().Delete(deleteUserTemporaryDataAPI)
	if err != nil {
		pterm.Fatal.Printfln("Failed to delete user temporary data: %v", err)
		return err
	}

	if resp.StatusCode() != 200 {
		// Handle non-200 status code
		return context.Status(resp.StatusCode()).JSON(fiber.Map{
			"error": fmt.Sprintf("Failed to delete user temporary data. Status: %d", resp.StatusCode()),
		})
	}

	pterm.Info.Printfln("User with ID %v deleted", id)
	return context.JSON(fiber.Map{
		"message": "success",
	})
}