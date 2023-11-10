#!/bin/bash
cd /home/runner/actions-runner/_work/social-media-web/social-media-web
git pull origin main

# Install dependencies nextJS
cd web
npm install
npm run build
pm2 restart nextjs-app

# Install dependencies rails
cd ../api
bundle install
echo "$PROD_BACKEND" > config/application.yml
# echo '${{ secrets.SUDO_PASSWORD }}' | sudo -S systemctl start puma.service
echo "$SUDO_PASSWORD" | sudo -S systemctl restart puma.service
