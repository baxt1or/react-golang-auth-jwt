package models

import (
	"errors"
	"fmt"
	"github/baxt1or/auth-jwt/db"
)

var (
    queryInsertUser = "INSERT INTO users (first_name, last_name, email, password, username, bio) VALUES (?, ?, ?, ?, ?, ?);"
	queryGetUserByEmail = "SELECT id, first_name, last_name, email, password, username, bio FROM users WHERE email=?;"
	queryGetById = "SELECT u.ID, u.first_name, u.last_name, u.email, u.password, u.username, u.bio, b.ID, b.title, b.content, b.user_id, b.subtitle, b.category, b.status, b.location FROM users u LEFT JOIN blogs b ON u.ID = b.user_id WHERE u.ID = ?;"
)


func (user *User) Save() error {
	stmt, err := db.Client.Prepare(queryInsertUser)
	if err != nil {
		return errors.New("Database Error : Failed to Execute the Query" )
	}
	defer stmt.Close()

	insertResult, saveErr := stmt.Exec(user.FirstName, user.LastName, user.Email, user.Password, user.Username, user.Bio)
	if saveErr != nil {
		fmt.Println(saveErr)
		return errors.New("Database Error : Failed to Scan the Query")
	}

	userID, err := insertResult.LastInsertId()
	if err != nil {
		return errors.New("Database Error : Failed to reurn User ID")
	}
	user.ID = userID
	return nil
}


func (user *User) GetByEmail() error {
    smt, err := db.Client.Prepare(queryGetUserByEmail)

	if err != nil {
		return errors.New("Database Error : Failed to Execute the Query")
	}
	defer smt.Close()

	queryResult := smt.QueryRow(user.Email)
	
	if err:=queryResult.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.Username, &user.Bio); err != nil{
		return errors.New("Database Error : Failed to Scan the Query")
	}

	return nil
}


// func (user *User) GetByID() error {
//     rows, err := db.Client.Query(queryGetById, user.ID)
//     if err != nil {
//         return errors.New("Database Error: Failed to execute query")
//     }
//     defer rows.Close()

//     var blogs []Blog
//     var found bool

//     for rows.Next() {
//         var blog Blog
//         if err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email,&user.Password, &user.Bio, &blog.ID, &blog.Title, &blog.Content,&blog.UserID,&blog.Subtitle, &blog.Category, &blog.Status, &blog.Location);err != nil {
//             return errors.New("Database Error: Failed to scan row")
//         }
//         if blog.ID != 0 {
//             blogs = append(blogs, blog)
//         }
//         found = true
//     }

//     if !found {
//         return errors.New("User not found")
//     }

//     user.Blog = blogs
//     return nil
// }

func (user *User) GetByID() error {
	rows, err := db.Client.Query(queryGetById, user.ID)
	if err != nil {
		return fmt.Errorf("Database Error: Failed to execute query: %v", err)
	}
	defer rows.Close()

	var blogs []Blog
	var found bool

	for rows.Next() {
		var u User
		var b Blog

		if err := rows.Scan(&u.ID, &u.FirstName, &u.LastName, &u.Email, &u.Password, &u.Username, &u.Bio,
			&b.ID, &b.Title, &b.Content, &b.UserID, &b.Subtitle, &b.Category, &b.Status, &b.Location); err != nil {
			return fmt.Errorf("Database Error: Failed to scan row: %v", err)
		}

		
		if b.ID != 0 {
			blogs = append(blogs, b)
		}

		found = true
	}

	if !found {
		return errors.New("User not found")
	}

	user.Blog = blogs
	return nil
}