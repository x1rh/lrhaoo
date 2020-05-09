#!/bin/sh

while true; do
    flask initdb
    if [[ "$?" == "0" ]]; then
        flask mockdb
        break
    fi
    echo db init failed, retrying in 15 secs...
    sleep 15
done

flask run --host=0.0.0.0 --port=5000
#CMD gunicorn --workers=3 -b 0.0.0.0:5000 app:app
