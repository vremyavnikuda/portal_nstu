package run

import (
	"github.com/pterm/pterm"
	"os"
	"os/exec"
	"path/filepath"
)

func RunMicroservices() {
	// Сначала компилируем первый микросервис
	compileAndRunMicroservice("C:/repository/NSTU/backend/user_auth_controller")

	// Затем компилируем и запускаем второй микросервис
	compileAndRunMicroservice("C:/repository/NSTU/backend/user-temporary-data-service")

	// Запуск Angular-приложения (frontend)
	runAngularApp("C:/repository/NSTU/frontend")
}

func compileAndRunMicroservice(path string) {
	cmd := exec.Command("go", "build")
	cmd.Dir = path

	if err := cmd.Run(); err != nil {
		pterm.Fatal.Printfln("Ошибка при компиляции микросервиса: %v", err)
	}

	// Теперь у нас есть исполняемый файл, запускаем его
	runMicroservice(filepath.Join(path, filepath.Base(path)))
}

func runAngularApp(path string) {
	// Переходим в директорию frontend
	err := os.Chdir(path)
	if err != nil {
		pterm.Fatal.Printfln("Ошибка при переходе в директорию frontend: %v", err)
	}

	// Запускаем Angular-приложение
	cmd := exec.Command("ng", "serve")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		pterm.Fatal.Printfln("Ошибка при запуске Angular-приложения: %v", err)
	}
}
