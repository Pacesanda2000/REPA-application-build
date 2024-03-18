FROM nginx:latest                           #

LABEL maintainer="David Majoros"            #

COPY ./ /usr/share/nginx/html/              #

RUN ls -la /usr/share/nginx/html/CSS        #
RUN ls -la /usr/share/nginx/html/JS         #
