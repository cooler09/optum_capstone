# Stage 1: Build the Angular application
FROM node:alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

ARG configuration=production


# Install Angular CLI globally
RUN npm install -g @angular/cli

# Build the Angular app
RUN npm run build -- --configuration $configuration

# Stage 2: Serve the Angular application
FROM nginx:alpine

# Copy the built Angular app from the previous stage
COPY --from=build /app/dist/angular-app/browser/ /usr/share/nginx/html

# Expose the port on which the app will run
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]