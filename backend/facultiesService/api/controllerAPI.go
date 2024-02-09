package api

import (
	"facultiesService/controller"
	"github.com/gofiber/fiber/v2"
)

func SetupAPI(app *fiber.App) {
	app.Post("/api/facultiesService/add_faculty", controller.AddFaculty)
}
