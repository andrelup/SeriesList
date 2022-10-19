FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY ./dist/series-list .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
