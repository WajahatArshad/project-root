FROM node:18 as build

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Nginx serve step
FROM nginx:alpine

# Copy Vite's dist folder to nginx's html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy your custom nginx config (make sure it listens on 5174)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5174

CMD ["nginx", "-g", "daemon off;"]
