# Use the official Node.js image as the base image
FROM registry.access.redhat.com/ubi8/nodejs-20:latest AS builder

# Set working directory
WORKDIR /app

# Install global Nx CLI
RUN npm install -g nx

# Copy only the package.json and lock files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Build the React app
RUN nx run kataza:build

# Run the app
CMD ["nx", "run", "kataza:start", "-p 8080"]