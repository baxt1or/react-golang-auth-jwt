package controller

import (
	"github/baxt1or/auth-jwt/models"
	"github/baxt1or/auth-jwt/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// func CreateBlog(c *gin.Context) {

//     cookie, err := c.Cookie("jwt")
//     if err != nil {
//         c.JSON(http.StatusUnauthorized, gin.H{"error": "JWT token not found"})
//         return
//     }

//     token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
//         return []byte(Secret_key), nil
//     })
//     if err != nil {
//         c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid JWT token"})
//         return
//     }

//     claims, ok := token.Claims.(*jwt.StandardClaims)
//     if !ok || !token.Valid {
//         c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid JWT token claims"})
//         return
//     }

//     userID, err := strconv.ParseInt(claims.Issuer, 10, 64)
//     if err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse user ID from JWT claims"})
//         return
//     }

//     var blog models.Blog
//     if err := c.ShouldBindJSON(&blog); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
//         return
//     }

//     blog.UserID = userID

//     result, err := services.AddBlog(blog)
//     if err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create blog"})
//         return
//     }

//     c.JSON(http.StatusOK, result)
// }


func CreateBlog(c *gin.Context) {
    userID, exists := c.Get("userID")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
        return
    }

    // Convert userID to int64 (assuming userID is stored as int64 in context)
    userIDInt64, ok := userID.(int64)
    if !ok {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID format in context"})
        return
    }

    // Bind JSON payload to Blog struct
    var blog models.Blog
    if err := c.ShouldBindJSON(&blog); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
        return
    }

    // Associate the user ID with the blog
    blog.UserID = userIDInt64

    // Call service function to create blog
    result, err := services.AddBlog(blog)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create blog"})
        return
    }

    // Return successful response
    c.JSON(http.StatusOK, result)
}

func GetBlogs(c *gin.Context) {
    var blog models.Blog
    blogs, err := blog.Blogs()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch blogs"})
        return
    }

    c.JSON(http.StatusOK, blogs)
}

func GetBlog(c *gin.Context){
    blogId := c.Param("id");
   
    id, err := strconv.ParseInt(blogId, 10, 64)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "JSON Error"})
        return
    }

    result, err := services.GetBlog(id)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"Error":"Failed to fetch a blog"})
        return
    }

    c.JSON(http.StatusOK, result)

}

func DeleteBlog(c *gin.Context){
    blogId := c.Param("id")
    
    id, err := strconv.ParseInt(blogId, 10, 64)
    
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"Error":"Json Error"})
    }

    result, err := services.Delete(id)

    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"Error":"Failed to fetch blog to Delete"})
    }

    c.JSON(http.StatusOK, result)
}

func UpdateBlog(c *gin.Context){
    blogId := c.Param("id")
    
    id, err := strconv.ParseInt(blogId, 10, 64)
    
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"Error":"Json Error"})
    }

    result, err := services.Update(id)

    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"Error":"Failed to fetch blog to Update"})
    }

    c.JSON(http.StatusOK, result)
}