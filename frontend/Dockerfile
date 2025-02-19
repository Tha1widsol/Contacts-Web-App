# Use a Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install

# Copy all other project files (excluding node_modules)
COPY . .

# Expose the port the app runs on
EXPOSE 5174

# Command to run the app (make sure your package.json has a "dev" script)
CMD ["npm", "run", "dev"]
