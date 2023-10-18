FROM node:18.17-slim
MAINTAINER MarkMY_Hsieh@moxa.com

RUN apt-get update -qq \
    && apt-get upgrade -y

ADD it-automation-form.tar.gz /app
WORKDIR /app

# RUN chown -R node:node /usr/local/lib/node_modules \
#  && chown -R node:node /usr/local/bin

# USER node

RUN npm install -g npm@10.1.0 \
    && npm install -g @angular/cli@16.2.0 \
    && npm cache clean --force
RUN npm update \
    && npm install
RUN ng analytics off
CMD "ng" "serve" "--host" "0.0.0.0" "--disable-host-check"