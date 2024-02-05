# Stage 1: Build the application
FROM golang:1.21-alpine AS builder
LABEL authors="vremyavnikuda"

WORKDIR /usr/local/src

# Install necessary packages
RUN apk --no-cache add bash git make gcc gettext musl-dev

# Copy only necessary files for downloading dependencies
COPY ["go.mod", "go.sum", "./"]

# Download dependencies
RUN go mod download

# Copy the entire project
COPY [".", "./"]

# Build the application
RUN go build -o ./bin/user-temporary-data-service

# Stage 2: Create a minimal image for running the application
FROM alpine:latest AS runner

WORKDIR /usr/local/bin/

# Copy the built application and .env file from the builder
COPY --from=builder /usr/local/src/bin/user-temporary-data-service ./
COPY --from=builder /usr/local/src/.env ./

# Expose the port used by the application
EXPOSE 8001

# Run the application
CMD ["./user-temporary-data-service", "--env-file", "./.env"]
