#!/bin/sh

while true; do
    flask initdb
    if [[ "$?" == "0" ]]; then
        flask mockdb
    fi
    echo db init failed, retrying in 5 secs...
    echo 数据库初始化失败, 五秒后进行重试...
    sleep 5
done

flask run --host=0.0.0.0 --port=5000
#CMD gunicorn --workers=3 -b 0.0.0.0:5000 app:app
