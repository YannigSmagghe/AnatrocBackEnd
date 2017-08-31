FROM node:8.1

RUN deluser node

ARG USER=node
ARG USER_GID=1000
ARG USER_UID=1000
ARG API_URL
ENV API_URL $API_URL
# Create user with home to work with permissions on files
RUN addgroup --gid $USER_GID $USER
RUN adduser --gecos "" --disabled-password --uid $USER_UID --gid $USER_GID $USER

COPY ./scripts/bootstrap.sh /usr/local/bin/bootstrap
RUN chmod +x /usr/local/bin/bootstrap

RUN chown -R $USER:$USER /usr/local/bin \
    /usr/local/lib/node_modules

USER $USER

WORKDIR /app

CMD bootstrap
