package database

import (
	"github.com/pterm/pterm"
	"github.com/streadway/amqp"
	"sync"
	"time"
)

const rabbitMQURL = "amqp://guest:guest@localhost:5672/"
const queueName = "user_info_queue"

var once sync.Once
var conn *amqp.Connection
var connErr error

// GetConnection Подключение к брокеру RabbitMQ
func GetConnection() (*amqp.Connection, error) {
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
