.PHONY: generate-models install-frontend install-js-backend install-java-backend install-go-backend start-frontend start-js-backend start-java-backend start-go-backend start-all clean help run-slides-fr run-slides-en

# Load environment variables from .env file
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

help:
	@echo "Available targets:"
	@echo "  generate-models      - Generate protobuf models"
	@echo "  install-frontend     - Install frontend dependencies using GitHub registry"
	@echo "  install-js-backend   - Install JS consent service dependencies"
	@echo "  install-java-backend - Install Java poutine service dependencies"
	@echo "  install-go-backend   - Install Go user service dependencies"
	@echo "  start-frontend       - Start the frontend development server"
	@echo "  start-js-backend     - Start the JS consent service"
	@echo "  start-java-backend   - Start the Java poutine service"
	@echo "  start-go-backend     - Start the Go user service"
	@echo "  start-all            - Start all services (frontend, JS backend, Java backend, Go backend)"
	@echo "  clean                - Remove node_modules and package-lock.json"
	@echo "  help                 - Show this help message"
	@echo "  run-slides-en        - Run presentation slides in English"
	@echo "  run-slides-fr        - Run presentation slides in French"

generate-models:
	@echo "Generating protobuf models..."
	@cd jug-model/proto && buf dep update
	@cd jug-model && buf generate
	@echo "Protobuf models generated successfully!"

install-frontend:
	@echo "Installing frontend dependencies..."
	@if [ -z "$$GH_AUTH_TOKEN" ]; then \
		echo "Error: GH_AUTH_TOKEN not set. Make sure .env file exists with GH_AUTH_TOKEN that has read access to GitHub Packages."; \
		exit 1; \
	fi
	@cd jug-frontend && npm install @dduzgun-security/jug-model@latest && npm install
	@echo "Frontend dependencies installed successfully!"

install-js-backend:
	@echo "Installing js backend dependencies..."
	@if [ -z "$$GH_AUTH_TOKEN" ]; then \
		echo "Error: GH_AUTH_TOKEN not set. Make sure .env file exists with GH_AUTH_TOKEN that has read access to GitHub Packages."; \
		exit 1; \
	fi
	@cd jug-consent-service-js && npm install @dduzgun-security/jug-model@latest && npm install
	@echo "JS backend dependencies installed successfully!"

install-java-backend:
	@echo "Installing Java backend dependencies..."
	@if [ -z "$$GH_AUTH_TOKEN" ]; then \
		echo "Error: GH_AUTH_TOKEN not set. Make sure .env file exists with GH_AUTH_TOKEN that has read access to GitHub Packages."; \
		exit 1; \
	fi
	@cd jug-poutine-service-java && mvn -s settings.xml clean compile
	@echo "Java backend dependencies installed successfully!"

install-go-backend:
	@echo "Installing Go backend dependencies..."
	@cd jug-user-service-go && go get github.com/dduzgun-security/jug/jug-model/jug-model-go@main && go mod tidy
	@echo "Go backend dependencies installed successfully!"

start-frontend: install-frontend
	@echo "Starting frontend development server..."
	@cd jug-frontend && npm run dev

start-js-backend: install-js-backend
	@echo "Starting JS backend server..."
	@cd jug-consent-service-js && node index.js

start-java-backend: install-java-backend
	@echo "Starting Java poutine service..."
	@if [ -z "$$GH_AUTH_TOKEN" ]; then \
		echo "Error: GH_AUTH_TOKEN not set. Make sure .env file exists with GH_AUTH_TOKEN that has read access to GitHub Packages."; \
		exit 1; \
	fi
	@cd jug-poutine-service-java && PORT=8001 mvn -s settings.xml compile exec:java -Dexec.mainClass="com.dduzgunsecurity.jug.poutine.Main"

start-go-backend: install-go-backend
	@echo "Starting Go user service..."
	@cd jug-user-service-go && PORT=8002 go run main.go

start-all: install-frontend install-js-backend install-java-backend install-go-backend
	@echo "Starting all services..."
	@$(MAKE) -j4 start-frontend start-js-backend start-java-backend start-go-backend


clean:
	@echo "Cleaning frontend dependencies..."
	@rm -rf jug-frontend/node_modules
	@rm -f jug-frontend/package-lock.json
	@echo "Clean complete!"

run-slides-en:
	@echo "Creating presentation slides in English..."
	@npm install -g @slidev/cli
	@slidev slides/slides-en.md
	@echo "Presentation slides created successfully!"

run-slides-fr:
	@echo "Creating presentation slides in French..."
	@npm install -g @slidev/cli
	@slidev slides/slides-fr.md
	@echo "Presentation slides created successfully!"