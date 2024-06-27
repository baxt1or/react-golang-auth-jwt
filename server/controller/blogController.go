package controller

import (
	"github/baxt1or/auth-jwt/models"
	"github/baxt1or/auth-jwt/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)




func CreateBlog(c *gin.Context) {
    userID, exists := c.Get("userID")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
        return
    }

    userIDInt64, ok := userID.(int64)
    if !ok {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID format in context"})
        return
    }

   
   
    var blog models.Blog
    if err := c.ShouldBindJSON(&blog); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
        return
    }

    
    blog.UserID = userIDInt64
    

    
    result, err := services.AddBlog(blog)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create blog"})
        return
    }

    
    c.JSON(http.StatusOK, result)
}

func GetBlogs(c *gin.Context) {


    blogs, err := services.GetBlogs()

    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch Blogs"})
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
        c.JSON(http.StatusBadRequest, gin.H{"Error":"Failed to fetch a Blog"})
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
        c.JSON(http.StatusBadRequest, gin.H{"Error":"Failed  to Delete a Blog"})
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


