package main

import (
	"facultiesService/api"
	"facultiesService/connections"
	"facultiesService/controllerMQ"
	"facultiesService/database"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/pterm/pterm"
	"github.com/streadway/amqp"
	"log"
)

func main() {
	app := fiber.New(fiber.Config{
		Prefork: true,
	})

	if !fiber.IsChild() {
		fmt.Println("I'm the parent process")
	} else {
		fmt.Println("I'm a child process")
	}
	database.Connect()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:4200",
		AllowHeaders:     "Origin, Content-Type, Accept, Access-Control-Allow-Origin",
	}))

	rabbitMQ, err := connections.GetConnection()
	if err != nil {
		pterm.Fatal.Printfln("Failed to connect to RabbitMQ: %v", err)
	} else {
		pterm.Info.Printfln("rabbitMQURL works port:amqp://guest:guest@rabbitmq:5672/")
	}
	api.SetupAPI(app)

	//Подключение к брокеру RabbitMQ
	rabbitMQ.NotifyClose(make(chan *amqp.Error))
	if err != nil {
		pterm.Fatal.Printfln("Failed to connect to RabbitMQ: %v", err)
		return
	} else {
		pterm.Info.Printfln("Connected to RabbitMQ")
	}

	stopCh := make(chan struct{})

	go func() {
		if err := controllerMQ.ProcessStudentMessages(stopCh); err != nil {
			pterm.Warning.Printfln("Ошибка обработки сообщений: %v", err)
		}
	}()

	if err := app.Listen(":8080"); err != nil {
		log.Fatalf("Ошибка при запуске сервера: %v", err)
	}
}
