import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ProductRow = ({ product, onDeleteProduct, onUpdateStock }) => {
  const { id, name, category, price, stock } = product;
  const isLowStock = stock < 5;

  return (
    <tr>
      <td className="product-name-cell">
        <Link className="product-link" to={`/products/${id}`}>{name}</Link>
        <span className="muted-id">Mã #{id}</span>
      </td>
      <td><span className="category-chip">{category}</span></td>
      <td className="money-cell">{formatMoney(price)}</td>
      <td>
        <span className={`stock-number${isLowStock ? ' low-stock' : ''}`}>{stock}</span>
      </td>
      <td>
        <div className="row-actions">
          <button
            type="button"
            className="icon-button"
            onClick={() => onUpdateStock(id, 1)}
            aria-label={`Tăng tồn kho ${name}`}
            title="Nhập thêm 1"
          >+</button>
          <button
            type="button"
            className="icon-button"
            onClick={() => onUpdateStock(id, -1)}
            disabled={stock === 0}
            aria-label={`Giảm tồn kho ${name}`}
            title="Bán 1"
          >-</button>
          <button
            type="button"
            className="delete-button"
            onClick={() => onDeleteProduct(id)}
            aria-label={`Xóa ${name}`}
          >Xóa</button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
