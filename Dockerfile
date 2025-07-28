# ---------- 1) Build React ----------
FROM node:20-alpine AS build
WORKDIR /app

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
