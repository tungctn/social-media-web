#!/bin/bash

# Khởi tạo package manager nvm và rbenv

export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"

export PATH=$PATH:~/.local/bin

# Cập nhật mã nguồn
git pull origin main

# Cài đặt dependencies cho backend
cd api
bundle install
pm2 restart rails-app

# Cài đặt dependencies cho frontend và build
# cd ../web
# npm install
# npm run build

# Đẩy file build lên S3 và cập nhật file index.html
# aws s3 rm s3://pet-relive.online --recursive
# aws s3 sync ./out s3://pet-relive.online

# Restart services
