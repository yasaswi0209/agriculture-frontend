# Step 1: Build Vite production bundle
FROM node:18 AS build
WORKDIR /app

RUN apt-get update && apt-get install -y git

# Clone your repo
RUN git clone https://github.com/yasaswi0209/agriculture-frontend.git .

# Install dependencies
RUN npm install

# FIX: Give Vite execute permission
RUN chmod +x node_modules/.bin/vite

# Build Vite project
RUN npm run build

# Step 2: Serve with nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
