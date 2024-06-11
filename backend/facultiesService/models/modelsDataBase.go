package models

// Faculty структура представляет факультет
type Faculty struct {
	ID                   uint   `gorm:"primaryKey"`
	Name                 string
	ReductionFacultyName string `gorm:"unique"`
	Groups               []Group `gorm:"foreignKey:FacultyID"`
}

// Group структура представляет группу
type Group struct {
	ID                   uint   `gorm:"primaryKey"`
	// Внешний ключ для связи с Faculty
	FacultyID            uint   `gorm:"index"`
	Name                 string
	Students             []Student `gorm:"foreignKey:GroupID"`
}

// Student структура представляет студента
type Student struct {
	ID       uint   `gorm:"primaryKey"`
	FullName string
	// Внешний ключ для связи с Group
	GroupID  uint   `gorm:"index"`
	Status   string
}

type FacultyData struct {
	FacultyRefer uint
	GroupRefer   uint
	StudentRefer uint
	Faculty      Faculty   `gorm:"ForeignKey:FacultyRefer"`
	Group        Group     `gorm:"ForeignKey:GroupRefer"`
	Student      []Student `gorm:"ForeignKey:StudentRefer"`
}

/*
models.Users
user_auth_controller -> база данных Пользователей
*/
type Users struct {
	UserID     uint   `gorm:"primary key; autoIncrement" json:"id"`
	Login      string `gorm:"unique" json:"login"`
	FirstName  string `json:"first_name"`
	LastName   string `json:"last_name"`
	MiddleName string `json:"middle_name"`
	UserAge    string `json:"user_age"`
	Email      string `gorm:"unique" json:"email"`
	Password   []byte `json:"password"`
	Gender     string `json:"gender"`
	BDays      string `json:"b_days"`
	Role       string `json:"role"`
}
