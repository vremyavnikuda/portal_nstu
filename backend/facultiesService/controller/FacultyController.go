package controller

import "github.com/gofiber/fiber/v2"

// AddFaculty -> Вчера я остановился тут ,нужно добавить функцию добавления факультета , группы и студентов к группе и факультету/*
func AddFaculty(ctx *fiber.Ctx) error {

	return ctx.SendString("Hello, World!")
}
