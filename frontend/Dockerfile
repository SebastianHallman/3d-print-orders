FROM node:22.19.0 AS dep

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm ci

COPY . /app/

RUN npm run build

CMD [ "npm", "start" ]