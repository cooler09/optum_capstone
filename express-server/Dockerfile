# Use a base image with Node.js
FROM node:18-alpine  

# Install dependencies for sqlite3
RUN apk add --no-cache \
    g++ \
    make \
    python3 \
    sqlite

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the application will run
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]