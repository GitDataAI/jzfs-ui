#!/bin/bash

# replace api url
sed -i '9s|"[^"]*"|"'$JIAOZIFS_API_URL'"|' /usr/share/nginx/html/index.html
