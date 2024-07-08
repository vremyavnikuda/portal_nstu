package migrate

import (
	"github.com/pressly/goose/v3"
	"github.com/pterm/pterm"
	db2 "sso-portal/cmd/db"
)

// Migrate Это миграция goose
func Migrate() {
	db, err := db2.DB.DB()
	if err != nil {
		pterm.Error.Printfln("Failed to connect to database: %v", err)
	}
	if err := goose.SetDialect("postgres"); err != nil {
		pterm.Error.Printfln("Failed to set dialect: %v", err)
	}

	if err := goose.Up(db, "cmd/db/migrations"); err != nil {
		pterm.Fatal.Sprintfln("Failed to run migrations: %v", err)
	}

	pterm.Info.Println("Database migrated successfully")
}
