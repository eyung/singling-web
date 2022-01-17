#!/bin/sh 

cd 'C:\Users\Effiam\Downloads\singling-web\src\main\frontend'

echo “Building React Project …” 
npm run build 

echo “Copying html file …” 
cp -r build html 

echo “Connecting to AWS VM and copying file to /usr/share/nginx …” 
pscp -i 'C:\Users\Effiam\Downloads\aws\webdev.ppk' -r 'C:\Users\Effiam\Downloads\singling-web\src\main\frontend\html' ec2-user@3.99.30.184:/usr/share/nginx

echo “Removing html file from local directory …” 
rm -r html

$SHELL