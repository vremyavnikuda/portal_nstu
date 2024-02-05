package main

import (
	"facultiesService/database"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/pterm/pterm"
)

func main() {

	app := fiber.New()
	title := "facultiesService"

	const port string = ":8002"
	database.Connect()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:4200",
		AllowHeaders:     "Origin, Content-Type, Accept,Access-Control-Allow-Origin",
	}))

	pterm.Info.Printfln("%s is running on port %s", title, port)
	app.Listen(port)
}
