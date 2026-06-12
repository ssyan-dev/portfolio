package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	swaggo "github.com/gofiber/contrib/v3/swaggo"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/recover"
	authHandler "github.com/ssyan-dev/portfolio/internal/auth/handler"
	authRepo "github.com/ssyan-dev/portfolio/internal/auth/repository"
	authService "github.com/ssyan-dev/portfolio/internal/auth/service"
	"github.com/ssyan-dev/portfolio/internal/config"
	"github.com/ssyan-dev/portfolio/internal/database"
	"github.com/ssyan-dev/portfolio/internal/logger"
	"github.com/ssyan-dev/portfolio/internal/middleware"
	"github.com/ssyan-dev/portfolio/internal/pkg/response"
	projectHandler "github.com/ssyan-dev/portfolio/internal/project/handler"
	projectRepo "github.com/ssyan-dev/portfolio/internal/project/repository"
	projectService "github.com/ssyan-dev/portfolio/internal/project/service"
	sessionHandler "github.com/ssyan-dev/portfolio/internal/sessions/handler"
	sessionRepo "github.com/ssyan-dev/portfolio/internal/sessions/repository"
	sessionService "github.com/ssyan-dev/portfolio/internal/sessions/service"
	userHandler "github.com/ssyan-dev/portfolio/internal/user/handler"
	userRepo "github.com/ssyan-dev/portfolio/internal/user/repository"
	userService "github.com/ssyan-dev/portfolio/internal/user/service"
	"go.uber.org/zap"

	_ "github.com/ssyan-dev/portfolio/docs"
)

// @title			Portfolio API
// @version		1.0
// @description	Portfolio API

// @contact.name	Stanislav Simakhin
// @contact.url	https://ssyan.ru

// @host			localhost:8080
// @BasePath		/api/v1

// @securityDefinitions.apikey	BearerAuth
// @in							header
// @name						Authorization
// @description			Bearer [JWT]
func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cfg, err := config.InitConfig()
	if err != nil {
		panic(err.Error())
	}
	config.IsProduction = cfg.App.IsProduction()

	l := logger.NewLogger(cfg.App.IsProduction())
	defer l.Sync()

	l.Info("starting backend",
		zap.String("env", cfg.App.Env),
		zap.Int("port", cfg.App.Port),
	)

	pg, err := database.NewPostgres(ctx, &cfg.Postgres)
	if err != nil {
		l.Fatal("failed to make postgres connection", zap.Error(err))
	}
	defer pg.Close()
	l.Info("postgres connected!")

	rdb, err := database.NewRedis(ctx, &cfg.Redis)
	if err != nil {
		l.Fatal("failed to make redis connection", zap.Error(err))
	}
	defer rdb.Close()
	l.Info("redis connected!")

	app := fiber.New(fiber.Config{
		ServerHeader: "backend-template",
		ErrorHandler: response.ErrorHandler,
	})

	l.Info("fiber initialized!",
		zap.Int("port", cfg.App.Port),
		zap.String("allowed_origin", cfg.App.AllowedOrigin),
		zap.String("global_prefix", cfg.App.GlobalPrefix),
	)

	app.Use(recover.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{cfg.App.AllowedOrigin},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))
	app.Use(middleware.NewLogger(l))

	api := app.Group(cfg.App.GlobalPrefix)

	ar := authRepo.NewAuthRepository(pg)

	sr := sessionRepo.NewSessionRepository(pg)
	srr := sessionRepo.NewSessionRedisRepository(rdb)
	ss := sessionService.NewSessionService(sr, srr)

	as := authService.NewAuthService(ar, ss, &cfg.JWT, l)
	ah := authHandler.NewAuthHandler(as)
	ah.RegisterRoutes(api)

	oas := authService.NewOAuthService(ar, ss, &cfg.JWT, &cfg.OAuth, l)
	oah := authHandler.NewOAuthHandler(oas, as)
	oah.RegisterRoutes(api)

	api.Get("/docs/*", swaggo.HandlerDefault)

	api.Get("/health", func(c fiber.Ctx) error {
		return response.Success(c, fiber.StatusOK, "server is healthy!", fiber.Map{
			"env": cfg.App.Env,
		})
	})

	ur := userRepo.NewUserRepository(pg)
	urr := userRepo.NewUserRedisRepository(rdb)
	us := userService.NewUserService(ur, urr)
	uh := userHandler.NewUserHandler(us)

	sh := sessionHandler.NewSessionHandler(ss)

	pr := projectRepo.NewProjectRepository(pg)
	prr := projectRepo.NewProjectRedisRepository(rdb)
	ps := projectService.NewProjectService(pr, prr)
	ph := projectHandler.NewProjectHandler(ps)

	admin := api.Group("/admin", middleware.AuthMiddleware(&cfg.JWT), middleware.RolesMiddleware("admin"))
	ph.RegisterRoutes(api, admin)

	protected := api.Group("/", middleware.AuthMiddleware(&cfg.JWT))
	uh.RegisterRoutes(protected)
	sh.RegisterRoutes(protected)

	addr := fmt.Sprintf(":%d", cfg.App.Port)
	go func() {
		if err := app.Listen(addr); err != nil {
			l.Fatal("failed to run http server: %v", zap.Error(err))
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer shutdownCancel()

	l.Info("shutting down...")

	if err := app.ShutdownWithContext(shutdownCtx); err != nil {
		l.Error("shutdown failed", zap.Error(err))
	}

	l.Info("server stopped!")
}
