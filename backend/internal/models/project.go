package models

import (
	"time"

	"github.com/google/uuid"
)

type Project struct {
	ID          uuid.UUID `json:"id" db:"id"`
	Slug        string    `json:"slug" db:"slug"`
	Title       string    `json:"title" db:"title"`
	Description *string   `json:"description" db:"description"`
	ImageURL    *string   `json:"image_url" db:"image_url"`
	ProjectURL  *string   `json:"project_url" db:"project_url"`
	GithubURL   *string   `json:"github_url" db:"github_url"`
	Stack       []string  `json:"stack" db:"stack"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
}
