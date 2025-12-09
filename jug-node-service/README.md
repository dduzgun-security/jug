# Jug Node.js BFF Service

Stateless Backend-for-Frontend service that orchestrates gRPC calls to User and Rating services.

## Setup

```bash
npm install
cp .env.example .env
```

## Run

```bash
npm run dev
```

## API Endpoints

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user by ID

### Ratings
- `GET /api/ratings` - List all ratings (enriched with user data)
- `POST /api/ratings` - Create rating
- `GET /api/ratings/:id` - Get rating by ID (enriched with user data)

## Environment Variables

- `PORT` - HTTP server port (default: 3000)
- `USER_SERVICE_URL` - Java user service gRPC endpoint (default: localhost:50051)
- `RATING_SERVICE_URL` - Go rating service gRPC endpoint (default: localhost:50052)
