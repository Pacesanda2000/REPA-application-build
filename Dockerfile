#FROM httpd:2.4

#LABEL maintainer="David Majoros"

#COPY * /usr/local/apache2/htdocs/

FROM nginx:latest

RUN ls -la .

COPY * /usr/share/nginx/html/
