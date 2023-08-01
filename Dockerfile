# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:18.17.0 as builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the Angular application for production
RUN npm run build

# Use a lightweight HTTP server to serve the Angular application
FROM nginx:1.21.1-alpine

# Copy the built Angular application from the previous stage
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 for the Angular application
EXPOSE 80

# Command to start the HTTP server when the container starts
CMD ["nginx", "-g", "daemon off;"]
