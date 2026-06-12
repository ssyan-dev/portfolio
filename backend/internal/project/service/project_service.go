package service

import (
	"context"

	"github.com/gosimple/slug"
	"github.com/ssyan-dev/portfolio/internal/models"
	"github.com/ssyan-dev/portfolio/internal/project/repository"
)

type ProjectService interface {
	Create(ctx context.Context, p *models.Project) error
	GetByID(ctx context.Context, id string) (*models.Project, error)
	GetBySlug(ctx context.Context, slug string) (*models.Project, error)
	GetAll(ctx context.Context) ([]models.Project, error)
	Update(ctx context.Context, p *models.Project) error
	Delete(ctx context.Context, id string) error
}

type projectSvc struct {
	repo      repository.ProjectRepository
	redisRepo repository.ProjectRedisRepository
}

func NewProjectService(repo repository.ProjectRepository, redisRepo repository.ProjectRedisRepository) ProjectService {
	return &projectSvc{
		repo:      repo,
		redisRepo: redisRepo,
	}
}

func (s *projectSvc) Create(ctx context.Context, p *models.Project) error {
	if p.Slug == "" {
		p.Slug = slug.Make(p.Title)
	}

	if err := s.repo.Create(ctx, p); err != nil {
		return err
	}
	_ = s.redisRepo.ClearAll(ctx)
	return nil
}

func (s *projectSvc) GetByID(ctx context.Context, id string) (*models.Project, error) {
	p, err := s.redisRepo.GetProject(ctx, id)
	if err == nil && p != nil {
		return p, nil
	}

	p, err = s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	_ = s.redisRepo.SetProject(ctx, p)
	return p, nil
}

func (s *projectSvc) GetBySlug(ctx context.Context, slugStr string) (*models.Project, error) {
	p, err := s.redisRepo.GetProject(ctx, slugStr)
	if err == nil && p != nil {
		return p, nil
	}

	p, err = s.repo.GetBySlug(ctx, slugStr)
	if err != nil {
		return nil, err
	}

	_ = s.redisRepo.SetProject(ctx, p)
	return p, nil
}

func (s *projectSvc) GetAll(ctx context.Context) ([]models.Project, error) {
	projects, err := s.redisRepo.GetProjects(ctx)
	if err == nil && projects != nil {
		return projects, nil
	}

	projects, err = s.repo.GetAll(ctx)
	if err != nil {
		return nil, err
	}

	_ = s.redisRepo.SetProjects(ctx, projects)
	return projects, nil
}

func (s *projectSvc) Update(ctx context.Context, p *models.Project) error {
	if p.Slug == "" {
		p.Slug = slug.Make(p.Title)
	}

	if err := s.repo.Update(ctx, p); err != nil {
		return err
	}
	_ = s.redisRepo.ClearAll(ctx)
	return nil
}

func (s *projectSvc) Delete(ctx context.Context, id string) error {
	project, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return err
	}

	if err := s.repo.Delete(ctx, id); err != nil {
		return err
	}
	return s.redisRepo.DeleteProject(ctx, id, project.Slug)
}
