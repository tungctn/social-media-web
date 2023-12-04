#!/bin/bash

# Khởi tạo package manager nvm và rbenv
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"


export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"

export PATH=$PATH:~/.local/bin

# Cập nhật mã nguồn
git pull origin main

# Cài đặt dependencies cho backend
cd api
bundle install

# Khởi động lại server

pm2 restart rails-app