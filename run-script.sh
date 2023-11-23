# Hàm để dừng tất cả các tiến trình phụ
cleanup() {
    echo "Stopping frontend and backend servers"
    kill -9 $pid_frontend
    kill -9 $pid_backend
}

# Bắt tín hiệu và gọi hàm cleanup
trap cleanup INT

# Khởi động frontend và backend server
echo "Starting the frontend server"
cd web && npm i && npm run dev &
pid_frontend=$!

echo "Starting the backend server"
cd api && bundle install && rails server -p 4000 &
pid_backend=$!

wait