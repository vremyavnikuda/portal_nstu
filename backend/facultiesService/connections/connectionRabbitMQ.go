package connections

import (
	"github.com/joho/godotenv"
	"github.com/pterm/pterm"
	"github.com/streadway/amqp"
	"os"
	"sync"
	"time"
)

/*
"amqp://guest:guest@localhost:5672/" localhost:5672
"amqp://guest:guest@rabbitmq:5672/" docker compose up
*/
var once sync.Once
var conn *amqp.Connection
var connErr error

// GetConnection Подключение к брокеру RabbitMQ
func GetConnection() (*amqp.Connection, error) {
	godotenv.Load()
	rabbitMQURL := os.Getenv("RABBITMQURL")
	once.Do(func() {
		conn, connErr = amqp.Dial(rabbitMQURL)
		if connErr != nil {
			pterm.Fatal.Printfln("Failed to connect to RabbitMQ: %v", connErr)
		}

		go func() {
			for {
				if conn.IsClosed() {
					pterm.Warning.Printfln("RabbitMQ connection closed. Reconnecting...")
					conn, connErr = amqp.Dial(rabbitMQURL)
					if connErr != nil {
						pterm.Error.Printfln("Failed to reconnect to RabbitMQ: %v", connErr)
					} else {
						pterm.Info.Printfln("Reconnected to RabbitMQ")
					}
				}
				time.Sleep(5 * time.Second)
			}
		}()
	})
	return conn, connErr
}
