FROM node:latest

RUN npm config set registry http://registry.npm.taobao.org/ && \
    mkdir frontend

WORKDIR /frontend

COPY . .

RUN npm install

CMD ["npm", "start"]


