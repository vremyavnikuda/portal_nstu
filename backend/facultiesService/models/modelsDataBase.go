package models

type Faculty struct {
	UserID uint   `gorm:"primary key"`
	Name   string `gorm:"unique"`
}

type Group struct {
	UserID    uint   `gorm:"primary key"`
	Name      string `gorm:"unique"`
	FacultyId int    `gorm:"ForeignKey:FacultyRefer"`
}

type Student struct {
	UserID   uint   `json:"UserID"`
	FullName string `json:"FullName"`
	GroupId  int    `gorm:"ForeignKey:GroupRefer"`
	Status   string
}

type FacultyData struct {
	FacultyRefer uint
	GroupRefer   uint
	Faculty      Faculty `gorm:"ForeignKey:FacultyRefer"`
	Group        Group   `gorm:"ForeignKey:GroupRefer"`
	Student      []Student
}
