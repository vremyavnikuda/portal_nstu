package db

import (
	"fmt"
	"github.com/pterm/pterm"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"sso-portal/internal/config"
)

var DB *gorm.DB

func Connect(cfg config.PostgresConfig) {
	dns := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s", cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.DBName, cfg.SSLMode)

	var err error
	DB, err = gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		pterm.Fatal.Printf("Failed to connect to database: %v\n", err)
	}
	pterm.Info.Println("Connected to database")
}
