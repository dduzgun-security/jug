# Jug - Microservices Architecture

Poutine rating application built with microservices architecture using Protocol Buffers for inter-service communication.

## Architecture Overview

```
┌─────────────────┐
│ React Frontend  │ (Port 5173)
│  (jug-frontend) │
└────────┬────────┘
         │ HTTP/REST
         ↓
┌─────────────────┐
│   Node.js BFF   │ (Port 3000)
│ (jug-node-      │ Stateless Gateway
│  service)       │
└────────┬────────┘
         │ gRPC
    ┌────┴────┐
    ↓         ↓
┌─────────┐ ┌──────────┐
│  Java   │ │    Go    │
│ User    │ │ Rating   │
│ Service │ │ Service  │
│(50051)  │ │ (50052)  │
└────┬────┘ └────┬─────┘
     │ JDBC      │ SQL
     ↓           ↓
┌─────────┐ ┌──────────┐
│User DB  │ │Rating DB │
│(5432)   │ │ (5433)   │
└─────────┘ └──────────┘
```

## Services

### 1. Frontend (React + Vite)
- **Location**: `jug-frontend/`
- **Port**: 5173
- **Tech**: React, TailwindCSS, Vite
- **Purpose**: User interface for poutine ratings

### 2. Node.js BFF (Backend for Frontend)
- **Location**: `jug-node-service/`
- **Port**: 3000
- **Tech**: Express.js, gRPC clients
- **Purpose**: Stateless API gateway
- **Features**:
  - REST API for frontend
  - Request orchestration to downstream services
  - Data aggregation (joins user data with ratings)
  - No database (fully stateless)

### 3. Java User Service
- **Location**: `jug-java-user-service/`
- **Port**: 50051 (gRPC)
- **Tech**: Spring Boot, JPA, PostgreSQL
- **Database**: `jug_users` (port 5432)
- **Purpose**: User management
- **Features**:
  - User CRUD operations

### 4. Go Rating Service
- **Location**: `jug-go-rating-service/`
- **Port**: 50052 (gRPC)
- **Tech**: Go, PostgreSQL
- **Database**: `jug_ratings` (port 5433)
- **Purpose**: Poutine ratings management
- **Features**:
  - Rating CRUD operations

## Protocol Buffers

All inter-service communication uses protobuf definitions from `jug-model/` and GRPC.

### User Proto (`rating/user/v1/user.proto`)
```protobuf
service UserService {
    rpc CreateUser(CreateUserRequest) returns (CreateUserResponse);
    rpc GetUser(GetUserRequest) returns (GetUserResponse);
    rpc ListUsers(ListUsersRequest) returns (ListUsersResponse);
}
```

### Poutine Proto (`rating/poutine/v1/poutine.proto`)
```protobuf
service PoutineService {
    rpc CreateRating(CreateRatingRequest) returns (CreateRatingResponse);
    rpc GetRating(GetRatingRequest) returns (GetRatingResponse);
    rpc ListRatings(ListRatingsRequest) returns (ListRatingsResponse);
    rpc ListRatingsByRestaurant(ListRatingsByRestaurantRequest) returns (ListRatingsByRestaurantResponse);
}
```

### Generate Models Code

```bash
cd jug-model && buf generate
```

Generates code for:
- **Go** → `jug-model/jug-model-go/` (use direct repo reference)
- **Java** → `jug-model/jug-model-java/` (published to GitHub Packages)
- **JavaScript** → `jug-model/jug-model-js/` (published to GitHub Packages)

### Using the Packages

#### Go
```go
import poutinev1 "github.com/dduzgun-security/jug/jug-model/jug-model-go/rating/poutine/v1"
```

#### Java
Add to your `pom.xml`:
```xml
<dependency>
    <groupId>com.github.dduzgun-security</groupId>
    <artifactId>jug-model</artifactId>
    <version>1.0.0</version>
</dependency>
```

#### JavaScript
```bash
npm install @dduzgun-security/jug-model
```

```javascript
const { poutine, user } = require('@dduzgun-security/jug-model');
```

## Quick Start with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

Services will be available at:
- Frontend: http://localhost:5173
- BFF API: http://localhost:3000
- User Service gRPC: localhost:50051
- Rating Service gRPC: localhost:50052
- Database: localhost:5433

## Development

### Run Services Locally

**Prerequisites:**
- PostgreSQL running on ports 5432
- Databases `jug_users` and `jug_ratings` created

**Java User Service:**
```bash
cd jug-java-user-service
mvn spring-boot:run
```

**Go Rating Service:**
```bash
cd jug-go-rating-service
go run cmd/server/main.go
```

**Node.js BFF:**
```bash
cd jug-node-service
npm install
npm run dev
```

**Frontend:**
```bash
cd jug-frontend
npm install
npm run dev
```

## Publishing

Packages are automatically published to GitHub Packages on releases via GitHub Actions.