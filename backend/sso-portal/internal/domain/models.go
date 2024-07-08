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

// App TODO: это модель данных представляет собой приложения для которых необходима регистрация
// соответственно токен генерируется для доступа к ним
// Нужна дальше реализовать логику работы
type App struct {
	ID      int64
	NameApp string
}
