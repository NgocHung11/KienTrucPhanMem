FROM postgres:15

# Đặt biến môi trường mặc định (có thể bị ghi đè khi chạy docker run)
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=secret
ENV POSTGRES_DB=testdb

# Init script sẽ chạy khi container khởi tạo db lần đầu tiên
COPY init.sql /docker-entrypoint-initdb.d/
