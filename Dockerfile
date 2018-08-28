FROM node:10
WORKDIR /app

ADD yarn.lock .
ADD package.json .

RUN yarn install

ADD . . 

CMD ["node", "src/index.js"]