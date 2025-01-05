FROM --platform=linux/amd64 node:alpine AS build_amd64

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

COPY . .

CMD ["npm", "start"]