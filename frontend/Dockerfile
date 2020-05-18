FROM node:latest as dev
ENV MY_ENV_FLAG=production
RUN npm config set registry http://registry.npm.taobao.org/ && \
    mkdir frontend
WORKDIR /frontend
COPY . .
RUN npm install
CMD npm start

FROM node:latest as prod 
ENV MY_ENV_FLAG=production
RUN npm config set registry http://registry.npm.taobao.org/ && \
    mkdir frontend
WORKDIR /frontend
COPY . .
RUN npm install && \ 
    npm run build 
COPY build /root/build/usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
