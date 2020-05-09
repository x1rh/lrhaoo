FROM node:latest

ENV MY_ENV_FLAG=production

RUN npm config set registry http://registry.npm.taobao.org/ && \
    mkdir frontend

WORKDIR /frontend

COPY . .

RUN npm install

CMD export NODE_ENV='production' && npm start


