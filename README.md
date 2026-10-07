# LumiCam – Website máy ảnh trên GitHub Pages

## Có gì trong web?
- 6 máy ảnh giá khoảng 3–5 triệu đồng.
- 5 phụ kiện mua kèm.
- Xem chi tiết sản phẩm.
- Giỏ hàng lưu bằng LocalStorage.
- Trang đặt hàng.
- Tạo QR thanh toán theo tổng tiền đơn hàng.
- Responsive cho máy tính và điện thoại.

## Cách đưa lên GitHub Pages
1. Tạo một repository mới trên GitHub, ví dụ `lumicam`.
2. Upload 3 file:
   - `index.html`
   - `style.css`
   - `script.js`
3. Vào **Settings → Pages**.
4. Ở **Build and deployment**, chọn:
   - Source: `Deploy from a branch`
   - Branch: `main` / `/ (root)`
5. Save và chờ GitHub cấp đường dẫn website.

## Cực kỳ quan trọng: đổi QR thanh toán
Mở `script.js`, tìm phần:

const STORE = {
  bankId: "MB",
  accountNumber: "0123456789",
  accountName: "LUMICAM",
};

Đổi thành thông tin tài khoản của bạn.

Nếu chỉ dùng để thuyết trình/bài tập, có thể giữ thông tin mô phỏng.

## Lưu ý
QR được tạo thông qua VietQR image service nên cần Internet khi mở trang thanh toán.
GitHub Pages không có máy chủ để tự kiểm tra ngân hàng đã nhận tiền hay chưa. Nút “Tôi đã thanh toán” chỉ là mô phỏng cho bài tập.
