package api

import (
	"facultiesService/controller"
	"github.com/gofiber/fiber/v2"
)

// SetupAPI -> API
func SetupAPI(app *fiber.App) {

	//API: добавить новый факультет
	app.Post("/api/post/facultyService/addNewFaculties", func(ctx *fiber.Ctx) error {
		return controller.AddNewFaculties(ctx)
	})
	//API: добавить новую группу
	app.Post("/api/post/facultyService/addNewGroup", func(ctx *fiber.Ctx) error {
		return controller.AddNewGroup(ctx)
	})
	//API : добавить пользователя в базу данных студентов
	app.Post("/api/get/facultyService/AddUserInStudents/:id",controller.AddUserInStudents)

	//Удаление студента из базы данных студентов
	app.Post("/api/get/facultyService/RemoveStudentFromGroup/:id",controller.RemoveStudentFromGroup)

	//API: получить все факультеты
	app.Get("/api/get/facultyService/getAllFaculties", controller.GetAllFaculties)
	app.Get("/api/get/facultyService/getAllGroups", controller.GetAllGroups)

	//API: Отравляем данные о факультете студента на api
	app.Get("/api/get/facultyService/getFacultyInfoStudent", controller.GetFacultyInfoStudent)

	//API:Отобразить всех студентов
	app.Get("/api/get/facultyService/GetAllStudents",controller.GetAllStudents)


	//TODO: API: GetFacultyInfoStudent -> api для получения информации о факультете,группы студента

}
