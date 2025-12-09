package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"

	userv1 "github.com/dduzgun-security/jug/jug-model/jug-model-go/rating/user/v1"
	"google.golang.org/protobuf/encoding/protojson"
)

func main() {
	port := getPort()

	http.HandleFunc("/user", handleUserRequest)

	log.Printf("Jug User Service running on port %d\n", port)
	if err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil); err != nil {
		log.Fatal(err)
	}
}

func handleUserRequest(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

	// Handle OPTIONS request for CORS preflight
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	// Only accept POST requests
	if r.Method != http.MethodPost {
		sendErrorResponse(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	// Read request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		sendErrorResponse(w, http.StatusBadRequest, "Failed to read request body")
		return
	}
	defer r.Body.Close()

	// Parse JSON directly into User protobuf
	user := &userv1.User{}
	if err := protojson.Unmarshal(body, user); err != nil {
		sendErrorResponse(w, http.StatusBadRequest, fmt.Sprintf("Invalid user request: %v", err))
		return
	}

	// Log User Request
	log.Printf("Received UserRequest: %v\n", &userv1.UserRequest{
		User: user,
	})

	// Convert response to JSON
	jsonResponse, err := protojson.Marshal(&userv1.UserResponse{
		Message: "User registration received successfully",
	})
	if err != nil {
		sendErrorResponse(w, http.StatusInternalServerError, "Failed to create response")
		return
	}

	// Send response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func sendErrorResponse(w http.ResponseWriter, statusCode int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	errorResponse := map[string]string{"error": message}
	json.NewEncoder(w).Encode(errorResponse)
}

func getPort() int {
	portStr := os.Getenv("PORT")
	if portStr != "" {
		port, err := strconv.Atoi(portStr)
		if err == nil {
			return port
		}
	}
	return 8002
}
