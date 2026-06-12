package repository

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/ssyan-dev/portfolio/internal/models"
)

type ProjectRepository interface {
	Create(ctx context.Context, project *models.Project) error
	GetByID(ctx context.Context, id string) (*models.Project, error)
	GetBySlug(ctx context.Context, slug string) (*models.Project, error)
	GetAll(ctx context.Context) ([]models.Project, error)
	Update(ctx context.Context, project *models.Project) error
	Delete(ctx context.Context, id string) error
}

type projectRepo struct {
	db *pgxpool.Pool
}

func NewProjectRepository(db *pgxpool.Pool) ProjectRepository {
	return &projectRepo{db: db}
}

func (r *projectRepo) Create(ctx context.Context, p *models.Project) error {
	query := `INSERT INTO projects (slug, title, description, image_url, project_url, github_url, stack) 
			  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, created_at, updated_at`

	return r.db.QueryRow(ctx, query, p.Slug, p.Title, p.Description, p.ImageURL, p.ProjectURL, p.GithubURL, p.Stack).
		Scan(&p.ID, &p.CreatedAt, &p.UpdatedAt)
}

func (r *projectRepo) GetByID(ctx context.Context, id string) (*models.Project, error) {
	query := `SELECT id, slug, title, description, image_url, project_url, github_url, stack, created_at, updated_at FROM projects WHERE id = $1`

	var p models.Project
	err := r.db.QueryRow(ctx, query, id).Scan(
		&p.ID, &p.Slug, &p.Title, &p.Description, &p.ImageURL, &p.ProjectURL, &p.GithubURL, &p.Stack, &p.CreatedAt, &p.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &p, nil
}

func (r *projectRepo) GetBySlug(ctx context.Context, slug string) (*models.Project, error) {
	query := `SELECT id, slug, title, description, image_url, project_url, github_url, stack, created_at, updated_at FROM projects WHERE slug = $1`

	var p models.Project
	err := r.db.QueryRow(ctx, query, slug).Scan(
		&p.ID, &p.Slug, &p.Title, &p.Description, &p.ImageURL, &p.ProjectURL, &p.GithubURL, &p.Stack, &p.CreatedAt, &p.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &p, nil
}

func (r *projectRepo) GetAll(ctx context.Context) ([]models.Project, error) {
	query := `SELECT id, slug, title, description, image_url, project_url, github_url, stack, created_at, updated_at FROM projects ORDER BY created_at DESC`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var projects []models.Project
	for rows.Next() {
		var p models.Project
		err := rows.Scan(
			&p.ID, &p.Slug, &p.Title, &p.Description, &p.ImageURL, &p.ProjectURL, &p.GithubURL, &p.Stack, &p.CreatedAt, &p.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		projects = append(projects, p)
	}

	return projects, nil
}

func (r *projectRepo) Update(ctx context.Context, p *models.Project) error {
	query := `UPDATE projects SET slug = $1, title = $2, description = $3, image_url = $4, project_url = $5, github_url = $6, stack = $7, updated_at = NOW() WHERE id = $8`

	_, err := r.db.Exec(ctx, query, p.Slug, p.Title, p.Description, p.ImageURL, p.ProjectURL, p.GithubURL, p.Stack, p.ID)
	return err
}

func (r *projectRepo) Delete(ctx context.Context, id string) error {
	query := `DELETE FROM projects WHERE id = $1`
	_, err := r.db.Exec(ctx, query, id)
	return err
}
