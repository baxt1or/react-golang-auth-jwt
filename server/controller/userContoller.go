package controller

import (
	"github/baxt1or/auth-jwt/models"
	"github/baxt1or/auth-jwt/services"
	"net/http"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

var (
    Secret_key = "hello"
)

func Register(c *gin.Context) {
    var user models.User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    result, err := services.CreateUser(user)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Something went wrong with Creating user"})
        return
    }

    c.JSON(http.StatusOK, result)
}

func Login(c *gin.Context) {
    var user models.User

   
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON format"})
        return
    }

    result, err := services.GetUser(user)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid credentials"})
        return
    }

    
    claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
        Issuer:    strconv.Itoa(int(result.ID)),
        ExpiresAt: time.Now().Add(time.Hour * 72).Unix(), 
    })

    
    token, err := claims.SignedString([]byte(Secret_key)) 
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
        return
    }

    
    c.SetCookie("jwt", token, 3600, "/", "localhost", false, true)

    
    c.JSON(http.StatusOK, gin.H{"user": result})
}

func GetUser(c *gin.Context){
    cookie, err := c.Cookie("jwt")

    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"Error":"Cookie error"})
        return
    }

    token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
        return []byte(Secret_key), nil
    })
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"Error":"Token error"})
        return
    }

    claims, ok := token.Claims.(*jwt.StandardClaims)
    if !ok || !token.Valid {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
        return
    }


    issuer, err := strconv.ParseInt(claims.Issuer, 10, 64)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Issuer parsing error: " + err.Error()})
        return
    }


    result, err := services.GetUserById(issuer)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "User retrieval error: " + err.Error()})
        return
    }
   

    c.JSON(http.StatusOK, result)

}

func Logout(c *gin.Context){
    c.SetCookie("jwt", "", -1, "", "", false, true)
    c.JSON(http.StatusOK, gin.H{"Message": "Good bye"})
}