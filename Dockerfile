FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
 
RUN npm run build

FROM node:20-alpine3.20 as deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

ARG 3333

EXPOSE ${PORT}

CMD ["npm", "run", "start"]