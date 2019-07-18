
FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9003
ENTRYPOINT [ "node", "server.js" ]
