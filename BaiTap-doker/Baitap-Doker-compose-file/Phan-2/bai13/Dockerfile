# ==== STAGE 1: Dùng hệ điều hành chứa Node lớn để xử lý Code JS dài dòng thành dạng chuẩn tĩnh ====
FROM node:18-alpine AS build

# Đặt thư mục làm việc trong container
WORKDIR /app

# Khai báo file cài đặt và Tải bộ thư viện js
COPY package*.json ./
RUN npm install

# Bê hết code từ bên ngoài vào thư mục trong Container node
COPY public/ ./public/
COPY src/ ./src/

# Bắt đầu dịch code jsx, es6 sang code chuẩn tĩnh /html/css/js thuần. (Kết quả nằm ở thư mục /app/build)
RUN npm run build


# ==== STAGE 2: Triển khai lên Nginx chạy độc lập gọn nhẹ ====
FROM nginx:alpine

# Copy nguyên folder đã build sẵn ở Stage 1 vào Nginx (vứt bỏ tất cả phần node, src.. tốn dung lượng thừa thãi)
COPY --from=build /app/build /usr/share/nginx/html

# Mở cổng giao tiếp Nginx chuẩn Web
EXPOSE 80

# Chạy Server Web
CMD ["nginx", "-g", "daemon off;"]
