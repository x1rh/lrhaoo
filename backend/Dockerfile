FROM python:3.7-alpine


RUN echo "http://mirrors.ustc.edu.cn/alpine/v3.9/main" > /etc/apk/repositories && \
    echo "http://mirrors.ustc.edu.cn/alpine/v3.9/community" >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache gcc musl-dev libxslt-dev libgcc && \
    mkdir /backend

WORKDIR /backend

COPY . .

RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt

#CMD flask run --host=0.0.0.0 --port=5000
#CMD gunicorn --workers=3 -b 0.0.0.0:5000 app:app
ENTRYPOINT ["./entrypoint.sh"]