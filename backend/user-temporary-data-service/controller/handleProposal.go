package controller

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
	"os"
	"path/filepath"
	"time"
)

// HandleProposal -> получение формы обратной связи с портала
// и обработка на стороне сервера.
func HandleProposal(c *fiber.Ctx) error {
	// Извлекаем многочастную форму из запроса
	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid form data")
	}

	// Извлекаем значение поля с именем "proposal"
	proposal := form.Value["proposal"]
	if len(proposal) == 0 {
		return c.Status(fiber.StatusBadRequest).SendString("Proposal is required")
	}
	pterm.Info.Printfln("Received Proposal:", proposal[0])

	// Генерируем имя папки на основе текущей даты и времени
	timestamp := time.Now().Format("20060102-150405")
	pterm.Info.Printfln("Timestamp:", timestamp)
	folderPath := filepath.Join("uploads", timestamp)
	pterm.Info.Printfln("FolderPath:", folderPath)

	// Создаем папку
	err = os.MkdirAll(folderPath, os.ModePerm)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error creating directory")
	}

	// Сохраняем текст предложения в файл
	proposalFile, err := os.Create(filepath.Join(folderPath, "proposal.txt"))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error creating proposal file")
	}
	defer func(proposalFile *os.File) {
		err := proposalFile.Close()
		if err != nil {
			pterm.Error.Printfln("Error closing proposal file: %v", err)
		}
	}(proposalFile)

	_, err = proposalFile.WriteString(proposal[0])
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Error saving proposal text")
	}

	// Извлекаем все файлы прикрепленные к форме, с помощью ключа "files"
	files := form.File["files"]
	// Перебираем все файлы, прикрепленные к форме
	for _, file := range files {
		src, err := file.Open()
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error opening file")
		}
		defer src.Close()

		dst, err := os.Create(filepath.Join(folderPath, file.Filename))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error creating file")
		}
		defer dst.Close()

		if _, err := dst.ReadFrom(src); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error saving file")
		}

		fmt.Println("Uploaded File:", file.Filename)
	}
	return c.SendString("Proposal submitted successfully!")
}
