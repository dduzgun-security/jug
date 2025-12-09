# Jug User Service (Go)

A simple HTTP service for handling user registration requests, built with Go.

## Prerequisites

- Go 1.25.5 or higher
- Git (for dependency management)

## Installation

1. Navigate to the service directory:
```bash
cd jug-user-service-go
```

2. Install dependencies:
```bash
go mod tidy
```

## Running the Service

### Default Port (8002)

```bash
go run main.go
```

### Custom Port

Set the `PORT` environment variable:

```bash
PORT=8080 go run main.go
```

### Build and Run

```bash
go build -o jug-user-service
./jug-user-service
```

## API Endpoints

### POST /user

Accepts user registration data and returns a success message.

#### Request Format

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "age": 30,
  "phoneNumber": "+1-555-0123",
  "status": "active"
}
```

#### Response Format

```json
{
  "message": "User registration received successfully"
}
```

## Example curl Commands

### Basic User Registration

```bash
curl -X POST http://localhost:8002/user \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "phoneNumber": "+1-555-0123",
    "status": "active"
  }'
```

### Minimal Request

```bash
curl -X POST http://localhost:8002/user \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com"
  }'
```

### Full Example with All Fields

```bash
curl -X POST http://localhost:8002/user \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Johnson",
    "email": "alice.johnson@example.com",
    "age": 25,
    "phoneNumber": "+1-555-9876",
    "status": "pending"
  }'
```

### Pretty Print Response

```bash
curl -X POST http://localhost:8002/user \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Bob",
    "lastName": "Williams",
    "email": "bob.williams@example.com",
    "age": 35
  }' | jq
```

### Verbose Output (See Headers)

```bash
curl -v -X POST http://localhost:8002/user \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Charlie",
    "lastName": "Brown",
    "email": "charlie.brown@example.com"
  }'
```

## Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| firstName | string | No | User's first name |
| lastName | string | No | User's last name |
| email | string | No | User's email address |
| age | number | No | User's age (positive integer) |
| phoneNumber | string | No | User's phone number |
| status | string | No | User status (e.g., "active", "pending") |

## CORS Support

The service includes CORS headers to allow cross-origin requests from any domain.

## Error Responses

### Method Not Allowed (405)

```bash
curl -X GET http://localhost:8002/user
```

Response:
```json
{
  "error": "Method not allowed"
}
```

### Bad Request (400)

```bash
curl -X POST http://localhost:8002/user \
  -H "Content-Type: application/json" \
  -d 'invalid json'
```

Response:
```json
{
  "error": "Invalid user request: ..."
}
```

## Logging

The service logs all incoming requests to stdout:

```
2025/12/09 12:00:00 Jug User Service running on port 8002
2025/12/09 12:00:05 Received UserRequest: user:{first_name:"John" last_name:"Doe" email:"john.doe@example.com" age:30}
```

## Development

### Run Tests

```bash
go test ./...
```

### Format Code

```bash
go fmt ./...
```

### Run with Live Reload (using air)

```bash
# Install air
go install github.com/air-verse/air@latest

# Run with live reload
air
```
