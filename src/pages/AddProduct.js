import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddProduct = ({ onAddProduct }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    category: CATEGORIES[0],
    price: '',
    stock: ''
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, category, price, stock } = form;

    if (!name.trim() || !category || price.trim() === '' || stock.trim() === '') {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const numericPrice = Number(price);
    const numericStock = Number(stock);
    if (!Number.isFinite(numericPrice) || numericPrice <= 0
      || !Number.isInteger(numericStock) || numericStock < 0) {
      setError('Giá phải lớn hơn 0, số lượng là số nguyên không âm');
      return;
    }

    const newProduct = {
      name: name.trim(),
      category,
      price: numericPrice,
      stock: numericStock
    };
    onAddProduct(newProduct);
    const message = `Đã thêm sản phẩm ${newProduct.name}`;
    navigate('/products', { replace: true, state: { message } });
  };

  return (
    <section className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow eyebrow-dark">SẢN PHẨM / TẠO MỚI</p>
          <h1>Thêm sản phẩm mới</h1>
          <p>Điền thông tin để bổ sung mặt hàng vào kho.</p>
        </div>
      </div>
      <div className="form-card">
        <div className="form-card-head">
          <h2>Thông tin sản phẩm</h2>
          <p>Vui lòng điền đầy đủ các trường bên dưới.</p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-fields">
            <label className="field">
              <span className="field-label">Tên sản phẩm</span>
              <input
                className="input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ví dụ: Bút chì 2B"
              />
            </label>
            <label className="field">
              <span className="field-label">Danh mục</span>
              <select className="input" name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>
            <div className="form-two-cols">
              <label className="field">
                <span className="field-label">Giá</span>
                <input
                  className="input"
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Ví dụ: 15000"
                  step="any"
                />
              </label>
              <label className="field">
                <span className="field-label">Số lượng tồn</span>
                <input
                  className="input"
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Ví dụ: 20"
                  step="1"
                />
              </label>
            </div>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button className="primary-button" type="submit">Thêm</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
