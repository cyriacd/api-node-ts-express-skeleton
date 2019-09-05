FROM node:10

WORKDIR /usr/src/app

RUN npm i -g node-ts
RUN npm i -g typescript

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "ts-node", "index.ts" ]