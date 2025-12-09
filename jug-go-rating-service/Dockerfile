FROM golang:1.25-alpine AS builder

WORKDIR /app

COPY jug-go-rating-service/go.mod jug-go-rating-service/go.sum ./
COPY jug-model/jug-model-go /jug-model/jug-model-go
RUN go mod download

COPY jug-go-rating-service .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o jug-go-rating-service ./cmd/server

FROM gcr.io/distroless/static:nonroot

WORKDIR /

COPY --from=builder /app/jug-go-rating-service /jug-go-rating-service

EXPOSE 50052

ENTRYPOINT ["/jug-go-rating-service"]
