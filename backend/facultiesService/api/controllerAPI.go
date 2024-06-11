package api

import (
	"facultiesService/controller"
	"github.com/gofiber/fiber/v2"
)

// SetupAPI -> API
func SetupAPI(app *fiber.App) {

	//api добавить новый факультет
	app.Post("/api/post/facultyService/addNewFaculties", func(ctx *fiber.Ctx) error {
		return controller.AddNewFaculties(ctx)
	})
	//api добавить новую группу
	app.Post("/api/post/facultyService/addNewGroup", func(ctx *fiber.Ctx) error {
		return controller.AddNewGroup(ctx)
	})

	//api получить все факультеты
	app.Get("/api/get/facultyService/getAllFaculties", controller.GetAllFaculties)
	app.Get("/api/get/facultyService/getAllGroups", controller.GetAllGroups)

	//Отравляем данные о факультете студента на api
	app.Get("/api/get/facultyService/getFacultyInfoStudent", controller.GetFacultyInfoStudent)
}
