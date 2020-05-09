FROM node:latest

ENV LRH=TEST

RUN npm config set registry http://registry.npm.taobao.org/ && \
    mkdir frontend

WORKDIR /frontend

COPY . .

RUN npm install

CMD export NODE_ENV='production' && npm start


