package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/pterm/pterm"
	"github.com/streadway/amqp"
	"user_auth_controller/api"
	"user_auth_controller/database"
)

func main() {
	app := fiber.New()
	title := "user_auth_controller"

	/**TODO:
	при локальной разработке port = 8000
	при деплое в продакшэн заменить на port = 8080
	*/

	const port string = ":8000"
	database.Connect()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:4200",
		AllowHeaders:     "Origin, Content-Type, Accept,Access-Control-Allow-Origin",
	}))

	//RabbitMQ
	rabbitMQ, err := database.GetConnection()
	if err != nil {
		pterm.Fatal.Printfln("Failed to connect to RabbitMQ: %v", err)
	}

	//Подключение к брокеру RabbitMQ
	rabbitMQ.NotifyClose(make(chan *amqp.Error))
	api.Setup(app)

	if err != nil {
		pterm.Fatal.Printfln("Failed to connect to RabbitMQ: %v", err)
		return
	} else {
		pterm.Info.Printfln("Connected to RabbitMQ")
	}

	if port == ":8080" {
		pterm.Info.Printfln("Running on port 8080 🐳", title)
		pterm.Info.Printfln("Database connection")
		pterm.Info.Printfln("Routing works")
	} else {
		pterm.Info.Printfln("Running on port 8000 🖥", title)
		pterm.Info.Printfln("Database connection")
		pterm.Info.Printfln("Routing works")
	}
	pterm.Info.Printfln("rabbitMQURL works port:amqp://guest:guest@rabbitmq:5672/")
	app.Listen(port)
}
