FROM python:3.7-alpine


RUN echo "http://mirrors.ustc.edu.cn/alpine/v3.9/main" > /etc/apk/repositories && \
    echo "http://mirrors.ustc.edu.cn/alpine/v3.9/community" >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache file make gcc musl-dev libxslt-dev libgcc libressl-dev libffi-dev && \
    mkdir /backend

COPY . /backend

WORKDIR /backend/application

RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt

#CMD flask run --host=0.0.0.0 --port=5000
CMD PYTHONPATH=`pwd`/../.. gunicorn -c gunicorn.conf.py app:app
