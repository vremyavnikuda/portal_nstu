package controllerMQ

import (
	"encoding/json"
	"facultiesService/connections"
	"facultiesService/database"
	"facultiesService/models"
	"fmt"
	"log"
)

type StudentMessage struct {
	UserID   uint   `json:"user_id"`
	FullName string `json:"full_name"`
}

func ProcessStudentMessages(stopCh <-chan struct{}) error {
	rabbitMQ, err := connections.GetConnection()

	if err != nil {
		return fmt.Errorf("failed to connect to RabbitMQ: %v", err)
	}
	defer rabbitMQ.Close()

	channel, err := rabbitMQ.Channel()
	if err != nil {
		return fmt.Errorf("failed to create channel: %v", err)
	}
	defer channel.Close()

	msgs, err := channel.Consume(
		"studentFacultyService",
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return fmt.Errorf("failed to register a consumer: %v", err)
	}

	forever := make(chan bool)
	go func() {
		for d := range msgs {
			fmt.Println("Received a message:", string(d.Body))

			var studentMessage StudentMessage
			if err := json.Unmarshal(d.Body, &studentMessage); err != nil {
				log.Printf("Failed to unmarshal message: %v", err)
				continue
			}

			student := models.Student{
				UserID:   studentMessage.UserID,
				FullName: studentMessage.FullName,
				// Здесь вы можете установить GroupId и Status в соответствии с вашей логикой
			}

			result := database.DB.Create(&student)
			if result.Error != nil {
				log.Printf("Failed to add student to database: %v", result.Error)
			}

		}
	}()
	fmt.Println(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever
	return nil
}
