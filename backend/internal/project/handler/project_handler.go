package handler

import (
	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
	"github.com/ssyan-dev/portfolio/internal/middleware"
	"github.com/ssyan-dev/portfolio/internal/models"
	"github.com/ssyan-dev/portfolio/internal/pkg/response"
	"github.com/ssyan-dev/portfolio/internal/project/service"
)

type ProjectHandler struct {
	svc service.ProjectService
}

func NewProjectHandler(svc service.ProjectService) *ProjectHandler {
	return &ProjectHandler{svc: svc}
}

func (h *ProjectHandler) RegisterRoutes(app fiber.Router, admin fiber.Router) {
	app.Get("/projects", h.getAll)
	app.Get("/projects/:idOrSlug", h.getByIDOrSlug)

	admin.Post("/projects", middleware.Validate[projectReq](), h.create)
	admin.Put("/projects/:id", middleware.Validate[projectReq](), h.update)
	admin.Delete("/projects/:id", h.delete)
}

type projectReq struct {
	Slug        string   `json:"slug" validate:"omitempty,min=3"`
	Title       string   `json:"title" validate:"required,min=3"`
	Description *string  `json:"description"`
	ImageURL    *string  `json:"image_url" validate:"omitempty,url"`
	ProjectURL  *string  `json:"project_url" validate:"omitempty,url"`
	GithubURL   *string  `json:"github_url" validate:"omitempty,url"`
	Stack       []string `json:"stack"`
}

// create godoc
// @Summary		Create project
// @Tags			projects
// @Accept		json
// @Produce		json
// @Security	BearerAuth
// @Param			request	body		projectReq	true	"Project dto"
// @Success		201	{object}	models.Project
// @Router			/admin/projects [post]
func (h *ProjectHandler) create(c fiber.Ctx) error {
	req := c.Locals("body").(projectReq)

	project := &models.Project{
		Slug:        req.Slug,
		Title:       req.Title,
		Description: req.Description,
		ImageURL:    req.ImageURL,
		ProjectURL:  req.ProjectURL,
		GithubURL:   req.GithubURL,
		Stack:       req.Stack,
	}

	if err := h.svc.Create(c.Context(), project); err != nil {
		return response.Error(c, fiber.StatusInternalServerError, "failed to create project", nil)
	}

	return response.Success(c, fiber.StatusCreated, "success", project)
}

// getAll godoc
// @Summary		Get all projects
// @Tags			projects
// @Produce		json
// @Success		200	{array}	models.Project
// @Router			/projects [get]
func (h *ProjectHandler) getAll(c fiber.Ctx) error {
	projects, err := h.svc.GetAll(c.Context())
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, "failed to get projects", nil)
	}

	return response.Success(c, fiber.StatusOK, "success", projects)
}

// getByIDOrSlug godoc
// @Summary		Get project by ID or Slug
// @Tags			projects
// @Produce		json
// @Param			idOrSlug	path		string	true	"Project ID or Slug"
// @Success		200	{object}	models.Project
// @Router			/projects/{idOrSlug} [get]
func (h *ProjectHandler) getByIDOrSlug(c fiber.Ctx) error {
	idOrSlug := c.Params("idOrSlug")

	var project *models.Project
	var err error

	if _, uuidErr := uuid.Parse(idOrSlug); uuidErr == nil {
		project, err = h.svc.GetByID(c.Context(), idOrSlug)
	} else {
		project, err = h.svc.GetBySlug(c.Context(), idOrSlug)
	}

	if err != nil {
		return response.Error(c, fiber.StatusNotFound, "project not found", nil)
	}

	return response.Success(c, fiber.StatusOK, "success", project)
}

// update godoc
// @Summary		Update project
// @Tags			projects
// @Accept		json
// @Produce		json
// @Security	BearerAuth
// @Param			id		path		string		true	"Project ID"
// @Param			request	body		projectReq	true	"Project dto"
// @Success		200	{object}	models.Project
// @Router			/admin/projects/{id} [put]
func (h *ProjectHandler) update(c fiber.Ctx) error {
	id := c.Params("id")
	uid, err := uuid.Parse(id)
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid id", nil)
	}

	req := c.Locals("body").(projectReq)

	project := &models.Project{
		ID:          uid,
		Slug:        req.Slug,
		Title:       req.Title,
		Description: req.Description,
		ImageURL:    req.ImageURL,
		ProjectURL:  req.ProjectURL,
		GithubURL:   req.GithubURL,
		Stack:       req.Stack,
	}

	if err := h.svc.Update(c.Context(), project); err != nil {
		return response.Error(c, fiber.StatusInternalServerError, "failed to update project", nil)
	}

	return response.Success(c, fiber.StatusOK, "success", project)
}

// delete godoc
// @Summary		Delete project
// @Tags			projects
// @Security	BearerAuth
// @Param			id	path		string	true	"Project ID"
// @Success		200
// @Router			/admin/projects/{id} [delete]
func (h *ProjectHandler) delete(c fiber.Ctx) error {
	id := c.Params("id")
	if err := h.svc.Delete(c.Context(), id); err != nil {
		return response.Error(c, fiber.StatusInternalServerError, "failed to delete project", nil)
	}

	return response.Success(c, fiber.StatusOK, "success", nil)
}
