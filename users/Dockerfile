# Use official Node.js image as base
FROM node:20

# Set working directory
WORKDIR /app/users

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy TypeScript source code to work directory
COPY . .

# Transpile TypeScript code
RUN npm run build

# Expose port
# EXPOSE 3000

# Command to run the server
CMD ["npm", "run", "dev"]
