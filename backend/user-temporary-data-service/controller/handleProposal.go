package controller

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/pterm/pterm"
	"os"
	"path/filepath"
)

// HandleProposal -> получение формы обратной связи с портала
// и обработка на стороне сервера.
func HandleProposal(c *fiber.Ctx) error {
	form, err := c.MultipartForm()
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid form data")
	}

	proposal := form.Value["proposal"]
	if len(proposal) == 0 {
		return c.Status(fiber.StatusBadRequest).SendString("Proposal is required")
	}
	pterm.Info.Printfln("Received Proposal:", proposal[0])

	files := form.File["files"]
	for _, file := range files {
		src, err := file.Open()
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error opening file")
		}
		defer src.Close()

		dst, err := os.Create(filepath.Join("uploads", file.Filename))
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
