#!/bin/bash

# Cài đặt dependencies cho frontend và build
cd ./web
npm install
npm run build

# Đẩy file build lên S3 và cập nhật file index.html
aws s3 rm s3://pet-relive.online --recursive
aws s3 sync ./out s3://pet-relive.online

# Đẩy file build từ S3 lên CloudFront (mất khoảng 15 phút để hoàn thành)
# aws cloudfront create-invalidation --distribution-id E3LAN1VUX3SIDR --paths "/*"