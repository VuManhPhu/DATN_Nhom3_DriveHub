const { getPool } = require('../config/database')

const User = {
  async findByUsername(username) {
    const pool = await getPool()
    const result = await pool
      .request()
      .input('tendangnhap', username)
      .query('SELECT matk, tendangnhap, matkhau, hoten, email, vaitro, trangthai, ngayTao FROM taikhoan WHERE tendangnhap = @tendangnhap')
    return result.recordset[0]
  },

  async findById(id) {
    const pool = await getPool()
    const result = await pool
      .request()
      .input('matk', id)
      .query('SELECT matk, tendangnhap, hoten, email, vaitro, trangthai, ngayTao FROM taikhoan WHERE matk = @matk')
    return result.recordset[0]
  },

  async findByEmail(email) {
    const pool = await getPool()
    const result = await pool
      .request()
      .input('email', email)
      .query('SELECT matk FROM taikhoan WHERE email = @email')
    return result.recordset[0]
  },

  async create({ username, password, hoTen, email, vaiTro }) {
    const pool = await getPool()
    const result = await pool
      .request()
      .input('tendangnhap', username)
      .input('matkhau', password)
      .input('hoten', hoTen)
      .input('email', email)
      .input('vaitro', vaiTro || 'Nhân viên')
      .input('trangthai', 1)
      .query(`INSERT INTO taikhoan (tendangnhap, matkhau, hoten, email, vaitro, trangthai, ngayTao)
              OUTPUT INSERTED.matk
              VALUES (@tendangnhap, @matkhau, @hoten, @email, @vaitro, @trangthai, GETDATE())`)
    return result.recordset[0].matk
  },
}

module.exports = User
