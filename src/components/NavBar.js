import { Link, NavLink } from 'react-router-dom';

const NavBar = () => (
  <header className="site-header">
    <div className="header-inner">
      <Link className="brand" to="/" aria-label="Kho hàng - Trang chủ">
        <span className="brand-mark" aria-hidden="true">K</span>
        <span>QUẢN LÝ <strong>KHO HÀNG</strong></span>
      </Link>
      <nav className="nav-links" aria-label="Điều hướng chính">
        <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          Trang chủ
        </NavLink>
        <NavLink to="/products" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          Danh sách
        </NavLink>
        <NavLink to="/products/new" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          Thêm mới
        </NavLink>
      </nav>
    </div>
  </header>
);

export default NavBar;
