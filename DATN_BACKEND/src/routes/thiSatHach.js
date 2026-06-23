const express = require('express')
const { getPool } = require('../config/database')
const authenticate = require('../middleware/auth')

const router = express.Router()

router.use(authenticate)

const mapItem = (row) => ({
  id: row.mathi,
  maHocVien: row.mahv ? String(row.mahv) : '',
  tenHocVien: row.tenHocVien || '',
  loaiBang: row.loaiBang || '',
  ngayThi: row.ngaythi,
  ketQua: row.ketqua || null,
  trangThai: row.trangThai || 'Chờ thi',
})

router.get('/', async (req, res) => {
  try {
    const pool = await getPool()
    const { page = 1, pageSize = 10, keyword, trangThai, ngayThi } = req.query
    const offset = (parseInt(page) - 1) * parseInt(pageSize)
    const limit = parseInt(pageSize)

    let countQuery = 'SELECT COUNT(*) as total FROM thisathach WHERE 1=1'
    let dataQuery = 'SELECT * FROM thisathach WHERE 1=1'
    const countReq = pool.request()
    const dataReq = pool.request()

    if (keyword) {
      const search = `%${keyword}%`
      const filter = ' AND (mahv LIKE @keyword OR tenHocVien LIKE @keyword)'
      countQuery += filter
      dataQuery += filter
      countReq.input('keyword', search)
      dataReq.input('keyword', search)
    }

    if (trangThai) {
      const filter = ' AND trangThai = @trangThai'
      countQuery += filter
      dataQuery += filter
      countReq.input('trangThai', trangThai)
      dataReq.input('trangThai', trangThai)
    }

    if (ngayThi) {
      const filter = ' AND ngaythi = @ngayThi'
      countQuery += filter
      dataQuery += filter
      countReq.input('ngayThi', ngayThi)
      dataReq.input('ngayThi', ngayThi)
    }

    dataQuery += ' ORDER BY mathi DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY'
    dataReq.input('offset', offset)
    dataReq.input('limit', limit)

    const [countResult, dataResult] = await Promise.all([
      countReq.query(countQuery),
      dataReq.query(dataQuery),
    ])

    res.json({
      data: dataResult.recordset.map(mapItem),
      total: countResult.recordset[0].total,
      page: parseInt(page),
      pageSize: limit,
    })
  } catch (error) {
    console.error('Get ThiSatHach error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool()
    const result = await pool
      .request()
      .input('mathi', req.params.id)
      .query('SELECT * FROM thisathach WHERE mathi = @mathi')

    if (!result.recordset[0]) {
      return res.status(404).json({ message: 'Không tìm thấy lịch thi' })
    }

    res.json(mapItem(result.recordset[0]))
  } catch (error) {
    console.error('Get ThiSatHach by id error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { maHocVien, tenHocVien, loaiBang, ngayThi, trangThai } = req.body
    if (!maHocVien || !ngayThi) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' })
    }

    const pool = await getPool()
    const result = await pool
      .request()
      .input('mahv', maHocVien)
      .input('tenHocVien', tenHocVien || '')
      .input('loaiBang', loaiBang || '')
      .input('ngaythi', ngayThi)
      .input('trangThai', trangThai || 'Chờ thi')
      .query(`INSERT INTO thisathach (mahv, tenHocVien, loaiBang, ngaythi, trangThai)
              VALUES (@mahv, @tenHocVien, @loaiBang, @ngaythi, @trangThai);
              SELECT SCOPE_IDENTITY() as id;`)

    res.status(201).json({
      id: result.recordset[0].id,
      message: 'Thêm lịch thi thành công',
    })
  } catch (error) {
    console.error('Create ThiSatHach error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { maHocVien, tenHocVien, loaiBang, ngayThi, trangThai } = req.body
    const pool = await getPool()

    const existing = await pool
      .request()
      .input('mathi', req.params.id)
      .query('SELECT mathi FROM thisathach WHERE mathi = @mathi')

    if (!existing.recordset[0]) {
      return res.status(404).json({ message: 'Không tìm thấy lịch thi' })
    }

    await pool
      .request()
      .input('mathi', req.params.id)
      .input('mahv', maHocVien)
      .input('tenHocVien', tenHocVien || '')
      .input('loaiBang', loaiBang || '')
      .input('ngaythi', ngayThi)
      .input('trangThai', trangThai)
      .query(`UPDATE thisathach SET mahv = @mahv, tenHocVien = @tenHocVien,
              loaiBang = @loaiBang, ngaythi = @ngaythi, trangThai = @trangThai WHERE mathi = @mathi`)

    res.json({ message: 'Cập nhật lịch thi thành công' })
  } catch (error) {
    console.error('Update ThiSatHach error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.patch('/:id/ket-qua', async (req, res) => {
  try {
    const { ketQua, trangThai } = req.body
    const pool = await getPool()

    const existing = await pool
      .request()
      .input('mathi', req.params.id)
      .query('SELECT mathi FROM thisathach WHERE mathi = @mathi')

    if (!existing.recordset[0]) {
      return res.status(404).json({ message: 'Không tìm thấy lịch thi' })
    }

    await pool
      .request()
      .input('mathi', req.params.id)
      .input('ketqua', ketQua)
      .input('trangThai', trangThai || ketQua)
      .query('UPDATE thisathach SET ketqua = @ketqua, trangThai = @trangThai WHERE mathi = @mathi')

    res.json({ message: 'Cập nhật kết quả thành công' })
  } catch (error) {
    console.error('Update ket qua error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool()

    const existing = await pool
      .request()
      .input('mathi', req.params.id)
      .query('SELECT mathi FROM thisathach WHERE mathi = @mathi')

    if (!existing.recordset[0]) {
      return res.status(404).json({ message: 'Không tìm thấy lịch thi' })
    }

    await pool
      .request()
      .input('mathi', req.params.id)
      .query('DELETE FROM thisathach WHERE mathi = @mathi')

    res.json({ message: 'Xóa lịch thi thành công' })
  } catch (error) {
    console.error('Delete ThiSatHach error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

module.exports = router
