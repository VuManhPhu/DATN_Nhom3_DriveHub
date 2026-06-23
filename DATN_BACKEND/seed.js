require('dotenv').config()
const bcrypt = require('bcryptjs')
const { getPool } = require('./src/config/database')

async function seed() {
  try {
    const pool = await getPool()
    console.log('Connected to SQL Server')

    // Hash existing passwords if stored as plain text
    const users = await pool.request().query('SELECT matk, matkhau FROM taikhoan')
    for (const user of users.recordset) {
      if (user.matkhau && !user.matkhau.startsWith('$2a$') && !user.matkhau.startsWith('$2b$')) {
        const hashed = await bcrypt.hash(user.matkhau, 10)
        await pool
          .request()
          .input('matk', user.matk)
          .input('matkhau', hashed)
          .query('UPDATE taikhoan SET matkhau = @matkhau WHERE matk = @matk')
        console.log(`Hashed password for matk=${user.matk}`)
      }
    }

    // Ensure admin account exists
    const admin = await pool.request().query("SELECT matk FROM taikhoan WHERE tendangnhap = 'admin'")
    if (!admin.recordset[0]) {
      const hashedPassword = await bcrypt.hash('123', 10)
      await pool
        .request()
        .input('tendangnhap', 'admin')
        .input('matkhau', hashedPassword)
        .input('hoten', 'Quản trị viên')
        .input('email', 'admin@drivehub.com')
        .input('vaitro', 'Quản trị viên')
        .input('trangthai', 1)
        .query(`INSERT INTO taikhoan (tendangnhap, matkhau, hoten, email, vaitro, trangthai, ngayTao)
                VALUES (@tendangnhap, @matkhau, @hoten, @email, @vaitro, @trangthai, GETDATE())`)
      console.log('Created admin account (username: admin, password: 123)')
    } else {
      // Update admin password to "123"
      const hashedPassword = await bcrypt.hash('123', 10)
      await pool
        .request()
        .input('matk', admin.recordset[0].matk)
        .input('matkhau', hashedPassword)
        .query('UPDATE taikhoan SET matkhau = @matkhau WHERE matk = @matk')
      console.log('Updated admin password to: 123')
    }

    console.log('Seed completed')
    process.exit(0)
  } catch (error) {
    console.error('Seed error:', error)
    process.exit(1)
  }
}

seed()
