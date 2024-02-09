package controllers

import (
	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
	"github.com/pterm/pterm"
	"golang.org/x/crypto/bcrypt"
	"time"
	"user_auth_controller/database"
	"user_auth_controller/models"
)

const SecretKey = "secretKey"

// Register TODO API User_Auth_Controller: Register Метод регистрации пользователя в базе данных
func Register(context *fiber.Ctx) error {
	var dataBase map[string]string

	if err := context.BodyParser(&dataBase); err != nil {
		return err
	}
	password, err := bcrypt.GenerateFromPassword([]byte(dataBase["password"]), 14)

	if err != nil {
		pterm.Fatal.Printfln("Ошибка при шифровании пароля", err)
		return err
	}

	user := models.Users{
		Login:      dataBase["login"],
		FirstName:  dataBase["first_name"],
		LastName:   dataBase["last_name"],
		MiddleName: dataBase["middle_name"],
		UserAge:    dataBase["user_age"],
		Email:      dataBase["email"],
		Password:   password,
		Role:       dataBase["role"],
		Gender:     dataBase["gender"],
		BDays:      dataBase["b_days"],
	}

	formDataBDay, err := time.Parse(time.RFC3339, dataBase["b_days"])
	formatedDataBDay := formDataBDay.Format("2006-01-02")
	database.DB.Create(&user)
	if err := database.DB.Model(&user).Where("login = ?", dataBase["login"]).Update("b_days", formatedDataBDay).Error; err != nil {
		pterm.Warning.Printfln("Ошибка при обновлении даты рождения пользователя", err)
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Failed to update user date of birth",
		})
	}

	//Параллельно выполняем передачу данных в UserTemporaryDataService -> db:UserTemporaryData
	//TODO:
	// передаем из базы данных Users (user_id, login, b_days) -> User_temporary_data(user_id, login, b_day)
	// Users(user_id) -> User_temporary_data(user_id)
	// User(login) -> User_temporary_data(login)
	// User(b_days) -> User_temporary_data(b_day)
	go func() {
		if err := database.DB.Create(&models.UserTemporaryData{
			UserID: user.UserID,
			BDay:   user.BDays,
			Login:  user.Login,
		}).Error; err != nil {
			pterm.Warning.Printfln("Ошибка при создании временных данных пользователя", err)
		}
	}()

	if err != nil {
		pterm.Fatal.Printfln("Ошибка при создании пользователя", err)
		return err
	}
	pterm.Info.Printfln("Пользователь: %v успешно создан ", user.Login)

	return context.JSON(user)
}
