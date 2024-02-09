package controllers

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
	"golang.org/x/crypto/bcrypt"
	"strconv"
	"time"
	"user_auth_controller/database"
	"user_auth_controller/models"
)

// Login TODO API User_Auth_Controller: Login Функция авторизации пользователя
func Login(context *fiber.Ctx) error {

	const host = "http://localhost:4200"

	// Set CORS headers
	context.Set("Access-Control-Allow-Origin", host)
	context.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	context.Set("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type")
	context.Set("Access-Control-Allow-Credentials", "true") // Allow credentials

	if context.Method() == fiber.MethodOptions {
		return nil
	}

	var dataBase map[string]string

	if err := context.BodyParser(&dataBase); err != nil {
		return err
	}

	var user models.Users

	database.DB.Where("email =?", dataBase["email"]).First(&user)

	if user.UserID == 0 {
		context.Status(fiber.StatusNotFound)
		pterm.Warning.Printfln("Пользователь не найден")
		return context.JSON(fiber.Map{
			"message": "user not found",
		})
	}

	//Проверка корректности ввода password пользователя
	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(dataBase["password"])); err != nil {
		context.Status(fiber.StatusBadRequest)
		pterm.Warning.Printfln("Неверный пароль")
		return context.JSON(fiber.Map{
			"message": "incorrect password",
		})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.UserID)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), //1 day
	})

	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		context.Status(fiber.StatusBadRequest)
		pterm.Warning.Printfln("Не удалось войти в приложение", err)
		return context.JSON(fiber.Map{
			"message": "could not login to app",
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt-token",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	pterm.Info.Printfln("Пользователь: успешно авторизовался в системе,SecretKey: был успешно сгенерирован ", user.Login, token)
	context.Cookie(&cookie)

	return context.JSON(fiber.Map{
		"message": "success",
	})
}
