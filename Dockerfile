FROM busybox:1.35

WORKDIR /static

COPY dist/. .
COPY start.sh .

RUN busybox chmod +x start.sh

ENTRYPOINT ["sh", "start.sh"]