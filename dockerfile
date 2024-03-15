

# FROM node:18-alpine

# WORKDIR /app

# COPY package.json /

# RUN yarn install

# COPY . /

# RUN yarn run build

# EXPOSE 3001

# CMD [ "yarn", "start" ]


FROM node:18.15.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./usr/src/app

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "node", "server/server.ts" ]

