package auth

import (
	"context"
	"fmt"
	"github.com/pterm/pterm"
	"golang.org/x/crypto/bcrypt"
	"sso-portal/cmd/db"
	pb "sso-portal/gen/go/sso"
	"sso-portal/internal/domain"
)

type ServerAPI struct {
	pb.UnimplementedUserServiceServer
}

func (s *ServerAPI) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.UserResponse, error) {
	password, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {

		pterm.Fatal.Printfln("failed to hash password: %v", err)
		return nil, fmt.Errorf("failed to hash password: %v", err)
	}

	user := domain.Users{
		Login:      req.Login,
		FirstName:  req.FirstName,
		LastName:   req.LastName,
		MiddleName: req.MiddleName,
		UserAge:    req.UserAge,
		Email:      req.Email,
		Password:   password,
		Role:       req.Role,
		Gender:     req.Gender,
		BDays:      req.BDays,
	}

	db.DB.Create(&user)

	return &pb.UserResponse{
		User: &pb.User{
			Id:         user.UserID,
			Login:      user.Login,
			FirstName:  user.FirstName,
			LastName:   user.LastName,
			MiddleName: user.MiddleName,
			UserAge:    user.UserAge,
			Email:      user.Email,
			Gender:     user.Gender,
			BDays:      user.BDays,
			Role:       user.Role,
		},
	}, nil
}

func (s *ServerAPI) Login(ctx context.Context, req *pb.LoginRequest) (*pb.LoginResponse, error) {
	var user domain.Users
	db.DB.Where("email = ?", req.Email).First(&user)

	if user.UserID == 0 {
		return nil, fmt.Errorf("user not found")
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(req.Password)); err != nil {
		return nil, fmt.Errorf("incorrect password")
	}

	// Generate token (for simplicity, we use a dummy token here)
	token := "dummy-token"

	return &pb.LoginResponse{Token: token}, nil
}

func (s *ServerAPI) Logout(ctx context.Context, req *pb.LogoutRequest) (*pb.LogoutResponse, error) {
	// Perform logout logic
	return &pb.LogoutResponse{Message: "logged out"}, nil
}

func (s *ServerAPI) DeleteUser(ctx context.Context, req *pb.DeleteUserRequest) (*pb.UserResponse, error) {
	var user domain.Users
	if err := db.DB.Delete(&user, req.Id).Error; err != nil {
		return nil, err
	}

	return &pb.UserResponse{User: &pb.User{Id: req.Id}}, nil
}

func (s *ServerAPI) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.UserResponse, error) {
	var user domain.Users
	if err := db.DB.First(&user, req.Id).Error; err != nil {
		return nil, err
	}

	return &pb.UserResponse{
		User: &pb.User{
			Id:         user.UserID,
			Login:      user.Login,
			FirstName:  user.FirstName,
			LastName:   user.LastName,
			MiddleName: user.MiddleName,
			UserAge:    user.UserAge,
			Email:      user.Email,
			Gender:     user.Gender,
			BDays:      user.BDays,
			Role:       user.Role,
		},
	}, nil
}

func (s *ServerAPI) GetAllUsers(ctx context.Context, req *pb.Empty) (*pb.AllUsersResponse, error) {
	var users []domain.Users
	db.DB.Find(&users)

	var pbUsers []*pb.User
	for _, user := range users {
		pbUsers = append(pbUsers, &pb.User{
			Id:         user.UserID,
			Login:      user.Login,
			FirstName:  user.FirstName,
			LastName:   user.LastName,
			MiddleName: user.MiddleName,
			UserAge:    user.UserAge,
			Email:      user.Email,
			Gender:     user.Gender,
			BDays:      user.BDays,
			Role:       user.Role,
		})
	}

	return &pb.AllUsersResponse{Users: pbUsers}, nil
}

func (s *ServerAPI) UpdateUser(ctx context.Context, req *pb.UpdateUserRequest) (*pb.UserResponse, error) {
	var user domain.Users
	if err := db.DB.First(&user, req.Id).Error; err != nil {
		return nil, err
	}

	user.Login = req.User.Login
	user.FirstName = req.User.FirstName
	user.LastName = req.User.LastName
	user.MiddleName = req.User.MiddleName
	user.UserAge = req.User.UserAge
	user.Email = req.User.Email
	user.Password = []byte(req.User.Password)
	user.Gender = req.User.Gender
	user.BDays = req.User.BDays
	user.Role = req.User.Role

	if err := db.DB.Save(&user).Error; err != nil {
		return nil, err
	}

	return &pb.UserResponse{
		User: &pb.User{
			Id:         user.UserID,
			Login:      user.Login,
			FirstName:  user.FirstName,
			LastName:   user.LastName,
			MiddleName: user.MiddleName,
			UserAge:    user.UserAge,
			Email:      user.Email,
			Gender:     user.Gender,
			BDays:      user.BDays,
			Role:       user.Role,
		},
	}, nil
}
