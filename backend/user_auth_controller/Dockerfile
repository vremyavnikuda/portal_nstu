# Stage 1: Build the Go application
FROM golang:1.21-alpine AS builder

WORKDIR /app

COPY . .

RUN go mod download
RUN go build -o main .

# Stage 2: Create a minimal image for running the application
FROM alpine:latest AS runner

WORKDIR /usr/local/bin/

COPY --from=builder /app/main .

CMD ["./main"]
