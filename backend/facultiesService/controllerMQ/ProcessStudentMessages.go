package controllerMQ

import (
	"encoding/json"
	"errors"
	"facultiesService/connections"
	"facultiesService/database"
	"facultiesService/models"
	"fmt"
	"github.com/pterm/pterm"
	"gorm.io/gorm"
	"log"
)

type StudentMessage struct {
	UserID   int    `json:"UserID"`
	FullName string `json:"FullName"`
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

	doneCh := make(chan struct{})
	go func() {
		defer close(doneCh)
		defer fmt.Println("Consumer stopped")
		for {
			select {
			case <-stopCh:
				fmt.Println("Stop signal received. Stopping consumer.")
				return
			case d, ok := <-msgs:
				if !ok {
					fmt.Println("Channel closed. Stopping consumer.")
					return
				}
				fmt.Println("Received a message:", string(d.Body))

				if len(d.Body) == 0 {
					pterm.Info.Printfln("Received empty message. Skipping.")
					continue
				}

				var studentMessage StudentMessage
				if err := json.Unmarshal(d.Body, &studentMessage); err != nil {
					pterm.Error.Printfln("Failed to unmarshal message: %v", err)
					continue
				}
				log.Println("Received student:", studentMessage)

				var existingStudent models.Student
				if err := database.DB.Where("user_id = ?", studentMessage.UserID).First(&existingStudent).Error; err != nil {
					if errors.Is(err, gorm.ErrRecordNotFound) {
						student := models.Student{
							ID:   uint(studentMessage.UserID),
							FullName: studentMessage.FullName,
						}

						if err := database.DB.Create(&student).Error; err != nil {
							pterm.Error.Printfln("Failed to add student to database: %v", err)
							continue
						}
						log.Println("Student added to database:", student)
					} else {
						pterm.Error.Printfln("Failed to query database: %v", err)
					}
				} else {
					log.Println("Student already exists in the database:", existingStudent)
				}
			}
		}
	}()

	pterm.Info.Printfln(" [*] Waiting for messages. To exit press CTRL+C")
	<-doneCh
	return nil
}
