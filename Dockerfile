# ---------- 1) Build React ----------
FROM node:20-alpine AS build
WORKDIR /app

# Accept build arguments for environment variables
ARG REACT_APP_API_BASE_URL=https://api.aiclinic.bio
ARG REACT_APP_ENVIRONMENT=production
ARG REACT_APP_APP_NAME=AIClinic
ARG REACT_APP_VERSION=1.0.0

# Set environment variables for React build
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_ENVIRONMENT=$REACT_APP_ENVIRONMENT
ENV REACT_APP_APP_NAME=$REACT_APP_APP_NAME
ENV REACT_APP_VERSION=$REACT_APP_VERSION

# Don't set NODE_ENV=production here — we need devDependencies to build
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build    # creates /app/build

# ---------- 2) Minimal Nginx ----------
FROM nginx:alpine

# Install a tiny HTTP client for the healthcheck
RUN apk add --no-cache curl

# Copy static files and vhost
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Healthcheck hits the /health endpoint defined in nginx.conf
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -fsS http://127.0.0.1/health || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
