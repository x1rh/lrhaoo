FROM python:3.8-alpine

ENV FLASK_APP=${FLASK_APP}
ENV FLASK_CONFIG=${FLASK_CONFIG}
ENV SECRET_KEY=${SECRET_KEY}

ENV MAIL_SERVER=${MAIL_SERVER}
ENV MAIL_USE_SSL=${MAIL_USE_SSL}
ENV MAIL_USERNAME=${MAIL_USERNAME}
ENV MAIL_PASSWORD=${MAIL_PASSWORD}
ENV MAIL_PORT=${MAIL_PORT}
ENV MAIL_SENDER=${MAIL_SENDER}

ENV DATABASE_USER=${DATABASE_USER}
ENV DATABASE_PASS=${DATABASE_PASS}
ENV DATABASE_HOST=${DATABASE_HOST}
ENV DATABASE_PORT=${DATABASE_PORT}
ENV DATABASE_NAME=${DATABASE_NAME}

ENV REDIS_PASS=${REDIS_PASS}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PORT=${REDIS_PORT}

RUN echo "http://mirrors.ustc.edu.cn/alpine/v3.9/main" > /etc/apk/repositories && \
    echo "http://mirrors.ustc.edu.cn/alpine/v3.9/community" >> /etc/apk/repositories && \
    mkdir /backend

WORKDIR /backend

COPY . .

RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt

CMD flask run --host=0.0.0.0 --port=5000
