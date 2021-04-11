FROM node:latest as base
RUN npm config set registry http://registry.npm.taobao.org/ && \
    mkdir frontend
WORKDIR /frontend
COPY . .
RUN npm install && \
    mkdir /backup && \
    cp -r ./node_modules /backup

FROM base as dev
CMD cp -rf /backup/node_modules /frontend && \
    npm start

FROM base as build
WORKDIR /frontend
RUN npm run build

FROM nginx:latest as prod
COPY --from=build /frontend/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

