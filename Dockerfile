# ---------- 1) Build React ----------
FROM node:20-alpine AS build
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- 2) Minimal Nginx ----------
FROM nginx:alpine
# copy static files
COPY --from=build /app/build /usr/share/nginx/html
# replace default vhost with simple SPA config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# simple healthcheck (uses /health from your nginx.conf)
HEALTHCHECK CMD wget -qO- http://127.0.0.1/health >/dev/null 2>&1 || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
