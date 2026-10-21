import { CATEGORIES } from '../data';

const FilterBar = ({ query, category, onQueryChange, onCategoryChange }) => (
  <div className="filters">
    <label className="field filter-search">
      <span className="field-label">Tìm kiếm theo tên sản phẩm</span>
      <input
        className="input"
        type="search"
        value={query}
        onChange={onQueryChange}
        placeholder="Tìm kiếm theo tên sản phẩm"
        autoComplete="off"
      />
    </label>
    <label className="field filter-category">
      <span className="field-label">Danh mục</span>
      <select className="input" value={category} onChange={onCategoryChange}>
        <option value="Tất cả">Tất cả</option>
        {CATEGORIES.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </label>
  </div>
);

export default FilterBar;
