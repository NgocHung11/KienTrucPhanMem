import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#0d6efd' }}>⚛️ React + Nginx 🚀</h1>
      <h2>Thành Công: Hoàn thành Bài 13!</h2>
      <p style={{ fontSize: '1.2rem', color: '#555' }}>Ứng dụng React của anh đã được <strong>build thành file tĩnh</strong> bằng Node.js <br/> và hiện đang được phát thông qua một <strong>Web Server Nginx</strong> siêu nhẹ.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
