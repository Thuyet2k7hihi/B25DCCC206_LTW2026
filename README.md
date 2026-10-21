# QUẢN LÝ KHO HÀNG – REACT

Project đã có sẵn toàn bộ mã nguồn, không cần tạo lại bằng `npx create-react-app`.

## Chạy trong VS Code

1. Giải nén ZIP.
2. Trong VS Code chọn **File > Open Folder**, mở thư mục `B25DCCC206_LTW2026_` (thư mục chứa `package.json`).
3. Mở **Terminal > New Terminal** rồi chạy từng lệnh:

```powershell
npm install
npm start
```

Mở `http://localhost:3000` nếu trình duyệt chưa tự mở. Kiểm tra trước khi nộp:

```powershell
npm run build
```

## Đẩy lên repo GitHub đã tạo

Repo của bạn: https://github.com/Thuyet2k7hihi/B25DCCC206_LTW2026_

Trong Terminal tại thư mục chứa `package.json`, chạy:

```powershell
git init
git add .
git commit -m "Them project React quan ly kho"
git branch -M main
git remote add origin https://github.com/Thuyet2k7hihi/B25DCCC206_LTW2026_.git
git push -u origin main
```

Nếu báo `remote origin already exists`, chạy:

```powershell
git remote set-url origin https://github.com/Thuyet2k7hihi/B25DCCC206_LTW2026_.git
git push -u origin main
```

**Lưu ý:** Đề yêu cầu repo có hậu tố `_GK`, trong khi repo đã tạo là `B25DCCC206_LTW2026_`. Nếu giáo viên chấm đúng tên, hãy đổi tên repo trên GitHub thành `B25DCCC206_LTW2026_GK` và đổi tương ứng URL trong lệnh `git remote add origin`. Đề cũng yêu cầu 3 commit trong giờ làm bài: project tải về không có lịch sử commit giả; hãy commit các thay đổi thực tế khi hoàn thiện hoặc chỉnh sửa bài.

## Chức năng đã có

- Trang chủ: 3 thống kê tự cập nhật.
- Danh sách: tìm kiếm, lọc theo danh mục, tăng/giảm số lượng, xóa, xem chi tiết.
- Thêm mới: kiểm tra dữ liệu, báo thành công và tự ẩn 3 giây.
- Chi tiết: xem sản phẩm, nút Quay lại.
- Axios tải dữ liệu mẫu trong `public/data/products.json`, localStorage giữ dữ liệu sau khi F5.

Chỉ dùng Create React App + axios + react-router-dom@6 + CSS thuần.
