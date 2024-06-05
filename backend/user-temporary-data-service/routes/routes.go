package routes

import (
	"github.com/gofiber/fiber/v2"
	"user-temporary-data-service/controller"
)

/*
API user-temporary-data-service
*/

func Setup(app *fiber.App) {

	//GET /api/user-temporary-data
	// получить данные о всех пользователях
	app.Get("/api/user-temporary-data/getAllUsers", controller.GetAllTemporaryData)
	//получить информацию о пользователе по id
	app.Get("/api/user-temporary-data/getUserInfo/:id", controller.GetUserInfo)
	app.Get("/api/user-temporary-data/deleteUserTemporaryData/:id", controller.DeleteUserTemporaryData)

	//Получить данные о пользователе
	//POST -> отправить запросы
	app.Delete("/api/user-temporary-data/deleteUserTemporaryData/:id", controller.DeleteUserTemporaryData)
	app.Post("api/user-temporary-data/addUserDataRegistration", controller.AddUserDataRegistration)
	//Получение формы обратной связи с портала
	app.Post("api/user-temporary-data/postHandleProposal", controller.HandleProposal)
}
