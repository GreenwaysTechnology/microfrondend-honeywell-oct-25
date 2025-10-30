# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage with Nginx
FROM nginx:stable-alpine

# Copy built files into /usr/share/nginx/html/remote
COPY --from=build /app/dist /usr/share/nginx/html/remote

# Copy the fixed Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
