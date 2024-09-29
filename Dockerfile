# Use Node.js 18 as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, excluding Prisma
RUN npm ci --ignore-scripts

# Copy prisma schema
COPY prisma ./prisma/

# Install Prisma CLI
RUN npm install prisma --save-dev

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000


# Start the application, and run migrations at runtime
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]