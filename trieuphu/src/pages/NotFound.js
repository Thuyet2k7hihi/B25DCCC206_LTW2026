import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return <section className="not-found fade-in"><span>404</span><h1>404 - Không tìm thấy trang</h1><p>Đường dẫn bạn đang tìm không tồn tại.</p><Link to="/" className="btn btn-primary">Về trang chủ →</Link></section>;
}
