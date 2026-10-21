import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => (
  <div className="app-shell">
    <NavBar />
    <main className="main-content">
      {loading ? (
        <div className="simple-message" role="status">Đang tải...</div>
      ) : error ? (
        <div className="simple-message error-message" role="alert">Không tải được dữ liệu.</div>
      ) : (
        <Outlet />
      )}
    </main>
    <footer className="site-footer">Quản lý kho hàng · Bài thực hành Lập trình Web 2026</footer>
  </div>
);

export default Layout;
