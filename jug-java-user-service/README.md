# Jug Java User Service

User management microservice with gRPC API and PostgreSQL database.

## Setup

### Database
The database and tables are automatically created via `init-db.sql` when running with Docker Compose.

### Build
```bash
mvn clean install
```

## Run

```bash
mvn spring-boot:run
```

gRPC server runs on port **50051**.

## Database Schema

The `users` table schema:

```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INTEGER,
    phone_number VARCHAR(255),
    status VARCHAR(255) NOT NULL DEFAULT 'active'
);
```

## gRPC API

Uses protobuf definitions from `jug-model/proto/user.proto`:

- `CreateUser` - Create new user
- `GetUser` - Get user by ID
- `ListUsers` - List all users

## Configuration

Edit `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/jug_users
    username: postgres
    password: postgres
```
