# DriveHub - Hệ Thống Quản Lý Trường Dạy Lái Xe

## Cấu Trúc Dự Án

```
src/
├── assets/           # Hình ảnh, icon, CSS
├── components/       # Component dùng lại
│   ├── Navbar.vue          # Thanh điều hướng trên
│   ├── Sidebar.vue         # Menu bên trái
│   ├── Footer.vue          # Chân trang
│   └── DataTable.vue       # Bảng dữ liệu chung
├── pages/            # Trang chính
│   ├── Login.vue           # Trang đăng nhập
│   ├── Dashboard.vue       # Bảng điều khiển
│   ├── HocVien.vue         # Quản lý học viên
│   ├── GiaoVien.vue        # Quản lý giáo viên
│   ├── XeTapLai.vue        # Quản lý xe tập lái
│   ├── ChuongTrinhHoc.vue  # Quản lý chương trình học
│   ├── PhongHoc.vue        # Quản lý phòng học
│   ├── HoSoHocVien.vue     # Quản lý hồ sơ học viên
│   ├── ThiSatHach.vue      # Quản lý thi sát hạch
│   ├── TraGPLX.vue         # Tra cứu GPLX
│   └── TaiKhoan.vue        # Quản lý tài khoản
├── router/
│   └── index.js            # Cấu hình routing
├── services/         # Gọi API
│   ├── hocVienService.js
│   ├── giaoVienService.js
│   ├── xeTapLaiService.js
│   └── taiKhoanService.js
├── stores/           # Pinia store
│   └── authStore.js
├── layouts/
│   ├── AdminLayout.vue     # Layout cho trang admin
│   └── LoginLayout.vue     # Layout cho trang login
├── App.vue
└── main.ts
```

## Setup & Cài Đặt

### 1. Cài Đặt Dependencies

```bash
npm install
```

### 2. Tạo File Environment

Sao chép `.env.example` thành `.env.local`:

```bash
cp .env.example .env.local
```

Cập nhật `VITE_APP_API_BASE_URL` để trỏ đến API backend của bạn.

### 3. Chạy Development Server

```bash
npm run dev
```

Ứng dụng sẽ chạy trên `http://localhost:5173`

### 4. Build cho Production

```bash
npm run build
```

## Tính Năng Chính

- **Login/Authentication**: Đăng nhập hệ thống với tài khoản người dùng
- **Dashboard**: Xem tổng quan thống kê chung
- **Quản Lý Học Viên**: CRUD cho học viên
- **Quản Lý Giáo Viên**: CRUD cho giáo viên
- **Quản Lý Xe Tập Lái**: CRUD cho xe tập lái
- **Quản Lý Chương Trình Học**: Tạo và quản lý chương trình đào tạo
- **Quản Lý Phòng Học**: Quản lý lớp học
- **Quản Lý Hồ Sơ Học Viên**: Theo dõi hồ sơ học viên
- **Quản Lý Thi Sát Hạch**: Tạo và quản lý kì thi
- **Tra Cứu GPLX**: Tìm kiếm thông tin GPLX
- **Quản Lý Tài Khoản**: Quản lý người dùng hệ thống

## Technology Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Router**: Vue Router 4
- **State Management**: Pinia
- **Language**: TypeScript/JavaScript
- **Styling**: CSS with Scoped Styles

## Hướng Phát Triển Tiếp Theo

1. **Implement API Integration**
   - Cập nhật tất cả service files để gọi API thực
   - Thêm error handling và loading states

2. **Add Authentication Guard**
   - Implement token-based authentication
   - Bảo vệ các trang yêu cầu đăng nhập

3. **Form Validation**
   - Thêm form validation cho tất cả input fields
   - Implement error messages

4. **Responsive Design**
   - Tối ưu giao diện cho mobile devices
   - Thêm media queries cho Sidebar

5. **Testing**
   - Unit tests cho components
   - E2E tests cho user flows

6. **UI/UX Improvements**
   - Thêm modals cho create/edit operations
   - Thêm pagination cho data tables
   - Thêm filtering và sorting capabilities

7. **Performance Optimization**
   - Code splitting
   - Lazy loading cho routes
   - Image optimization

## Liên Hệ & Hỗ Trợ

Để có hỗ trợ hoặc báo lỗi, vui lòng liên hệ đội phát triển.
