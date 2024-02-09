package controllers

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
	"time"
	"user_auth_controller/database"
	"user_auth_controller/models"
)

// User TODO API User_Auth_Controller: User -> функция получения данных о пользователях
func User(context *fiber.Ctx) error {

	cookie := context.Cookies("jwt-token")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		context.Status(fiber.StatusUnauthorized)
		pterm.Warning.Printfln("Нет авторизированных пользователей ", err)
		return context.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}
	claims := token.Claims.(*jwt.StandardClaims)

	var user models.Users
	var userUTD models.UserTemporaryData

	/** TODO:
	Горутина получения данных о последней авторизации пользователя в системе
	*/
	//Открываем канал для получении данных о последней авторизации пользователя в системе
	done := make(chan bool)

	go func(userID string, done chan bool) {
		defer func() {
			done <- true
		}()

		currentTime := time.Now().Format("2006-01-02")
		updateValues := map[string]interface{}{"last_login": currentTime}

		if err := database.DB.Model(&userUTD).Where("user_id = ?", userID).Updates(updateValues).Error; err != nil {
			pterm.Fatal.Printfln("Ошибка обновления db: user_temporary_data, значение last_login не было установлено", "error", err)
		}

		pterm.Info.Printfln("Дата последней авторизации было успешно добавлена")
	}(claims.Issuer, done)
	<-done

	database.DB.Where("user_id = ?", claims.Issuer).First(&user)
	pterm.Info.Printfln("Данные о %v успешно получены", user.Login)
	return context.JSON(user)
}
