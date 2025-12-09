# Jug Go Rating Service

High-performance poutine rating microservice with gRPC API and PostgreSQL database.

## Setup

### Database
The database and tables are automatically created via `init-db.sql` when running with Docker Compose.

### Dependencies
```bash
go mod download
```

## Run

```bash
go run cmd/server/main.go
```

Or build and run:
```bash
go build -o jug-go-rating-service cmd/server/main.go
./jug-go-rating-service
```

gRPC server runs on port **50052**.

## Database Schema

The `ratings` table schema:

```sql
CREATE TABLE ratings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    restaurant VARCHAR(255) NOT NULL,
    cheese_squeakiness INTEGER NOT NULL,
    gravy_thickness INTEGER NOT NULL,
    fries_crispiness INTEGER NOT NULL,
    size VARCHAR(50),
    comments TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_ratings_user_id ON ratings(user_id);
CREATE INDEX idx_ratings_restaurant ON ratings(restaurant);
CREATE INDEX idx_ratings_created_at ON ratings(created_at DESC);
```

## gRPC API

Uses protobuf definitions from `jug-model/proto/poutine.proto`:

- `CreateRating` - Create new rating
- `GetRating` - Get rating by ID
- `ListRatings` - List all ratings
- `ListRatingsByRestaurant` - List ratings for specific restaurant

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
GRPC_PORT=50052
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=jug_ratings
DB_SSLMODE=disable
```
