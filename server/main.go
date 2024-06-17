package main

import (
	"github/baxt1or/auth-jwt/controller"
	"net/http"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var (
    Secret_key = "hello"
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
	


	blogRoutes := router.Group("/api/blog")
    blogRoutes.Use(authMiddleware()) 
    {
        blogRoutes.POST("", controller.CreateBlog)
        blogRoutes.GET("", controller.GetBlogs)
        blogRoutes.GET("/:id", controller.GetBlog)
        blogRoutes.DELETE("/:id", controller.DeleteBlog)
        blogRoutes.PUT("/:id", controller.UpdateBlog)
    }

	router.Run(":8080")
}


func authMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        
        tokenString, err := c.Cookie("jwt")
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token not found"})
            c.Abort()
            return
        }

       
        token, err := jwt.ParseWithClaims(tokenString, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
            return []byte(Secret_key), nil
        })
        if err != nil || !token.Valid {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
            c.Abort()
            return
        }

       
        claims, ok := token.Claims.(*jwt.StandardClaims)
        if !ok {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
            c.Abort()
            return
        }

        userID, err := strconv.ParseInt(claims.Issuer, 10, 64)
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID in token"})
            c.Abort()
            return
        }

        
        c.Set("userID", userID)
        c.Next()
    }
}