package models

// FacultyData
// Структура для хранения данных о факультете, группе и студенте который относится к группе и факультету

type FacultyData struct {
	NameFacultyAbbreviation string `gorm:"unique" json:"NameFacultyAbbreviation"` //Идентификатор факультета
	NameFaculty             int    `json:"NameFaculty"`                           //Идентификатор факультета
	NameGroup               int    `gorm:"unique" json:"NameGroup"`               //Идентификатор группы
	IdStudent               int    `gorm:"primary key" json:"IdStudent"`          //Идентификатор студента
	StatusStudent           string `json:"StatusStudent"`                         //Статус студента
}
