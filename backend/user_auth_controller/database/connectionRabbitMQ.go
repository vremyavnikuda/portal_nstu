package database

import (
	"github.com/pterm/pterm"
	"github.com/streadway/amqp"
	"sync"
	"time"
)

/*
"amqp://guest:guest@localhost:5672/" localhost:5672
"amqp://guest:guest@rabbitmq:5672/" docker compose up
*/
const rabbitMQURL = "amqp://guest:guest@localhost:5672/"

var once sync.Once
var conn *amqp.Connection
var connErr error

// GetConnection Подключение к брокеру RabbitMQ
func GetConnection() (*amqp.Connection, error) {
	conn, err := amqp.Dial(rabbitMQURL)
	if err != nil {
		pterm.Fatal.Printfln("Failed to connect to RabbitMQ: %v", err)
		return nil, err
	}

	go func() {
		for {
			if conn.IsClosed() {
				pterm.Warning.Printfln("RabbitMQ connection closed. Reconnecting...")
				conn, err = amqp.Dial(rabbitMQURL)
				if err != nil {
					pterm.Error.Printfln("Failed to reconnect to RabbitMQ: %v", err)
				} else {
					pterm.Info.Printfln("Reconnected to RabbitMQ")
				}
			}
			time.Sleep(5 * time.Second)
		}
	}()

	return conn, nil
}
