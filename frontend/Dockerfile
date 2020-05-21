FROM node:latest as dev
RUN npm config set registry http://registry.npm.taobao.org/ && \
    mkdir frontend
WORKDIR /frontend
COPY . .
RUN npm install
CMD npm start

FROM node:latest as build
ENV MY_ENV_FLAG=production
RUN npm config set registry http://registry.npm.taobao.org/ && \
    mkdir frontend
WORKDIR /frontend
COPY . .
RUN npm install && \ 
    npm run build 

FROM nginx:latest as prod
COPY --from=build /frontend/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

