package main

import (
	"fmt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"log"
	"log/slog"
	"net"
	"os"
	"sso-portal/cmd/db"
	pb "sso-portal/gen/go/sso"
	"sso-portal/internal/config"
	sAPI "sso-portal/internal/grpc/auth"
	"sso-portal/internal/migrate"
)

const (
	envLocal = "local"
	envDev   = "dev"
	envProd  = "prod"
)

func main() {
	//Написать объект конфига
	//подключаем конфиг
	cfg := config.MustLoad()

	//подключаем базу данных
	db.Connect(cfg.Postgres)

	//инициализировать логгер
	setupLogger(cfg.Env)
	//Выполняем миграцию
	migrate.Migrate()

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", cfg.GRPC.Port))
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterUserServiceServer(s, &sAPI.ServerAPI{})
	reflection.Register(s)
	log.Printf("Server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}

func setupLogger(env string) *slog.Logger {
	var log *slog.Logger

	switch env {
	case envLocal:
		log = slog.New(
			slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}),
		)
	case envDev:
		log = slog.New(
			slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}),
		)
	case envProd:
		log = slog.New(
			slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}),
		)
	}
	return log
}
