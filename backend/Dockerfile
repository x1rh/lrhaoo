FROM python:3.7-alpine


RUN echo "http://mirrors.ustc.edu.cn/alpine/v3.9/main" > /etc/apk/repositories && \
    echo "http://mirrors.ustc.edu.cn/alpine/v3.9/community" >> /etc/apk/repositories && \

    apk update && \
#    apk add --no-cache gcc musl-dev libxslt-dev libgcc libressl-dev libffi-dev && \
#    apt install python3-lxml && \

    # for lxml
    apk add --no-cache --virtual .build-deps gcc libc-dev libxslt-dev libxslt && \

    # for cryptography
    apk add --no-cache libressl-dev musl-dev libffi-dev && \

    mkdir /backend

WORKDIR /backend

COPY . .

RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt && \

    apk del .build-deps &&\
    apk del libressl-dev musl-dev libffi-dev


ENTRYPOINT ["./entrypoint.sh"]