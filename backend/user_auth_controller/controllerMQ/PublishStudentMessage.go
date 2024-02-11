package controllerMQ

import (
	"encoding/json"
	"fmt"
	"github.com/pterm/pterm"
	"github.com/streadway/amqp"
	"log"
	"user_auth_controller/database"
	"user_auth_controller/models"
)

type StudentMessage struct {
	UserID   uint
	FullName string
}

func PublishStudentMessage(requestData map[string]interface{}, user models.Users, currentRole string, newRole string) error {
	if newRole, ok := requestData["role"]; ok && newRole == "Студент" && currentRole != "Студент" {
		fullname := fmt.Sprintf("%s %s %s", user.FirstName, user.LastName, user.MiddleName)

		message := StudentMessage{
			UserID:   user.UserID,
			FullName: fullname,
		}

		body, err := json.Marshal(message)
		if err != nil {
			log.Printf("Failed to marshal body: %v", err)
			return err
		}

		rabbitMQ, err := database.GetConnection()

		ch, err := rabbitMQ.Channel()
		if err != nil {
			log.Printf("Failed to open a channel: %v", err)
			return err
		}
		defer rabbitMQ.Close()

		q, err := ch.QueueDeclare(
			"studentFacultyService",
			true,
			false,
			false,
			false,
			nil)
		if err != nil {
			log.Printf("Failed to declare a queue: %v", err)
		}
		fmt.Println(q)

		err = ch.Publish(
			"",
			"studentFacultyService",
			false,
			false,
			amqp.Publishing{
				ContentType: "text/plain",
				Body:        body,
			})

		if err != nil {
			log.Printf("Failed to publish a message: %v", err)
		}
		pterm.Info.Printfln("Студент %s добавлен в очередь RabbitMQ", fullname)
	}
	return nil
}
