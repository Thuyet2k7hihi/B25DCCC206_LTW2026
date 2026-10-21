import ProductRow from './ProductRow';

const ProductTable = ({ products, onDeleteProduct, onUpdateStock }) => (
  <div className="table-scroll">
    <table className="product-table">
      <thead>
        <tr>
          <th scope="col">Tên sản phẩm</th>
          <th scope="col">Danh mục</th>
          <th scope="col">Giá</th>
          <th scope="col">Tồn kho</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr><td className="empty-row" colSpan="5">Không có dữ liệu</td></tr>
        ) : (
          products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onDeleteProduct={onDeleteProduct}
              onUpdateStock={onUpdateStock}
            />
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
