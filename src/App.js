const BUILD_TAG = "kt-6641";
/* eslint-disable import/first */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';

const STORAGE_KEY = 'gk_products';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Mounting: ưu tiên dữ liệu đã lưu, nếu chưa có thì tải dữ liệu từ API.
  useEffect(() => {
    const controller = new AbortController();

    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      if (savedProducts !== null) {
        const parsedProducts = JSON.parse(savedProducts);
        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts);
          setLoading(false);
          return () => controller.abort();
        }
      }
    } catch (err) {
      // Nếu localStorage không hợp lệ/không đọc được, thử gọi API.
    }

    axios.get('/data/products.json', { signal: controller.signal })
      .then((res) => {
        if (!controller.signal.aborted) {
          setProducts(res.data);
        }
      })
      .catch((err) => {
        if (!axios.isCancel(err) && !controller.signal.aborted) {
          setError(true);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    // Unmounting: hủy request để không cập nhật state của component đã gỡ.
    return () => controller.abort();
  }, []);

  // Updating: không ghi đè localStorage bằng [] trước khi tải hoàn tất.
  useEffect(() => {
    if (!loading && !error) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      } catch (err) {
        // Trình duyệt có thể chặn localStorage: ứng dụng vẫn hoạt động.
      }
    }
  }, [products, loading, error]);

  const handleAddProduct = (product) => {
    setProducts((currentProducts) => {
      const maxId = currentProducts.reduce((max, item) => Math.max(max, item.id), 0);
      return [...currentProducts, { ...product, id: maxId + 1 }];
    });
  };

  const handleDeleteProduct = (id) => {
    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== id));
  };

  const handleUpdateStock = (id, amount) => {
    setProducts((currentProducts) => currentProducts.map((product) => (
      product.id === id
        ? { ...product, stock: Math.max(0, product.stock + amount) }
        : product
    )));
  };

  return (
    <div data-build-tag={BUILD_TAG}>
      <Routes>
        <Route path="/" element={<Layout loading={loading} error={error} />}>
          <Route index element={<Home products={products} />} />
          <Route
            path="products"
            element={
              <ProductList
                products={products}
                onDeleteProduct={handleDeleteProduct}
                onUpdateStock={handleUpdateStock}
              />
            }
          />
          <Route path="products/new" element={<AddProduct onAddProduct={handleAddProduct} />} />
          <Route path="products/:id" element={<ProductDetail products={products} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
