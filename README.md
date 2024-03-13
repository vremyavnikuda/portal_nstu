# NSTU
## Структура проекта
~~~
portal_nstu/
|-- backend/
|   |-- user-temporary-data-service/
|   |   |-- controller/
|   |   |   |-- temporaryDataController.go
|   |   |-- database/
|   |   |   |-- user_repository.go
|   |   |-- models/
|   |   |   |-- RegistrationData.go
|   |   |   |-- user.go
|   |   |   |-- user_temporary_data.go
|   |   |-- routes/
|   |   |   |-- routes.go
|   |   |-- main.go
|   |   |-- go.mod
|   |   |-- go.sum
|   |   |-- .env
|   |-- user-auth-controller/
|   |   |-- controllers/
|   |   |   |-- authController.go
|   |   |-- database/
|   |   |   |-- connection.go
|   |   |   |-- connectionRabbitMQ.go
|   |   |-- models/
|   |   |   |   |-- photo/
|   |   |   |-- tempUserTemporaryData.go
|   |   |   |-- user.go
|   |   |-- routes/
|   |   |   |-- routes.go
|   |   |-- main.go
|   |   |-- go.mod
|   |   |-- go.sum
|   |   |-- .env
|-- frontend/
|   |-- src/
|   |   |-- app/
|   |   |   |-- compontent/
|   |   |   |   |-- ...
|   |   |   |-- emitters/
|   |   |   |   |-- ...
|   |   |   |-- pages/
|   |   |   |   |-- ...
|   |   |   |-- services/
|   |   |   |   |-- ...
|   |   |-- app.component.spec.ts
|   |   |-- app.component.ts
|   |   |-- app.config.ts
|   |   |-- app.routes.ts
|   |   |-- angular.json
|   |   |-- package.json
|   |   |-- ...
|-- docker-compose.yml
 
