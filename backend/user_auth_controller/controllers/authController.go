package controllers

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/go-resty/resty/v2"
	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
	"github.com/pterm/pterm"
	"golang.org/x/crypto/bcrypt"
	"strconv"
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

// UpdateUserData TODO API User_Auth_Controller: UpdateUserData() -> функция обновления информации о пользователя
func UpdateUserData(context *fiber.Ctx) error {
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

	// Парсинг данных из запроса
	var requestData map[string]interface{}
	if err := context.BodyParser(&requestData); err != nil {
		pterm.Warning.Printfln("Ошибка при парсинге данных запроса", err)
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Ошибка при обновлении данных пользователя",
		})
	}

	// Обновление данных пользователя с использованием WHERE-условия
	if err := database.DB.Model(&user).Where("user_id = ?", id).Updates(requestData).Error; err != nil {
		pterm.Warning.Printfln("Ошибка при обновлении данных пользователя в базе данных", err)
		return context.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Ошибка при обновлении данных пользователя",
		})
	}

	pterm.Info.Printfln("Данные пользователя успешно обновлены")
	return context.JSON(fiber.Map{
		"message": "success",
	})
}
