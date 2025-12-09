package handler

import (
	"context"
	"log"

	"github.com/dduzgun-security/jug/jug-go-rating-service/internal/model"
	"github.com/dduzgun-security/jug/jug-go-rating-service/internal/repository"
	pb "github.com/dduzgun-security/jug/jug-model/jug-model-go/rating/poutine/v1"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type RatingHandler struct {
	pb.UnimplementedPoutineServiceServer
	repo *repository.RatingRepository
}

func NewRatingHandler(repo *repository.RatingRepository) *RatingHandler {
	return &RatingHandler{repo: repo}
}

func (h *RatingHandler) CreateRating(ctx context.Context, req *pb.CreateRatingRequest) (*pb.CreateRatingResponse, error) {
	log.Printf("gRPC: Creating rating for restaurant: %s", req.GetRating().GetRestaurant())

	rating := &model.Rating{
		UserID:            req.GetUserId(),
		Restaurant:        req.GetRating().GetRestaurant(),
		CheeseSqueakiness: req.GetRating().GetCheeseSqueakiness(),
		GravyThickness:    req.GetRating().GetGravyThickness(),
		FriesCrispiness:   req.GetRating().GetFriesCrispiness(),
		Size:              req.GetRating().GetSize(),
		Comments:          req.GetRating().GetComments(),
	}

	created, err := h.repo.Create(rating)
	if err != nil {
		log.Printf("Error creating rating: %v", err)
		return nil, status.Errorf(codes.Internal, "failed to create rating: %v", err)
	}

	return &pb.CreateRatingResponse{
		Rating: toProto(created),
	}, nil
}

func (h *RatingHandler) GetRating(ctx context.Context, req *pb.GetRatingRequest) (*pb.GetRatingResponse, error) {
	log.Printf("gRPC: Getting rating ID: %d", req.GetRatingId())

	rating, err := h.repo.GetByID(req.GetRatingId())
	if err != nil {
		log.Printf("Error getting rating: %v", err)
		return nil, status.Errorf(codes.NotFound, "rating not found: %v", err)
	}

	return &pb.GetRatingResponse{
		Rating: toProto(rating),
	}, nil
}

func (h *RatingHandler) ListRatings(ctx context.Context, req *pb.ListRatingsRequest) (*pb.ListRatingsResponse, error) {
	log.Printf("gRPC: Listing all ratings")

	ratings, err := h.repo.List()
	if err != nil {
		log.Printf("Error listing ratings: %v", err)
		return nil, status.Errorf(codes.Internal, "failed to list ratings: %v", err)
	}

	var protoRatings []*pb.Poutine
	for _, rating := range ratings {
		protoRatings = append(protoRatings, toProto(rating))
	}

	return &pb.ListRatingsResponse{
		Ratings: protoRatings,
	}, nil
}

func (h *RatingHandler) ListRatingsByRestaurant(ctx context.Context, req *pb.ListRatingsByRestaurantRequest) (*pb.ListRatingsByRestaurantResponse, error) {
	log.Printf("gRPC: Listing ratings for restaurant: %s", req.GetRestaurant())

	ratings, err := h.repo.GetByRestaurant(req.GetRestaurant())
	if err != nil {
		log.Printf("Error listing ratings by restaurant: %v", err)
		return nil, status.Errorf(codes.Internal, "failed to list ratings: %v", err)
	}

	var protoRatings []*pb.Poutine
	for _, rating := range ratings {
		protoRatings = append(protoRatings, toProto(rating))
	}

	return &pb.ListRatingsByRestaurantResponse{
		Ratings: protoRatings,
	}, nil
}

func toProto(rating *model.Rating) *pb.Poutine {
	if rating == nil {
		return nil
	}

	return &pb.Poutine{
		Restaurant:        rating.Restaurant,
		CheeseSqueakiness: rating.CheeseSqueakiness,
		GravyThickness:    rating.GravyThickness,
		FriesCrispiness:   rating.FriesCrispiness,
		Size:              rating.Size,
		Comments:          rating.Comments,
	}
}
