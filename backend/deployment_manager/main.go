package main

import (
	"deployment_manager/infoService"
	"deployment_manager/run"
	"github.com/pterm/pterm"
	"time"
)

func main() {
	// Запуск микросервисов
	run.RunMicroservices()

	// Мониторинг ресурсов (память)
	go func() {
		for {
			stat, err := infoService.GetMemoryUsage()
			if err != nil {
				pterm.Fatal.Printfln("Error: %v", err)
			} else {
				pterm.Info.Printfln("Memory: Size: %d MB, RSS: %d MB", stat.Size/1024/1024, stat.RSS/1024/1024)
			}

			time.Sleep(10 * time.Second)
		}
	}()


	select {}
}
