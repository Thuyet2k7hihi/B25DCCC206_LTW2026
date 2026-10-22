import React, { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const menus = [
  { to: '/', text: 'Trang chủ', symbol: '⌂', end: true },
  { to: '/questions', text: 'Ngân hàng câu hỏi', symbol: '▦' },
  { to: '/history', text: 'Lịch sử', symbol: '◷' },
];

export default function Layout({ loading, error }) {
  const location = useLocation();
  useEffect(() => {
    const names = { '/': 'Trang chủ', '/play': 'Đang chơi', '/result': 'Kết quả', '/history': 'Lịch sử', '/questions': 'Ngân hàng câu hỏi' };
    const title = names[location.pathname] || (location.pathname.startsWith('/questions/') ? 'Chi tiết câu hỏi' : '404');
    document.title = `${title} | Ai là triệu phú`;
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo" aria-label="Ai là triệu phú - Trang chủ">
            <span className="logo-mark">✦</span>
            <span className="logo-type"><strong>AI LÀ TRIỆU PHÚ</strong><small>WEB DEVELOPER EDITION</small></span>
          </Link>
          <nav className="main-nav" aria-label="Điều hướng chính">
            {menus.map((menu) => (
              <NavLink key={menu.to} to={menu.to} end={menu.end} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
                <span aria-hidden="true">{menu.symbol}</span> {menu.text}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="main-content">
        {loading ? (
          <div className="state-panel"><span className="loading-ring" aria-hidden="true" /><h2>Đang tải câu hỏi...</h2><p>Đang chuẩn bị thử thách lập trình web của bạn.</p></div>
        ) : error ? (
          <div className="state-panel"><h2>Không tải được câu hỏi</h2><p>Hãy kiểm tra file public/data/questions.json và tải lại trang.</p></div>
        ) : <Outlet />}
      </main>
      <footer className="site-footer"><span>✦ 15 câu hỏi · 3 chặng thử thách · 1 ngôi vị triệu phú</span><span>TH02 · Lập trình Web</span></footer>
    </div>
  );
}
