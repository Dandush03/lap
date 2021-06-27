FROM node:16.3

ARG RAILS_ENV

RUN mkdir /usr/src/cache
RUN mkdir /usr/src/app

WORKDIR /usr/src/cache

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

WORKDIR /usr/src/app

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3002

CMD ["yarn", "start"]
