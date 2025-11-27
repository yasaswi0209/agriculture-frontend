# Stage 1 - Build the Vite app
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the app (Vite outputs to /app/dist)
RUN npm run build

# Stage 2 - Serve with Nginx
FROM nginx:stable-alpine

# Copy custom nginx config (make sure nginx.conf exists in agriculture-front)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the Vite dist folder into Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
