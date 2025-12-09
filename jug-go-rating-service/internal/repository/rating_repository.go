package repository

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/dduzgun-security/jug/jug-go-rating-service/internal/model"
)

type RatingRepository struct {
	db *sql.DB
}

func NewRatingRepository(db *sql.DB) *RatingRepository {
	return &RatingRepository{db: db}
}

func (r *RatingRepository) Create(rating *model.Rating) (*model.Rating, error) {
	query := `
		INSERT INTO ratings (user_id, restaurant, cheese_squeakiness, gravy_thickness, fries_crispiness, size, comments, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING id, created_at
	`

	rating.CreatedAt = time.Now()

	err := r.db.QueryRow(
		query,
		rating.UserID,
		rating.Restaurant,
		rating.CheeseSqueakiness,
		rating.GravyThickness,
		rating.FriesCrispiness,
		rating.Size,
		rating.Comments,
		rating.CreatedAt,
	).Scan(&rating.ID, &rating.CreatedAt)

	if err != nil {
		return nil, fmt.Errorf("failed to create rating: %w", err)
	}

	return rating, nil
}

func (r *RatingRepository) GetByID(id int64) (*model.Rating, error) {
	query := `
		SELECT id, user_id, restaurant, cheese_squeakiness, gravy_thickness, fries_crispiness, size, comments, created_at
		FROM ratings
		WHERE id = $1
	`

	rating := &model.Rating{}
	err := r.db.QueryRow(query, id).Scan(
		&rating.ID,
		&rating.UserID,
		&rating.Restaurant,
		&rating.CheeseSqueakiness,
		&rating.GravyThickness,
		&rating.FriesCrispiness,
		&rating.Size,
		&rating.Comments,
		&rating.CreatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("rating not found")
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get rating: %w", err)
	}

	return rating, nil
}

func (r *RatingRepository) List() ([]*model.Rating, error) {
	query := `
		SELECT id, user_id, restaurant, cheese_squeakiness, gravy_thickness, fries_crispiness, size, comments, created_at
		FROM ratings
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to list ratings: %w", err)
	}
	defer rows.Close()

	var ratings []*model.Rating
	for rows.Next() {
		rating := &model.Rating{}
		err := rows.Scan(
			&rating.ID,
			&rating.UserID,
			&rating.Restaurant,
			&rating.CheeseSqueakiness,
			&rating.GravyThickness,
			&rating.FriesCrispiness,
			&rating.Size,
			&rating.Comments,
			&rating.CreatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan rating: %w", err)
		}
		ratings = append(ratings, rating)
	}

	return ratings, nil
}

func (r *RatingRepository) GetByRestaurant(restaurant string) ([]*model.Rating, error) {
	query := `
		SELECT id, user_id, restaurant, cheese_squeakiness, gravy_thickness, fries_crispiness, size, comments, created_at
		FROM ratings
		WHERE restaurant = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(query, restaurant)
	if err != nil {
		return nil, fmt.Errorf("failed to get ratings by restaurant: %w", err)
	}
	defer rows.Close()

	var ratings []*model.Rating
	for rows.Next() {
		rating := &model.Rating{}
		err := rows.Scan(
			&rating.ID,
			&rating.UserID,
			&rating.Restaurant,
			&rating.CheeseSqueakiness,
			&rating.GravyThickness,
			&rating.FriesCrispiness,
			&rating.Size,
			&rating.Comments,
			&rating.CreatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan rating: %w", err)
		}
		ratings = append(ratings, rating)
	}

	return ratings, nil
}

func (r *RatingRepository) Delete(id int64) error {
	query := `DELETE FROM ratings WHERE id = $1`

	result, err := r.db.Exec(query, id)
	if err != nil {
		return fmt.Errorf("failed to delete rating: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to get rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("rating not found")
	}

	return nil
}
