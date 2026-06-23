CREATE DATABASE DriveHub;
GO

USE DriveHub;
GO

CREATE TABLE TaiKhoan (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    hoTen NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    vaiTro NVARCHAR(50) NOT NULL DEFAULT N'Nhân viên',
    trangThai NVARCHAR(50) NOT NULL DEFAULT N'Hoạt động',
    ngayTao DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE ThiSatHach (
    id INT IDENTITY(1,1) PRIMARY KEY,
    maHocVien NVARCHAR(50) NOT NULL,
    tenHocVien NVARCHAR(100) NOT NULL,
    loaiBang NVARCHAR(10) NOT NULL,
    ngayThi DATE NOT NULL,
    ketQua NVARCHAR(50) NULL,
    trangThai NVARCHAR(50) NOT NULL DEFAULT N'Chờ thi'
);
GO

CREATE TABLE TraGPLX (
    id INT IDENTITY(1,1) PRIMARY KEY,
    maHocVien NVARCHAR(50) NOT NULL,
    tenHocVien NVARCHAR(100) NOT NULL,
    loaiBang NVARCHAR(10) NOT NULL,
    ngayTra DATE NOT NULL,
    trangThai NVARCHAR(50) NOT NULL DEFAULT N'Chờ xác nhận',
    ghiChu NVARCHAR(500) NULL
);
GO

-- Run seed.js to create default admin account (username: admin, password: 123)
