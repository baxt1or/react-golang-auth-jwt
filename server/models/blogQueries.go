package models

import (
	"errors"
	"fmt"
	"github/baxt1or/auth-jwt/db"
)

const (
	  queryInsertBlog = "INSERT INTO blogs (title, content, user_id, subtitle, category, status, location) VALUES (?, ?, ?, ?, ?, ?, ? );"
    queryGetBlogs = "SELECT id, title, content, user_id, subtitle, category, status, location FROM blogs;"
    queryGetBlogById = "SELECT id, title, content, user_id, subtitle, category, status, location FROM blogs WHERE id = ?;"
    queryDeleteBlogById = "DELETE FROM blogs WHERE id=?;"
    queryUpdateBlogById = "UPDATE blogs SET title=?, content=?, subtitle=?, category=?, status=?,  location=? WHERE id=?;"
)


func (blog *Blog) Save() error {
	
	

	stm, err := db.Client.Prepare(queryInsertBlog)
	if err != nil {
		return fmt.Errorf("failed to prepare query: %w", err)
	}
	defer stm.Close()

	_, err = stm.Exec(blog.Title, blog.Content, blog.UserID, blog.Subtitle, blog.Category, blog.Status, blog.Location)
	if err != nil {
		return fmt.Errorf("failed to execute query: %w", err)
	}

	return nil
}

func (blog *Blog) Blogs() ([]Blog, error) {

  stm, err := db.Client.Prepare(queryGetBlogs)
  if err != nil {
      return nil, fmt.Errorf("failed to prepare query: %w", err)
  }
  defer stm.Close()

  rows, err := stm.Query()
  if err != nil {
      return nil, fmt.Errorf("failed to execute query: %w", err)
  }
  defer rows.Close()

  blogs := []Blog{}
  for rows.Next() {
      var b Blog

      if err := rows.Scan(&b.ID, &b.Title, &b.Content, &b.UserID, &b.Subtitle, &b.Category, &b.Status, &b.Location); err != nil {
          return nil, fmt.Errorf("failed to scan row: %w", err)
      }

      

      blogs = append(blogs, b)
  }

  if err := rows.Err(); err != nil {
      return nil, fmt.Errorf("error iterating over rows: %w", err)
  }

  return blogs, nil
}

func (blog *Blog) GetBlogByID() error {

    stm, err := db.Client.Prepare(queryGetBlogById)
    if err != nil {
        return errors.New("Database Error!")
    }
    defer stm.Close()

    result :=  stm.QueryRow(blog.ID)
    if err := result.Scan(&blog.ID, &blog.Title, &blog.Content, &blog.UserID, &blog.Subtitle, &blog.Category,  &blog.Status, &blog.Location); err != nil {
        return errors.New("Database error")
    }
    return nil

}

func (blog *Blog) DeleteBlogById() error {
    stm, err := db.Client.Prepare(queryDeleteBlogById)
    if err != nil {
      return fmt.Errorf("failed to prepare delete statement: %w", err)
    }
    defer stm.Close()
  
    result, err := stm.Exec(blog.ID)
    if err != nil {
      return fmt.Errorf("failed to execute delete statement: %w", err)
    }
  
    rowsAffected, err := result.RowsAffected()
    if err != nil {
      return fmt.Errorf("failed to fetch rows affected: %w", err)
    }
    if rowsAffected == 0 {
      return fmt.Errorf("no blog found with ID: %d", blog.ID)
    }
  
    return nil
}


func (blog *Blog) UpdateBlogById() error {
    stm, err := db.Client.Prepare(queryUpdateBlogById)
    if err != nil {
        return fmt.Errorf("failed to prepare update statement: %w", err)
    }

    defer stm.Close()

    result, err := stm.Exec(&blog.ID, &blog.Title, &blog.Content, &blog.UserID, &blog.Subtitle, &blog.Category,  &blog.Status, &blog.Location)
    if err != nil {
        return fmt.Errorf("failed to execute delete statement: %w", err)
      }
    
      rowsAffected, err := result.RowsAffected()
      if err != nil {
        return fmt.Errorf("failed to fetch rows affected: %w", err)
      }
      if rowsAffected == 0 {
        return fmt.Errorf("no blog found with ID: %d", blog.ID)
      }
    
      return nil

}

  