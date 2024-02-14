package api

import (
	"facultiesService/controller"
	"github.com/gofiber/fiber/v2"
)

func SetupAPI(app *fiber.App) {

	//Add new faculties
	app.Post("/api/post/facultyService/addFacultiesService", func(ctx *fiber.Ctx) error {
		return controller.AddNewFaculties(ctx)
	})
	//Ger all faculties
	//app.Get("/api/get/facultyService/getAllFacultiesService", controller.GetAllFaculties)
}
