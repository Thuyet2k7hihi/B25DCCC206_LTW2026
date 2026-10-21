import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const Home = ({ products }) => {
  const totalProducts = products.length;
  const lowStockProducts = products.filter(({ stock }) => stock < 5).length;
  const totalValue = products.reduce((sum, { price, stock }) => sum + price * stock, 0);

  return (
    <section className="page-stack">
      <div className="hero">
        <span className="eyebrow">TRANG CHỦ / TỔNG QUAN</span>
        <h1>Kho hàng</h1>
        <p>Theo dõi sản phẩm, kiểm soát tồn kho và cập nhật số lượng nhanh chóng.</p>
        <Link to="/products" className="primary-button hero-button">Xem danh sách <span aria-hidden="true">→</span></Link>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-box hero-box-one" />
          <div className="hero-box hero-box-two" />
          <div className="hero-box hero-box-three" />
        </div>
      </div>
      <div className="section-head">
        <div>
          <p className="eyebrow eyebrow-dark">SỐ LIỆU HIỆN TẠI</p>
          <h2>Tổng quan kho</h2>
        </div>
        <span className="live-indicator"><span aria-hidden="true" />Cập nhật theo thời gian thực</span>
      </div>
      <div className="stats-grid">
        <article className="stat-card">
          <div className="stat-icon stat-icon-neutral" aria-hidden="true">▦</div>
          <p>Tổng số sản phẩm:</p>
          <strong>{totalProducts}</strong>
          <span className="stat-description">Mặt hàng đang quản lý</span>
        </article>
        <article className="stat-card">
          <div className="stat-icon stat-icon-red" aria-hidden="true">!</div>
          <p>Số sản phẩm sắp hết hàng:</p>
          <strong>{lowStockProducts}</strong>
          <span className="stat-description">Sản phẩm có tồn kho dưới 5</span>
        </article>
        <article className="stat-card">
          <div className="stat-icon stat-icon-green" aria-hidden="true">₫</div>
          <p>Tổng giá trị kho:</p>
          <strong className="stat-money">{formatMoney(totalValue)}</strong>
          <span className="stat-description">Tổng giá × số lượng tồn</span>
        </article>
      </div>
      <div className="bottom-note">
        <div>
          <strong>Quản lý hàng tồn kho dễ dàng hơn</strong>
          <p>Vào danh sách để nhập, bán, tìm kiếm hoặc cập nhật sản phẩm.</p>
        </div>
        <Link to="/products/new" className="text-link">Thêm sản phẩm mới →</Link>
      </div>
    </section>
  );
};

export default Home;
