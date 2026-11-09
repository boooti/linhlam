/**
 * =========================================================================
 * GOOGLE APPS SCRIPT CHO THIỆP CƯỚI: DANH LÂM & YẾN LINH
 * File Google Sheet: Wedding LINH & LÂM
 * Sheet ID: 1xMB4EcStAd-WIxsEa-XC7T0B8m5z3xBiJsiI_LDYZV4
 * =========================================================================
 * 
 * HƯỚNG DẪN CÀI ĐẶT TRONG 1 PHÚT:
 * 1. Mở Google Sheet: Wedding LINH & LÂM
 *    (Link: https://docs.google.com/spreadsheets/d/1xMB4EcStAd-WIxsEa-XC7T0B8m5z3xBiJsiI_LDYZV4/edit)
 * 2. Trên thanh công cụ, chọn: "Tiện ích mở rộng" (Extensions) -> "Apps Script".
 * 3. Xóa hết code mặc định, dán toàn bộ nội dung file này vào.
 * 4. Bấm biểu tượng Lưu (Save / Ctrl+S).
 * 5. Bấm nút màu xanh "Triển khai" (Deploy) ở góc trên bên phải -> Chọn "Quản lý bản triển khai" hoặc "Bản triển khai mới" (New deployment).
 * 6. Bấm biểu tượng bánh răng bên cạnh "Chọn loại" -> Chọn "Ứng dụng web" (Web app).
 * 7. Thiết lập cấu hình:
 *    - Mô tả: RSVP Thiệp Cưới
 *    - Thực thi dưới dạng: Tôi (email của bạn / Me)
 *    - Ai có quyền truy cập: Bất kỳ ai (Anyone)  <--- RẤT QUAN TRỌNG!
 * 8. Bấm "Triển khai" (Deploy). Nếu Google hỏi cấp quyền (Authorize access):
 *    -> Chọn tài khoản Google của bạn -> Bấm "Advanced" (Nâng cao) -> Bấm "Go to Untitled project (unsafe)" -> Bấm "Allow" (Cho phép).
 * 9. Sao chép "URL ứng dụng web" (Web App URL có đuôi /exec) và dán vào biến GOOGLE_SCRIPT_URL trong file index.html!
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];

    // Lấy dữ liệu gửi lên (Hỗ trợ cả JSON postData lẫn URL-encoded parameter)
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Định dạng ngày giờ Việt Nam (GMT+7)
    var timestamp = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
    var name = (data.name || data.fullName || "").trim();
    
    // Nếu không có tên thì báo lỗi nhẹ
    if (!name) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "error", message: "Thiếu tên khách mời" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Xử lý các trường thông tin chuẩn theo công thức Google Sheet
    // D4 công thức: COUNTIF(D8:D1000, "Tham dự")
    // F4 công thức: COUNTIF(D8:D1000, "Không tham dự")
    var rawAttending = (data.attending || "").trim();
    var isAttending = (rawAttending === "Tham dự" || rawAttending === "yes" || rawAttending === "true");
    var attending = isAttending ? "Tham dự" : "Không tham dự";

    // E4 công thức: SUM(E8:E1000)
    var guestCount = isAttending ? Number(data.guestCount || data.count || 1) : 0;
    if (isNaN(guestCount) || guestCount < 0) guestCount = 1;

    // G4 công thức: COUNTIF(G8:G1000, "Nhà trai")
    // H4 công thức: COUNTIF(G8:G1000, "Nhà gái")
    var rawSide = (data.side || "").trim();
    var side = (rawSide === "Nhà trai" || rawSide === "trai") ? "Nhà trai" : "Nhà gái";

    // Lời chúc và Số điện thoại
    var message = (data.message || "").trim();
    var phone = data.phone ? "'" + data.phone.toString().trim() : "";

    // Tìm dòng trống tiếp theo (Dữ liệu bắt đầu từ dòng 8)
    var lastRow = sheet.getLastRow();
    var targetRow = Math.max(lastRow + 1, 8);

    // Ghi dữ liệu vào Cột B đến Cột H (Columns 2 to 8)
    // Cột A để trống giữ nguyên layout của bạn
    // [B: Thời gian gửi, C: Họ và tên, D: Xác nhận tham dự, E: Số lượng người, F: Lời chúc, G: Khách của, H: Số điện thoại]
    var rowValues = [
      timestamp,
      name,
      attending,
      guestCount,
      message,
      side,
      phone
    ];

    sheet.getRange(targetRow, 2, 1, 7).setValues([rowValues]);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Đã lưu phản hồi thành công vào dòng " + targetRow,
        row: targetRow
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "ready",
      spreadsheet: "Wedding LINH & LÂM",
      message: "Webhook Google Apps Script sẵn sàng nhận dữ liệu RSVP thiệp cưới!"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
