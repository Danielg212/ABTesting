FROM node:alpine as base

WORKDIR /app

COPY package.json ./

RUN rm -rf node_modules && npm i && npm run build

COPY . .

CMD ["node", "dist/index.js"]

#
#FROM node:lts
#
#COPY . /app
#
#WORKDIR /app
#
#RUN npm i && npm run build
#
#CMD ["node", "dist/index.js"]
