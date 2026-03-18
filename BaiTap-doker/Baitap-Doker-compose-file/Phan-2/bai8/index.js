const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

let connection;

// Hàm tự động kết nối lại nếu MySQL chưa khởi động xong
function handleDisconnect() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'mydb'
  });

  connection.connect(function(err) {
    if(err) {
      console.log('Đang chờ MySQL khởi động, lỗi kết nối:', err.message);
      setTimeout(handleDisconnect, 2000); // Thử lại sau 2 giây
    } else {
      console.log('✅ Đã kết nối thành công với cơ sở dữ liệu MySQL!');
    }
  });

  connection.on('error', function(err) {
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

app.get('/', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
    if (err) {
      res.status(500).send('Lỗi truy vấn cơ sở dữ liệu: ' + err.message);
    } else {
      res.send(`<h1>🎉 Kết nối thành công!</h1> <p>Node.js đã truy vấn MySQL. Kết quả của SELECT 1+1 = <b>${results[0].solution}</b></p>`);
    }
  });
});

app.listen(port, () => {
  console.log(`Node app is running on http://localhost:${port}`);
});
