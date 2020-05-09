FROM python:3.7-alpine


RUN echo "http://mirrors.ustc.edu.cn/alpine/v3.9/main" > /etc/apk/repositories && \
    echo "http://mirrors.ustc.edu.cn/alpine/v3.9/community" >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache gcc musl-dev libxslt-dev libgcc libressl-dev libffi-dev && \
    mkdir /backend

WORKDIR /backend

COPY . .

RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt

ENTRYPOINT ["./entrypoint.sh"]
