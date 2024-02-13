#FROM httpd:2.4

#LABEL maintainer="David Majoros"

#COPY * /usr/local/apache2/htdocs/

FROM nginx:latest

COPY * /usr/share/nginx/html/

RUN ls -la /usr/share/nginx/html/
