package database

import (
	"fmt"
	"github.com/joho/godotenv"
	"github.com/pterm/pterm"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
	"user-temporary-data-service/models"
)

var DB *gorm.DB

func Connect() {
	// Load the .env file
	err := godotenv.Load()
	if err != nil {
		pterm.Fatal.Printfln("Ошибка загрузки файла .env.: %v", err)
	}

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
		fmt.Println("Облако не подключается к базе данных")
		return
	}

	DB = connection

	err = connection.AutoMigrate(&models.User_temporary_data{})
	if err != nil {
		pterm.Fatal.Printfln("Неустранимая ошибка во время миграции: %v", err)
	}

}
