package main

import (
	"fmt"
	"log"
	"net"
	"os"

	"github.com/dduzgun-security/jug/jug-go-rating-service/internal/handler"
	"github.com/dduzgun-security/jug/jug-go-rating-service/internal/repository"
	"github.com/dduzgun-security/jug/jug-go-rating-service/pkg/db"
	pb "github.com/dduzgun-security/jug/jug-model/jug-model-go/rating/poutine/v1"
	"google.golang.org/grpc"
)

func main() {
	// Connect to database
	database, err := db.Connect()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer database.Close()

	// Initialize schema
	if err := db.InitSchema(database); err != nil {
		log.Fatalf("Failed to initialize schema: %v", err)
	}

	// Create repository and handler
	ratingRepo := repository.NewRatingRepository(database)
	ratingHandler := handler.NewRatingHandler(ratingRepo)

	// Create gRPC server
	grpcServer := grpc.NewServer()
	pb.RegisterPoutineServiceServer(grpcServer, ratingHandler)

	// Start listening
	port := getEnv("GRPC_PORT", "50052")
	listener, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	log.Printf("🚀 Go Rating Service started on gRPC port %s", port)
	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
