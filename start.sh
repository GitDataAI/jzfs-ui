#!/bin/bash

# replace api url
sed -i '9s|"[^"]*"|"'$1'"|' index.html

busybox httpd -f -v -p 3000