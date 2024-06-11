package database

import (
	"facultiesService/models"
	"fmt"
	"github.com/joho/godotenv"
	"github.com/pterm/pterm"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
	"path/filepath"
)

var DB *gorm.DB

func Connect() {
	wd, err := os.Getwd()
	if err != nil {
		pterm.Fatal.Printfln("Error getting working directory: %v", err)
	}

	envPath := filepath.Join(wd, ".env")

	err = godotenv.Load(envPath)
	if err != nil {
		pterm.Fatal.Printfln("Error loading .env file: %v", err)
	}

	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_DATABASE")
	dbUser := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai", dbHost, dbUser, dbPassword, dbName, dbPort)

	//Подключение к базе данных postgres
	connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("Cloud not connect to the database")
		return
	}

	pterm.Debug.Printfln("DSN: %s", dsn)
	DB = connection
	err = connection.AutoMigrate(&models.Faculty{}, &models.Group{}, &models.Student{})
	if err != nil {
		pterm.Fatal.Printfln("Error migrating database:  %v", err)
	}
}
