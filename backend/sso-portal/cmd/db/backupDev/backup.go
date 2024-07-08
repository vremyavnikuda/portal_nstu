package backupDev

import (
	"fmt"
	"github.com/pterm/pterm"
	"os"
	"os/exec"
	"sso-portal/internal/config"
	"time"
)

// Backup создает резервную копию базы данных
func Backup() {
	timestamp := time.Now().Format("20060102_150405")
	backupFileName := fmt.Sprintf("/backup/db_backup_%s.sql", timestamp)

	cfg := config.MustLoad()

	cmd := exec.Command(
		"pg_dump",
		"-h"+cfg.Postgres.Host,
		"-U"+cfg.Postgres.User,
		"-p"+fmt.Sprintf("%d", cfg.Postgres.Port),
		"-d"+cfg.Postgres.DBName,
		"-f"+backupFileName,
	)
	cmd.Env = append(os.Environ(), "PGPASSWORD="+cfg.Postgres.Password)
	if err := cmd.Run(); err != nil {
		pterm.Fatal.Printf("Failed to backup database: %v\n", err)
		return
	}
	pterm.Info.Println("Database backup created successfully")
}

// Restore восстанавливает базу данных из резервной копии
func Restore(backUpFileName string) {
	cfg := config.MustLoad()

	cmd := exec.Command(
		"psql",
		"-h", cfg.Postgres.Host,
		"-U", cfg.Postgres.User,
		"-p", fmt.Sprintf("%d", cfg.Postgres.Port),
		"-d", cfg.Postgres.DBName,
		"-f", backUpFileName,
	)
	cmd.Env = append(os.Environ(), "PGPASSWORD="+cfg.Postgres.Password)
	if err := cmd.Run(); err != nil {
		pterm.Fatal.Printf("Failed to restore database: %v\n", err)
		return
	}
	pterm.Info.Println("Database restored successfully")
}

// DeleteOldBackUp удаляет старые резервные копии
func DeleteOldBackUp() {
	backupDir := "/backup"
	retentionPeriod := 30 * 24 * time.Hour // 30 дней

	files, err := os.ReadDir(backupDir)
	if err != nil {
		pterm.Fatal.Printf("Failed to read backup directory: %v\n", err)
		return
	}

	now := time.Now()

	for _, file := range files {
		if !file.IsDir() {
			fileInfo, err := file.Info()
			if err != nil {
				pterm.Error.Printf("Failed to get file info: %v\n", err)
				continue
			}

			if now.Sub(fileInfo.ModTime()) > retentionPeriod {
				err = os.Remove(backupDir + "/" + file.Name())
				if err != nil {
					pterm.Error.Printf("Failed to delete old backup: %v\n", err)
				} else {
					pterm.Info.Printf("Deleted old backup: %s\n", file.Name())
				}
			}
		}
	}
}
