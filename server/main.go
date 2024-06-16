package main

import (
	"github/baxt1or/auth-jwt/controller"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, 
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))


	router.POST("/api/register", controller.Register)
	router.POST("/api/login", controller.Login)
	router.GET("/api/user", controller.GetUser)
	router.GET("/api/logout", controller.Logout)


	router.Run(":8080")
}