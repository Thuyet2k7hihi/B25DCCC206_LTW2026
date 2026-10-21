import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';

const ProductList = ({ products, onDeleteProduct, onUpdateStock }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [message, setMessage] = useState('');
  const location = useLocation();

  // Tên hàm này là yêu cầu bắt buộc của đề.
  const handleQueryShift = (event) => setQuery(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);

  // Lấy thông báo chỉ từ điều hướng sau khi thêm sản phẩm.
  useEffect(() => {
    const nextMessage = location.state?.message || '';
    setMessage(nextMessage);
    if (!nextMessage) {
      return undefined;
    }
    const timer = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [location.key, location.state]);

  const filteredProducts = products.filter((product) => {
    const matchedName = product.name.toLocaleLowerCase('vi-VN')
      .includes(query.trim().toLocaleLowerCase('vi-VN'));
    const matchedCategory = category === 'Tất cả' || product.category === category;
    return matchedName && matchedCategory;
  });

  return (
    <section className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow eyebrow-dark">SẢN PHẨM / QUẢN LÝ</p>
          <h1>Danh sách sản phẩm</h1>
          <p>Xem và cập nhật số lượng hàng tồn kho.</p>
        </div>
        <Link className="primary-button" to="/products/new">+ Thêm mới</Link>
      </div>

      {message && (
        <div className="toast" role="status" aria-live="polite">
          <span className="toast-check" aria-hidden="true">✓</span>
          <span>{message}</span>
          <button className="toast-close" type="button" onClick={() => setMessage('')} aria-label="Đóng thông báo">×</button>
        </div>
      )}

      <div className="panel">
        <FilterBar
          query={query}
          category={category}
          onQueryChange={handleQueryShift}
          onCategoryChange={handleCategoryChange}
        />
        <div className="table-info">
          <span>Tìm thấy <strong>{filteredProducts.length}</strong> sản phẩm</span>
          <span className="table-hint">Tồn kho dưới 5 được đánh dấu đỏ</span>
        </div>
        <ProductTable
          products={filteredProducts}
          onDeleteProduct={onDeleteProduct}
          onUpdateStock={onUpdateStock}
        />
      </div>
    </section>
  );
};

export default ProductList;
