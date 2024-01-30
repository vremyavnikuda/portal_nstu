package models

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
