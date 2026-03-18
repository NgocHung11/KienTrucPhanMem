FROM php:8.2-apache
RUN a2enmod rewrite
# Mount volume được thực hiện lúc run, không cần define VOLUME bắt buộc trong Dockerfile như sau:
# docker run -d -p 8080:80 -v $(pwd):/var/www/html/ img-php
