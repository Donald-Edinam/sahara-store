# Use a specific Node.js version for better reproducibility
FROM node:18.17.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
# FIX: Added trailing slash to destination to indicate it's a directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Use node to run the application
CMD ["npm", "index.js"]