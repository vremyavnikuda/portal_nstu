package controller

import (
	"strconv"
	"time"
	"user-temporary-data-service/database"
	"user-temporary-data-service/models"

	"github.com/pterm/pterm"

	"github.com/gofiber/fiber/v2"
)

// User_temporary_data

var dataBase map[string]string

// GetAllTemporaryData -> получить данные о всех пользователях
func GetAllTemporaryData(context *fiber.Ctx) error {

	var users []models.User_temporary_data

	database.DB.Find(&users)
	if err := database.DB.Error; err != nil {
		pterm.Fatal.Printfln("User_temporary_data: Ошибка при получении данных: ", err)
		return err
	}

	if len(users) == 0 {
		pterm.Fatal.Printfln("User_temporary_data: Пользователи не найдены")
		return context.JSON([]models.User_temporary_data{})
	}
	pterm.Info.Printfln("User_temporary_data: Пользователи получены")
	return context.JSON(users)
}

// GetUserInfo -> получить данные о конкретном пользователе по id
func GetUserInfo(context *fiber.Ctx) error {

	id := context.Params("id")

	if id == "" {
		pterm.Warning.Printfln("User_temporary_data: ID пользователя не указан")
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "ID пользователя не указан",
		})
	}

	_, err := strconv.Atoi(id)
	if err != nil {
		pterm.Warning.Printfln("User_temporary_data: ID пользователя должен быть числом")
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "ID пользователя должен быть числом",
		})
	}

	var user models.User_temporary_data
	if err := database.DB.First(&user, id).Error; err != nil {
		pterm.Fatal.Printfln("User_temporary_data: Пользователь не найден", "error", err)
		return context.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Пользователь не найден",
		})
	}

	pterm.Info.Printfln("User_temporary_data: Пользователь успешно найден")

	return context.JSON(user)
}

// AddUserDataRegistration Устанавливаем дату регистрации пользователя
func AddUserDataRegistration(context *fiber.Ctx) error {
	time.Sleep(15 * time.Second)
	var requestBody models.RegistrationData

	if err := context.BodyParser(&requestBody); err != nil {
		return err
	}

	if requestBody.Login == "" {
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Логин не может быть пустым",
		})
	}

	if requestBody.RegistrationData == "" {
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Дата регистрации не может быть пустой",
		})
	}

	var user models.User_temporary_data
	var userUAC models.Users

	// Убедимся, что у нас есть пользователя с данным логином
	if err := database.DB.Where("login = ?", requestBody.Login).First(&user).Error; err != nil {
		pterm.Warning.Printfln("User_temporary_data: Пользователь не найден", "error", err)
		return context.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Пользователь не найден",
		})
	}
	if err := database.DB.Where("login = ?", requestBody.Login).First(&userUAC).Error; err != nil {
		pterm.Warning.Printfln("Users: Пользователь не найден", "error", err)
		return context.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Пользователь не найден",
		})
	}

	// Устанавливаем дату регистрации
	user.RegistrationData = requestBody.RegistrationData

	// Обновляем запись пользователя с новой датой регистрации
	if err := database.DB.Model(&user).Where("login = ?", user.Login).Updates(&user).Error; err != nil {
		pterm.Fatal.Printfln("User_temporary_data: Ошибка при добавлении даты регистрации", "error", err)
		return context.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Ошибка при добавлении даты регистрации",
		})
	}

	pterm.Info.Printfln("User_temporary_data: Дата регистрации успешно добавлена")

	//Канал для синхронизации завершения выполнения горутины
	done := make(chan bool)

	/**TODO:
	Получаем дату рождения userCopy(User_temporary_data) и ageAddUserTemporaryData(Users)
	Вычисляем возраст пользователя
	Обновляем записи о возрасте и дате рождения пользователя в базе данных
	Закрываем канал синхронизации завершения выполнения горутины
	*/
	go func(userCopy models.User_temporary_data, ageAddUserTemporaryData models.Users, done chan bool) {
		defer func() {
			//Сигнал о завершении выполнения горутины
			done <- true
		}()
		birthday, err := time.Parse("2006-01-02", userCopy.BDay)
		if err != nil {
			pterm.Fatal.Printfln("User_temporary_data: Ошибка при добавлении возраста пользователя", "error", err)
			return
		}
		currentDate := time.Now()

		// Вычисляем возраст пользователя
		age := currentDate.Year() - birthday.Year()
		// Проверяем, если текущая дата еще не достигла даты рождения в текущем году
		if currentDate.YearDay() < birthday.YearDay() {
			age--
		}

		ageStr := strconv.Itoa(age)
		updateValues := map[string]interface{}{"user_age": ageStr}
		if err := database.DB.Model(&userCopy).Where("login = ?", userCopy.Login).Updates(updateValues).Error; err != nil {
			pterm.Fatal.Printfln("Ошибка при обновлении возраста пользователя в базе данных User_temporary_data", "error", err)
		}

		updateValuesUAC := map[string]interface{}{"user_age": ageStr}
		if err := database.DB.Model(&ageAddUserTemporaryData).Where("login = ?", ageAddUserTemporaryData.Login).Updates(updateValuesUAC).Error; err != nil {
			pterm.Fatal.Printfln("Ошибка при обновлении возраста пользователя в базе данных Users", "error", err)
		}

		pterm.Info.Printfln("Возраст пользователя:", age, "лет")
	}(user, userUAC, done)

	// Ожидаем завершения выполнения горутины
	<-done

	return context.JSON(fiber.Map{
		"message": "Дата регистрации успешно добавлена",
		"user":    user, // Возвращаем только необходимые данные пользователя
	})
}

// DeleteUserTemporaryData -> удалить пользователя
// DELETE -> /api/user-temporary-data/deleteUserTemporaryData/:id
// Вызывается на deleteUserTemporaryDataAPI
func DeleteUserTemporaryData(context *fiber.Ctx) error {
	id := context.Params("id")

	var UserTemporaryData models.User_temporary_data

	if id == "" {
		pterm.Warning.Printfln("User_temporary_data: ID пользователя не указан")
	}

	if err := database.DB.Delete(&UserTemporaryData, id).Error; err != nil {
		pterm.Fatal.Printfln("User_temporary_data: Пользователь не удален", "error", err)
	}

	pterm.Info.Printfln("Пользователь успешно удален")
	return context.JSON(fiber.Map{
		"message": "success",
	})
}
