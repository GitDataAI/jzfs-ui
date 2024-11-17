FROM node:22.6.0-alpine3.20
WORKDIR /usr/src/app

COPY . .
RUN npm install --global pnpm
RUN pnpm install

RUN pnpm run build

FROM nginx:latest

COPY --from=0 /usr/src/app/dist /usr/share/nginx/html
COPY script/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80