FROM node:slim as build

COPY . /app

WORKDIR /app

RUN npm i && npm run build


COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

# delete all packages that we don't need for runtime to minimize the docker iamge size.
RUN npm ci --omit=dev

FROM node:slim as app

# specify the work dir again because we are in a new "Contianer"
WORKDIR /app

# copy the final product form the prev stage and this allows us to keep only the files we need at runtime.
COPY --from=build /app .

CMD ["node", "dist/index.js"]
