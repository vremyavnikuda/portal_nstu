package database

import (
	"fmt"
	"github.com/joho/godotenv"
	"github.com/pterm/pterm"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
	"path/filepath"
	"user-temporary-data-service/models"
)

var DB *gorm.DB

func Connect() {

	//TODO:
	/**
	при локальной разработке host = localhost
	при деплое в продакшэн заменить на host = postgres
	*/
	wd, err := os.Getwd()
	if err != nil {
		pterm.Fatal.Printfln("Error getting working directory: %v", err)
	}

	// Construct the absolute path to the .env file
	envPath := filepath.Join(wd, ".env")

	// Load the .env file
	err = godotenv.Load(envPath)
	if err != nil {
		pterm.Fatal.Printfln("Error loading .env file: %v", err)
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
		fmt.Println("Cloud not connect to the database")
		return
	}

	DB = connection

	connection.AutoMigrate(&models.User_temporary_data{})

}
