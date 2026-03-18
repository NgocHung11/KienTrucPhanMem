const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Node.js Express App in Docker Compose! (Bài 4)');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
