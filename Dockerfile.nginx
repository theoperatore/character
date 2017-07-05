FROM nginx:1.11

RUN ["mkdir", "-p", "/srv/www", "/etc/nginx/sites-enabled"]

COPY ./nginx/nginx.conf /etc/nginx
COPY ./nginx/sites-available/ /etc/nginx/sites-available
COPY ./build/. /srv/www/.

# link in our site config
RUN ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

EXPOSE 80
