# Build step
FROM node:18 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Nginx serve step
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 5174

CMD ["nginx", "-g", "daemon off;"]
