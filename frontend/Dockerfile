# Stage 1: Build the application
FROM node:20-alpine AS builder
LABEL authors="vremyavnikuda"

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

RUN npm install -g @angular/cli
# Install dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Build the application for production
RUN npm run build --prod

# Stage 2: Create a minimal image for running the application
FROM nginx:alpine

# Copy the built application from the builder stage to the nginx server
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose the port used by the nginx server
EXPOSE 4200

# Command to run the nginx server
CMD ["nginx", "-g", "daemon off;"]
