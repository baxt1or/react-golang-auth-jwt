package services

import (
	"github/baxt1or/auth-jwt/models"

	"golang.org/x/crypto/bcrypt"
)

func CreateUser(user models.User) (*models.User, error) {
    if err := user.Validate(); err != nil {
        return nil, err
    }

    pwSlice, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
    if err != nil {
        return nil, err
    }
    user.Password = string(pwSlice[:])

    if err := user.Save(); err != nil {
        return nil, err
    }

    return &user, nil
}

func GetUser(user models.User) (*models.User, error){
    
    result := &models.User{Email: user.Email}


    if err := result.GetByEmail(); err != nil{
        return nil, err
    }

    if err := bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(user.Password)); err != nil{
        return nil, err
    }

    resultWithoutPsw := &models.User{ID: result.ID, FirstName: result.FirstName, LastName: result.LastName, Email: result.Email, Username: result.Username}
    return resultWithoutPsw, nil
}

func GetUserById(userId int64) (*models.User, error){
    result := &models.User{ID:  userId}

    if err := result.GetByID(); err != nil{
        return nil, err
    }

    return result, nil
}
