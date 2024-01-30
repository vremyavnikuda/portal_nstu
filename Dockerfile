FROM golang:1.21-alpine AS builder

WORKDIR /usr/local/src

RUN apk --no-cache add bash git make gcc gettext musl-dev


#dependencies
COPY ["backend/go.mod", "backend/go.sum","./"]
RUN go mod download

#build
COPY backend ./
RUN go build -o ./bin/backend ./main.go

FROM alpine AS runner

COPY --from=builder /usr/local/src/bin/backend ./

#PORT 8000
EXPOSE 8080

#RUN the command
CMD ["/backend"]

