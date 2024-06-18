FROM node:slim as base

COPY . /app

WORKDIR /app

RUN npm i && npm run build

CMD ["node", "dist/index.js"]