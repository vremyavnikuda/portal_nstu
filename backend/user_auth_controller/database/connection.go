package database

import (
	"fmt"
	"github.com/joho/godotenv"
	"github.com/pterm/pterm"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"

	"user_auth_controller/models"
)

var DB *gorm.DB

func Connect() {
	// Load the .env file
	godotenv.Load()

	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_DATABASE")
	dbUser := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")

	// Log the DSN for debugging purposes
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai", dbHost, dbUser, dbPassword, dbName, dbPort)

	//Подключение к базе данных postgres
	connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		pterm.Fatal.Println("Облако не подключается к базе данных")
	}

	pterm.Debug.Printfln("DSN: %s", dsn)
	DB = connection
	connection.AutoMigrate(&models.Users{})
}
