package routes

import (
	"github.com/gofiber/fiber/v2"
	"user_auth_controller/controllers"
)

/*
API user_auth_controller
*/

func Setup(app *fiber.App) {

	//POST ./api/
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)

	//api DELETE user
	app.Delete("/api/deleteUser/:id", controllers.DeleteUser)
	app.Post("/api/logout", controllers.Logout)

	//GET ./api/
	app.Get("/api/user", controllers.User) //информация об авторизированном пользователе
	app.Get("/api/allUser", controllers.GetAllUser)
	app.Get("api/user-auth-controller/getUserInfo/:id", controllers.GetUserInfo)

	//PUT => Обновление данных о пользователе (естественно по :id)
	app.Put("api/user-auth-controller/updateUser/:id", controllers.UpdateUserData)

}
