package models

type UserTemporaryData struct {
	UserID           uint   `json:"id"`
	Login            string `gorm:"unique" json:"login"`
	RegistrationData string `json:"registration_data"`
	BDay             string `json:"BDay"`
	UserAge          string `json:"user_age"`
	LastLogin        string `json:"last_login"`
	Status           string `json:"status"`
}
