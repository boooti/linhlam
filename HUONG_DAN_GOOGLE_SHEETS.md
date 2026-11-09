# 📋 Hướng Dẫn Kết Nối Google Sheets Cho Thiệp Cưới Danh Lâm & Yến Linh

Trang thiệp cưới đã được tích hợp sẵn sàng để kết nối trực tiếp với Google Sheet:
👉 **[Wedding LINH & LÂM](https://docs.google.com/spreadsheets/d/1xMB4EcStAd-WIxsEa-XC7T0B8m5z3xBiJsiI_LDYZV4/edit?gid=0#gid=0)**

---

## ⚡ Các bước kích hoạt đồng bộ tự động (Chỉ mất 1 phút):

### Bước 1: Mở Google Sheet và vào Apps Script
1. Mở trang Google Sheet: [Wedding LINH & LÂM](https://docs.google.com/spreadsheets/d/1xMB4EcStAd-WIxsEa-XC7T0B8m5z3xBiJsiI_LDYZV4/edit?gid=0#gid=0)
2. Trên thanh menu trên cùng, bấm: **Tiện ích mở rộng (Extensions)** ➔ Chọn **Apps Script**.

---

### Bước 2: Dán mã Script
1. Xóa toàn bộ nội dung trong trình soạn thảo code hiện tại.
2. Sao chép và dán toàn bộ đoạn mã trong file [`google-apps-script.js`](./google-apps-script.js) vào.
3. Bấm biểu tượng **Lưu (Save)** 💾 (hoặc nhấn `Ctrl + S`).

---

### Bước 3: Triển khai Ứng dụng web (Web App)
1. Ở góc trên cùng bên phải màn hình Apps Script, bấm nút màu xanh **Triển khai (Deploy)** ➔ Chọn **Bản triển khai mới (New deployment)**.
2. Bấm vào biểu tượng bánh răng ⚙️ (bên cạnh chữ *Chọn loại*) ➔ Chọn **Ứng dụng web (Web app)**.
3. Điền các trường:
   - **Mô tả:** `RSVP Thiệp Cưới Danh Lâm Yến Linh`
   - **Thực thi dưới dạng:** `Tôi` (Me - email Google của bạn)
   - **Ai có quyền truy cập:** Chọn **`Bất kỳ ai` (Anyone)** *(⚠️ Đây là bước quan trọng nhất để khách mời có thể gửi thông tin mà không cần đăng nhập Google)*.
4. Bấm **Triển khai (Deploy)**.
5. Nếu Google hiển thị hộp thoại yêu cầu cấp quyền:
   - Bấm **Ủy quyền truy cập (Authorize access)**
   - Chọn tài khoản Google của bạn
   - Bấm **Nâng cao (Advanced)** ở góc dưới bên trái
   - Bấm tiếp **Đi tới dự án (không an toàn) / Go to Untitled project (unsafe)**
   - Bấm **Cho phép (Allow)**.

---

### Bước 4: Sao chép URL Web App
1. Sau khi triển khai xong, Google sẽ cung cấp một đường link **URL ứng dụng web (Web app URL)** có đuôi `/exec` (ví dụ: `https://script.google.com/macros/s/AKfycb.../exec`).
2. Sao chép đường link này và gửi lại cho tôi trong tin nhắn chat để tôi tự động cập nhật vào file `index.html` và đẩy lên GitHub Pages cho bạn!

---

## 📊 Dữ liệu được ghi vào Google Sheet như thế nào?
Dữ liệu gửi từ thiệp cưới sẽ tự động được ghi vào từ **Dòng 8 trở đi**:
- **Cột B:** Thời gian gửi (ví dụ: `09/11/2026 11:30:00`)
- **Cột C:** Họ và tên khách mời
- **Cột D:** Xác nhận tham dự (`Tham dự` hoặc `Không tham dự`)
- **Cột E:** Số lượng người (`1`, `2`, `3`... hoặc `0` nếu không tham dự)
- **Cột F:** Lời chúc phúc
- **Cột G:** Khách của (`Nhà gái` hoặc `Nhà trai`)
- **Cột H:** Số điện thoại

✨ **Tất cả các thẻ thống kê tự động ở Dòng 4 của bạn:**
- `Tổng phản hồi`: Tự động đếm
- `Sẽ tham dự`: Tự động cộng
- `Tổng số khách`: Tự động tính tổng
- `Không tham dự`: Tự động đếm
- `Khách nhà trai`: Tự động đếm
- `Khách nhà gái`: Tự động đếm

Đồng thời, **Sổ lưu bút** trên trang web thiệp cưới cũng tự động đọc các lời chúc phúc trực tiếp từ Google Sheet để hiển thị cho mọi người cùng chung vui! 🎉
