# Sử dụng image Node.js gọn nhẹ
FROM node:18-alpine

# Set thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ code vào trong container
COPY . .

# Expose cổng 3000 ra ngoài mạng Docker
EXPOSE 3000

# Lệnh khởi chạy ứng dụng
CMD ["npm", "start"]
