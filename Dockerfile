FROM node:22.6.0-alpine3.20
WORKDIR /usr/src/app

COPY . .


FROM nginx:1.26.2

COPY --from=0 /usr/src/app/dist /usr/share/nginx/html
COPY script/nginx.conf /etc/nginx/
COPY script/mime.types /etc/nginx/
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]