package models

type Faculty struct {
	UserID               uint `gorm:"primary key"`
	Name                 string
	ReductionFacultyName string `gorm:"unique"`
}

type Group struct {
	UserID               uint `gorm:"primary key"`
	Name                 string
	ReductionFacultyName string `gorm:"ForeignKey:ReductionFacultyName"`
}

type Student struct {
	UserID   uint   `json:"UserID"`
	FullName string `json:"FullName"`
	GroupId  uint   `gorm:"ForeignKey:GroupRefer"`
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
