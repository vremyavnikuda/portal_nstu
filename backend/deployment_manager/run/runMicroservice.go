package run

import (
	"github.com/pterm/pterm"
	"os"
	"os/exec"
)

func runMicroservice(command string, args ...string) {
	cmd := exec.Command(command, args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Start(); err != nil {
		pterm.Fatal.Printfln("Ошибка при запуске микросервиса: %v", err)
	}

	go func() {
		if err := cmd.Wait(); err != nil {
			pterm.Fatal.Printfln("Микросервис завершился с ошибкой: %v", err)
		}
	}()
}
