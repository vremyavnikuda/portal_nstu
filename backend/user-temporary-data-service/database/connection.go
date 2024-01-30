package database

import (
	"github.com/pterm/pterm"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"user-temporary-data-service/models"
)

var DB *gorm.DB

func Connect() {

	//TODO:
	/**
	при локальной разработке host = localhost
	при деплое в продакшэн заменить на host = postgres
	*/
	dsn := "host=localhost user=postgres password=25101989 dbname=postgres port=5432 sslmode=disable TimeZone=Asia/Shanghai"

	//Подключение к базе данных postgres
	connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		pterm.Fatal.Printfln("Cloud not connect to the database")
	}

	DB = connection

	connection.AutoMigrate(&models.User_temporary_data{})

}
