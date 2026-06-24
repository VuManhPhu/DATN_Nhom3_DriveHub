require('dotenv').config()
const sql = require('mssql')
const bcrypt = require('bcryptjs')

const config = {
  server: process.env.DB_SERVER,
  database: 'master',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
}

async function init() {
  try {
    const pool = await sql.connect(config)

    // Create database if not exists
    const dbName = process.env.DB_DATABASE
    await pool.request().query(`
      IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = '${dbName}')
      BEGIN
        CREATE DATABASE [${dbName}]
      END
    `)
    console.log(`Database '${dbName}' ready`)
    await pool.close()

    // Switch to DriveHub
    config.database = dbName
    const dbPool = await sql.connect(config)

    // Create tables if not exists
    await dbPool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TaiKhoan' AND xtype='U')
      CREATE TABLE TaiKhoan (
        matk INT IDENTITY(1,1) PRIMARY KEY,
        tendangnhap NVARCHAR(50) NOT NULL UNIQUE,
        matkhau NVARCHAR(255) NOT NULL,
        hoten NVARCHAR(100) NOT NULL,
        email NVARCHAR(100) NOT NULL,
        vaitro NVARCHAR(50) NOT NULL DEFAULT N'Nhân viên',
        trangthai INT NOT NULL DEFAULT 1,
        ngayTao DATETIME DEFAULT GETDATE()
      )
    `)
    console.log('Table TaiKhoan ready')

    await dbPool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ThiSatHach' AND xtype='U')
      CREATE TABLE ThiSatHach (
        id INT IDENTITY(1,1) PRIMARY KEY,
        maHocVien NVARCHAR(50) NOT NULL,
        tenHocVien NVARCHAR(100) NOT NULL,
        loaiBang NVARCHAR(10) NOT NULL,
        ngayThi DATE NOT NULL,
        ketQua NVARCHAR(50) NULL,
        trangThai NVARCHAR(50) NOT NULL DEFAULT N'Chờ thi'
      )
    `)
    console.log('Table ThiSatHach ready')

    await dbPool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TraGPLX' AND xtype='U')
      CREATE TABLE TraGPLX (
        id INT IDENTITY(1,1) PRIMARY KEY,
        maHocVien NVARCHAR(50) NOT NULL,
        tenHocVien NVARCHAR(100) NOT NULL,
        loaiBang NVARCHAR(10) NOT NULL,
        ngayTra DATE NOT NULL,
        trangThai NVARCHAR(50) NOT NULL DEFAULT N'Chờ xác nhận',
        ghiChu NVARCHAR(500) NULL
      )
    `)
    console.log('Table TraGPLX ready')

    // Seed admin account
    const existing = await dbPool
      .request()
      .query("SELECT matk FROM TaiKhoan WHERE tendangnhap = 'admin'")

    if (!existing.recordset[0]) {
      const hashedPassword = await bcrypt.hash('123', 10)
      await dbPool
        .request()
        .input('tendangnhap', 'admin')
        .input('matkhau', hashedPassword)
        .input('hoten', 'Quản trị viên')
        .input('email', 'admin@drivehub.com')
        .input('vaitro', 'Quản trị viên')
        .input('trangthai', 1)
        .query(`INSERT INTO TaiKhoan (tendangnhap, matkhau, hoten, email, vaitro, trangthai, ngayTao)
                VALUES (@tendangnhap, @matkhau, @hoten, @email, @vaitro, @trangthai, GETDATE())`)
      console.log('Created admin account (username: admin, password: 123)')
    } else {
      console.log('Admin account already exists')
    }

    await dbPool.close()
    console.log('Init completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Init error:', error)
    process.exit(1)
  }
}

init()
