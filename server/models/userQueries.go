package models

import (
	"errors"
	"fmt"
	"github/baxt1or/auth-jwt/db"
)

var (
    queryInsertUser = "INSERT INTO users (first_name, last_name, email, password, username) VALUES (?, ?, ?, ?, ?);"
	queryGetUserByEmail = "SELECT id, first_name, last_name, email, password, username FROM users WHERE email=?;"
	queryGetById = "SELECT id, first_name, last_name, email, username FROM users WHERE id=?;"
)


func (user *User) Save() error {
	stmt, err := db.Client.Prepare(queryInsertUser)
	if err != nil {
		return errors.New("database error")
	}
	defer stmt.Close()

	insertResult, saveErr := stmt.Exec(user.FirstName, user.LastName, user.Email, user.Password, user.Username)
	if saveErr != nil {
		fmt.Println(saveErr)
		return errors.New("database error")
	}

	userID, err := insertResult.LastInsertId()
	if err != nil {
		return errors.New("database error")
	}
	user.ID = userID
	return nil
}

func (user *User) GetByEmail() error {
    smt, err := db.Client.Prepare(queryGetUserByEmail)

	if err != nil {
		return errors.New("database error")
	}
	defer smt.Close()

	queryResult := smt.QueryRow(user.Email)
	
	if err:=queryResult.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.Username); err != nil{
		return errors.New("database error")
	}

	return nil
}


func (user *User) GetByID() error {
	stmt, err := db.Client.Prepare(queryGetById)
	if err != nil {
		return errors.New("Database Error")
	}
	defer stmt.Close()

	result := stmt.QueryRow(user.ID)
	if getErr := result.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Username); getErr != nil {
		return errors.New("Database Error")
	}
	return nil
}

