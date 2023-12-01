#!/bin/bash
# Khởi tạo package manager nvm và rbenv
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"


export PATH=$PATH:~/.local/bin

# Cập nhật mã nguồn
git pull origin main

# Cài đặt dependencies cho frontend và build
cd ./web
npm install && npm run build

pm2 restart nextjs-app

# Đẩy file build lên S3 và cập nhật file index.html
# aws s3 rm s3://pet-relive.online --recursive
# aws s3 sync ./out s3://pet-relive.online

# Đẩy file build từ S3 lên CloudFront (mất khoảng 15 phút để hoàn thành)
# aws cloudfront create-invalidation --distribution-id E3LAN1VUX3SIDR --paths "/*"