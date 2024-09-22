# Use Node.js version 20.x to match the local environment
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
# Use npm ci for more reliable builds
# Add --legacy-peer-deps flag to handle peer dependency issues
RUN npm ci --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (adjust if needed)
EXPOSE 3000

# Use npm to run the start script defined in package.json
CMD ["npm", "start"]