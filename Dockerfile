# Use the Node.js image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package files to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the files into the container
COPY . .

# Expose port 3000 (the port your app runs on)
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]
