package main

import (
	"facultiesService/connections"
	"facultiesService/controllerMQ"
	"facultiesService/database"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/pterm/pterm"
	"github.com/streadway/amqp"
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
	rabbitMQ, err := connections.GetConnection()
	if err != nil {
		pterm.Fatal.Printfln("Failed to connect to RabbitMQ: %v", err)
	} else {
		pterm.Info.Printfln("rabbitMQURL works port:amqp://guest:guest@rabbitmq:5672/")
	}
	//Подключение к брокеру RabbitMQ
	rabbitMQ.NotifyClose(make(chan *amqp.Error))

	stopCh := make(chan struct{})
	defer close(stopCh)

	if err := controllerMQ.ProcessStudentMessages(stopCh); err != nil {
		pterm.Warning.Printfln("Error processing messages: %v", err)
	}

	pterm.Info.Printfln("%s is running on port %s", title, port)
	app.Listen(port)
}
