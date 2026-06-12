package repository

import (
	"context"
	"encoding/json"
	"time"

	"github.com/redis/go-redis/v9"
	"github.com/ssyan-dev/portfolio/internal/models"
)

const (
	projectCachePath = "projects:"
	projectSlugPath  = "projects_slug:"
	projectListCache = "projects_list"
	projectCacheTTL  = 24 * time.Hour
)

type ProjectRedisRepository interface {
	SetProject(ctx context.Context, project *models.Project) error
	GetProject(ctx context.Context, idOrSlug string) (*models.Project, error)
	DeleteProject(ctx context.Context, id string, slug string) error
	SetProjects(ctx context.Context, projects []models.Project) error
	GetProjects(ctx context.Context) ([]models.Project, error)
	ClearAll(ctx context.Context) error
}

type projectRedisRepo struct {
	db *redis.Client
}

func NewProjectRedisRepository(db *redis.Client) ProjectRedisRepository {
	return &projectRedisRepo{db: db}
}

func (r *projectRedisRepo) SetProject(ctx context.Context, p *models.Project) error {
	data, err := json.Marshal(p)
	if err != nil {
		return err
	}

	// Cache by ID and Slug
	_ = r.db.Set(ctx, projectCachePath+p.ID.String(), data, projectCacheTTL).Err()
	return r.db.Set(ctx, projectSlugPath+p.Slug, data, projectCacheTTL).Err()
}

func (r *projectRedisRepo) GetProject(ctx context.Context, idOrSlug string) (*models.Project, error) {
	// Try ID first
	data, err := r.db.Get(ctx, projectCachePath+idOrSlug).Bytes()
	if err != nil {
		// Try Slug
		data, err = r.db.Get(ctx, projectSlugPath+idOrSlug).Bytes()
		if err != nil {
			return nil, err
		}
	}

	var p models.Project
	if err := json.Unmarshal(data, &p); err != nil {
		return nil, err
	}

	return &p, nil
}

func (r *projectRedisRepo) DeleteProject(ctx context.Context, id string, slug string) error {
	return r.db.Del(ctx, projectCachePath+id, projectSlugPath+slug, projectListCache).Err()
}

func (r *projectRedisRepo) SetProjects(ctx context.Context, projects []models.Project) error {
	data, err := json.Marshal(projects)
	if err != nil {
		return err
	}
	return r.db.Set(ctx, projectListCache, data, projectCacheTTL).Err()
}

func (r *projectRedisRepo) GetProjects(ctx context.Context) ([]models.Project, error) {
	data, err := r.db.Get(ctx, projectListCache).Bytes()
	if err != nil {
		return nil, err
	}

	var projects []models.Project
	if err := json.Unmarshal(data, &projects); err != nil {
		return nil, err
	}

	return projects, nil
}

func (r *projectRedisRepo) ClearAll(ctx context.Context) error {
	// Simple way to clear all project related keys
	iter := r.db.Scan(ctx, 0, "projects*", 0).Iterator()
	for iter.Next(ctx) {
		if err := r.db.Del(ctx, iter.Val()).Err(); err != nil {
			return err
		}
	}
	return iter.Err()
}
