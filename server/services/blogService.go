package services

import (
	"github/baxt1or/auth-jwt/models"
)


func AddBlog(blog models.Blog) (*models.Blog, error) {
	
	if err := blog.ValidateCategory(); err != nil{
		return nil, err
	}
	if err := blog.ValidateStatus(); err != nil{
		return nil, err
	}

	if err := blog.Save(); err != nil {
		return nil, err
	}
	
	return &blog, nil
}

func GetBlogs() ([]models.Blog, error) {
    blog := models.Blog{}
    return blog.Blogs()
}

func GetBlog(blogId int64) (*models.Blog, error){
	
	result := &models.Blog{ID:  blogId}

   if err := result.GetBlogByID(); err !=nil{
    return nil, err
   }

   return result, nil
}

func Delete(blogId int64) (*models.Blog, error){
	result := &models.Blog{ID: blogId}

	if err := result.DeleteBlogById(); err != nil{
		return nil, err
	}
	return result, nil
}

func Update(blogId int64) (*models.Blog, error){
	result := &models.Blog{ID: blogId}

	if err := result.UpdateBlogById(); err != nil{
		return nil, err
	}
	return result, nil
}