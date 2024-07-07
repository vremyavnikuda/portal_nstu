package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/pterm/pterm"
	"user-temporary-data-service/database"
	"user-temporary-data-service/routes"
)

func main() {

	app := fiber.New()

	/**TODO:
	при локальной разработке port = 8001
	при деплое в продакшэн заменить на port = 8082
	*/
	const port string = ":8001"
	title := "user_temporary_data_service"
	database.Connect()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))
	routes.Setup(app)

	if port == ":8082" {
		pterm.Info.Printfln("App: user_temporary_data_service : Running on port 8082 🐳", title)
		pterm.Info.Printfln("Database connection")
		pterm.Info.Printfln("Routing works")
	} else {
		pterm.Info.Printfln("App: user_temporary_data_service : Running on port 8001 🖥", title)
		pterm.Info.Printfln("Database connection")
		pterm.Info.Printfln("Routing works")
	}

	app.Listen(port)
}
