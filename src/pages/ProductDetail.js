import { useNavigate, useParams } from 'react-router-dom';
import { formatMoney } from '../data';

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);
  const product = products.find((item) => item.id === numericId);

  return (
    <section className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow eyebrow-dark">SẢN PHẨM / CHI TIẾT</p>
          <h1>Chi tiết sản phẩm</h1>
          <p>Thông tin mặt hàng trong kho.</p>
        </div>
      </div>
      <div className="detail-card">
        {!product ? (
          <p className="not-found" role="alert">Không tìm thấy sản phẩm.</p>
        ) : (
          <>
            <div className="detail-top">
              <div className="detail-symbol" aria-hidden="true">▣</div>
              <div>
                <span className="detail-subtitle">Mặt hàng #{product.id}</span>
                <h2>{product.name}</h2>
              </div>
            </div>
            <dl className="detail-list">
              <div><dt>Tên sản phẩm:</dt><dd>{product.name}</dd></div>
              <div><dt>Danh mục:</dt><dd>{product.category}</dd></div>
              <div><dt>Giá:</dt><dd>{formatMoney(product.price)}</dd></div>
              <div><dt>Tồn kho:</dt><dd className={product.stock < 5 ? 'low-stock' : ''}>{product.stock}</dd></div>
            </dl>
          </>
        )}
        <button type="button" className="back-button" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
      </div>
    </section>
  );
};

export default ProductDetail;
