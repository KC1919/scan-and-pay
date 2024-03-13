# Use the Node.js 20-alpine image as base (as prisma requires >=16.13)
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the application code
COPY . .

# Install dependencies
RUN npm install

# Build TypeScript code
RUN npm run build
 
# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
