FROM python:3.7-alpine AS base
RUN apk update && \
    apk add --no-cache file make g++ gcc musl-dev libxslt-dev libgcc libressl-dev libffi-dev && \
    mkdir /backend
COPY . /backend
WORKDIR /backend/application
RUN pip install -r requirements.txt

FROM base AS dev
ENV FLASK_ENV=development
CMD flask run --host=0.0.0.0 --port=5000

FROM base AS prod
ENV FLASK_ENV=production
CMD PYTHONPATH=`pwd`/../.. gunicorn -c gunicorn.conf.py app:app
