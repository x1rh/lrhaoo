FROM node:latest

RUN npm config set registry http://registry.npm.taobao.org/ && \
    npx create-react-app webapp

WORKDIR /webapp

CMD npm start
