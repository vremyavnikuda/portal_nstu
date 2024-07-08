package migrate

import (
	"github.com/pressly/goose/v3"
	"github.com/pterm/pterm"
	db2 "sso-portal/cmd/db"
)

// Migrate TODO: Это миграция
func Migrate() {
	db, err := db2.DB.DB()
	if err != nil {
		pterm.Error.Printfln("failed to connect to database: %v", err)
	}
	if err := goose.SetDialect("postgres"); err != nil {
		pterm.Error.Printfln("failed to set dialect: %v", err)
	}

	if err := goose.Up(db, "cmd/db/migrations"); err != nil {
		panic(err)
	}

	pterm.Info.Println("database migrated successfully")
}
