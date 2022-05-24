FROM node:16.6-alpine

WORKDIR ./

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3303

CMD npm start