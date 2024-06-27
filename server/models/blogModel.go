package models

import (
	"errors"
)

type Category string

const (
	Programming Category = "Programming"
	Engineering Category = "Engineering"
	Finance     Category = "Finance"
	Economics   Category = "Economics"
	Business    Category = "Business"
	University  Category = "University"
	AI          Category = "AI"
	Mathematics Category = "Mathematics"
	Physics     Category = "Physics"
	Traveling   Category = "Traveling"
	Reading     Category = "Reading"
)

type Status string

const (
	Published Status = "Published"
	Archived Status = "Archived"
)


type Blog struct {
	ID       int64    `json: "ID"`
	Title    string   `json:"title"`
	Content  string   `json:"content"`
	UserID   int64    `json:"user_id"`
	Subtitle string   `json:"sub_title"`
	Category Category `json:"category"`
	Status Status            `json:"status"`
	Location       string    `json:"location"`
}


func (b *Blog) ValidateCategory() error {
	validCategories := map[Category]bool{
		Programming: true,
		Engineering: true,
		Finance:     true,
		Economics:   true,
		Business:    true,
		University:  true,
		AI:          true,
		Mathematics: true,
		Physics:     true,
		Traveling:   true,
		Reading:     true,
	}

	if !validCategories[b.Category] {
		return errors.New("Category error")
	}
	return nil
}

func (b *Blog) ValidateStatus() error {
	validStatus := map[Status]bool{
		Published : true,
		Archived : true,
	}

	if !validStatus[b.Status]{
		return errors.New("Status Error")
	}
	return nil
}
