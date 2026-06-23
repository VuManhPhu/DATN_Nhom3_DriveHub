const express = require('express')
const bcrypt = require('bcryptjs')
const { getPool } = require('../config/database')
const authenticate = require('../middleware/auth')

const router = express.Router()

router.use(authenticate)

const mapUser = (row) => ({
  id: row.matk,
  username: row.tendangnhap,
  hoTen: row.hoten,
  email: row.email || '',
  vaiTro: row.vaitro,
  trangThai: row.trangthai ? 'Hoạt động' : 'Khóa',
  ngayTao: row.ngayTao,
})

router.get('/', async (req, res) => {
  try {
    const pool = await getPool()
    const { page = 1, pageSize = 10, keyword } = req.query
    const offset = (parseInt(page) - 1) * parseInt(pageSize)
    const limit = parseInt(pageSize)

    let countQuery = 'SELECT COUNT(*) as total FROM taikhoan WHERE 1=1'
    let dataQuery = 'SELECT * FROM taikhoan WHERE 1=1'
    const countReq = pool.request()
    const dataReq = pool.request()

    if (keyword) {
      const search = `%${keyword}%`
      const filter = ' AND (tendangnhap LIKE @keyword OR hoten LIKE @keyword OR email LIKE @keyword)'
      countQuery += filter
      dataQuery += filter
      countReq.input('keyword', search)
      dataReq.input('keyword', search)
    }

    dataQuery += ' ORDER BY matk DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY'
    dataReq.input('offset', offset)
    dataReq.input('limit', limit)

    const [countResult, dataResult] = await Promise.all([
      countReq.query(countQuery),
      dataReq.query(dataQuery),
    ])

    res.json({
      data: dataResult.recordset.map(mapUser),
      total: countResult.recordset[0].total,
      page: parseInt(page),
      pageSize: limit,
    })
  } catch (error) {
    console.error('Get TaiKhoan error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.get('/search', async (req, res) => {
  try {
    const pool = await getPool()
    const { keyword } = req.query
    if (!keyword) return res.json([])

    const search = `%${keyword}%`
    const result = await pool
      .request()
      .input('keyword', search)
      .query('SELECT * FROM taikhoan WHERE tendangnhap LIKE @keyword OR hoten LIKE @keyword OR email LIKE @keyword ORDER BY matk DESC')

    res.json(result.recordset.map(mapUser))
  } catch (error) {
    console.error('Search TaiKhoan error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool()
    const result = await pool
      .request()
      .input('matk', req.params.id)
      .query('SELECT * FROM taikhoan WHERE matk = @matk')

    if (!result.recordset[0]) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản' })
    }

    res.json(mapUser(result.recordset[0]))
  } catch (error) {
    console.error('Get TaiKhoan by id error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { username, password, hoTen, email, vaiTro, trangThai } = req.body
    if (!username || !password || !hoTen) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' })
    }

    const pool = await getPool()

    const existing = await pool
      .request()
      .input('tendangnhap', username)
      .query('SELECT matk FROM taikhoan WHERE tendangnhap = @tendangnhap')

    if (existing.recordset[0]) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool
      .request()
      .input('tendangnhap', username)
      .input('matkhau', hashedPassword)
      .input('hoten', hoTen)
      .input('email', email || '')
      .input('vaitro', vaiTro || 'Nhân viên')
      .input('trangthai', trangThai === 'Hoạt động' ? 1 : 0)
      .query(`INSERT INTO taikhoan (tendangnhap, matkhau, hoten, email, vaitro, trangthai, ngayTao)
              VALUES (@tendangnhap, @matkhau, @hoten, @email, @vaitro, @trangthai, GETDATE());
              SELECT SCOPE_IDENTITY() as id;`)

    res.status(201).json({
      id: result.recordset[0].id,
      message: 'Tạo tài khoản thành công',
    })
  } catch (error) {
    console.error('Create TaiKhoan error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { hoTen, email, vaiTro, trangThai } = req.body
    const pool = await getPool()

    const existing = await pool
      .request()
      .input('matk', req.params.id)
      .query('SELECT matk FROM taikhoan WHERE matk = @matk')

    if (!existing.recordset[0]) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản' })
    }

    await pool
      .request()
      .input('matk', req.params.id)
      .input('hoten', hoTen)
      .input('email', email || '')
      .input('vaitro', vaiTro)
      .input('trangthai', trangThai === 'Hoạt động' ? 1 : 0)
      .query('UPDATE taikhoan SET hoten = @hoten, email = @email, vaitro = @vaitro, trangthai = @trangthai WHERE matk = @matk')

    res.json({ message: 'Cập nhật tài khoản thành công' })
  } catch (error) {
    console.error('Update TaiKhoan error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool()

    const existing = await pool
      .request()
      .input('matk', req.params.id)
      .query('SELECT matk FROM taikhoan WHERE matk = @matk')

    if (!existing.recordset[0]) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản' })
    }

    await pool
      .request()
      .input('matk', req.params.id)
      .query('DELETE FROM taikhoan WHERE matk = @matk')

    res.json({ message: 'Xóa tài khoản thành công' })
  } catch (error) {
    console.error('Delete TaiKhoan error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

module.exports = router
