FROM nginx:latest                         #Docker image kontajnera

LABEL maintainer="David Majoros"          #nazov autora

COPY ./ /usr/share/nginx/html/            #kopirovanie aplikacie

RUN ls -la /usr/share/nginx/html/CSS      #vylistovanie adresara
RUN ls -la /usr/share/nginx/html/JS       #vylistovanie adresara
