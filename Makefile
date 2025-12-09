.PHONY: generate-models install-frontend install-all start-frontend clean help

# Load environment variables from .env file
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

help:
	@echo "Available targets:"
	@echo "  generate-models   - Generate protobuf models"
	@echo "  install-frontend  - Install frontend dependencies using GitHub registry"
	@echo "  install-all       - Install all project dependencies"
	@echo "  start-frontend    - Start the frontend development server"
	@echo "  clean             - Remove node_modules and package-lock.json"
	@echo "  help              - Show this help message"

generate-models:
	@echo "Generating protobuf models..."
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

start-frontend:
	@echo "Starting frontend development server..."
	@cd jug-frontend && npm run dev

clean:
	@echo "Cleaning frontend dependencies..."
	@rm -rf jug-frontend/node_modules
	@rm -f jug-frontend/package-lock.json
	@echo "Clean complete!"
