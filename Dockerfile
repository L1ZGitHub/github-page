# The site is static: one page, its film, fonts and discovery files, served by nginx.
# It listens on 3000, the port the previous Next.js container used, so the Coolify settings stay as they are.
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/
EXPOSE 3000
