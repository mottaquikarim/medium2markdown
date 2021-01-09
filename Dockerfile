ARG NODE_VERSION
 
FROM node:$NODE_VERSION-alpine

WORKDIR /app

COPY main.js .
COPY package.json .
COPY package-lock.json .

RUN chmod +x main.js
RUN npm install --save

ENTRYPOINT ["node", "/app/main.js"]