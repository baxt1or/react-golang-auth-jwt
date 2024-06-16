package models

import (
	"errors"
	"strings"
)

type User struct {
	ID        int64  `json:"ID"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Username  string `json:"username"`
}
func (user *User) Validate() error {
	user.FirstName = strings.TrimSpace(user.FirstName)
	user.LastName = strings.TrimSpace(user.LastName)
	user.Email = strings.TrimSpace(user.Email)

	if user.Email == ""{
		return errors.New("Invalid Email")
	}

	user.Password = strings.TrimSpace(user.Password)

	if user.Password == ""{
		return errors.New("Invalid Password")
	}
	user.Username = strings.TrimSpace(user.Username)

	return nil
}