FROM node:10
WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT ["/usr/local/bin/node", "server.js"]
