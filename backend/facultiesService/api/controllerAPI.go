package api

import (
	"facultiesService/controller"
	"github.com/gofiber/fiber/v2"
)

func SetupAPI(app *fiber.App) {

	//Add new faculties
	app.Post("/api/post/facultyService/addNewFaculties", func(ctx *fiber.Ctx) error {
		return controller.AddNewFaculties(ctx)
	})
	app.Post("/api/post/facultyService/addNewGroup", func(ctx *fiber.Ctx) error {
		return controller.AddNewGroup(ctx)
	})

	//Ger all faculties
	app.Get("/api/get/facultyService/getAllFaculties", controller.GetAllFaculties)
	app.Get("/api/get/facultyService/getAllGroups", controller.GetAllGroups)
}
