FROM node:8.1


COPY ./scripts/bootstrap.sh /usr/local/bin/bootstrap
RUN chmod +x /usr/local/bin/bootstrap

RUN chown -R node:node /usr/local/bin \
    /usr/local/lib/node_modules


USER node

WORKDIR /app

CMD bootstrap