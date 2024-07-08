package domain

type Users struct {
	UserID     int64
	Login      string
	FirstName  string
	LastName   string
	MiddleName string
	UserAge    int64
	Email      string
	Password   []byte
	Role       string
	Gender     string
	BDays      string
}
type App struct {
	ID      int64
	NameApp string
}
