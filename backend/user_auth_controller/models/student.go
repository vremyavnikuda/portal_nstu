package models

type Student struct {
	UserID   uint `gorm:"primary key"`
	FullName string
	GroupId  int `gorm:"ForeignKey:GroupRefer"`
	Status   string
}
