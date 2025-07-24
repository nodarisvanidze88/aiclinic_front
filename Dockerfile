# ---------- 1) Build React ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci           # fast, deterministic install

COPY . .
RUN npm run build    # creates /app/build

# ---------- 2) Minimal Nginx ----------
FROM nginx:alpine

# copy static files
COPY --from=build /app/build /usr/share/nginx/html
# replace default vhost with simple SPA config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
