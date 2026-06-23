const express = require('express')
const { getPool } = require('../config/database')
const authenticate = require('../middleware/auth')

const router = express.Router()

router.use(authenticate)

const mapItem = (row) => ({
  id: row.magplx,
  maHocVien: row.mahv ? String(row.mahv) : '',
  tenHocVien: row.tenHocVien || '',
  loaiBang: row.loaiBang || row.hanggplx || '',
  ngayTra: row.ngayTra || null,
  trangThai: row.trangThai || 'Chờ xác nhận',
  ghiChu: row.ghiChu || '',
})

router.get('/', async (req, res) => {
  try {
    const pool = await getPool()
    const { page = 1, pageSize = 10, keyword, trangThai } = req.query
    const offset = (parseInt(page) - 1) * parseInt(pageSize)
    const limit = parseInt(pageSize)

    let countQuery = 'SELECT COUNT(*) as total FROM tragplx WHERE 1=1'
    let dataQuery = 'SELECT * FROM tragplx WHERE 1=1'
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

    dataQuery += ' ORDER BY magplx DESC OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY'
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
    console.error('Get TraGPLX error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool()
    const result = await pool
      .request()
      .input('magplx', req.params.id)
      .query('SELECT * FROM tragplx WHERE magplx = @magplx')

    if (!result.recordset[0]) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu trả GPLX' })
    }

    res.json(mapItem(result.recordset[0]))
  } catch (error) {
    console.error('Get TraGPLX by id error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { maHocVien, tenHocVien, loaiBang, ngayTra, trangThai, ghiChu } = req.body
    if (!maHocVien || !ngayTra) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' })
    }

    const pool = await getPool()
    const result = await pool
      .request()
      .input('mahv', maHocVien)
      .input('tenHocVien', tenHocVien || '')
      .input('loaiBang', loaiBang || '')
      .input('ngayTra', ngayTra)
      .input('trangThai', trangThai || 'Chờ xác nhận')
      .input('ghiChu', ghiChu || '')
      .query(`INSERT INTO tragplx (mahv, tenHocVien, loaiBang, ngayTra, trangThai, ghiChu)
              VALUES (@mahv, @tenHocVien, @loaiBang, @ngayTra, @trangThai, @ghiChu);
              SELECT SCOPE_IDENTITY() as id;`)

    res.status(201).json({
      id: result.recordset[0].id,
      message: 'Thêm yêu cầu trả GPLX thành công',
    })
  } catch (error) {
    console.error('Create TraGPLX error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { maHocVien, tenHocVien, loaiBang, ngayTra, trangThai, ghiChu } = req.body
    const pool = await getPool()

    const existing = await pool
      .request()
      .input('magplx', req.params.id)
      .query('SELECT magplx FROM tragplx WHERE magplx = @magplx')

    if (!existing.recordset[0]) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu trả GPLX' })
    }

    await pool
      .request()
      .input('magplx', req.params.id)
      .input('mahv', maHocVien)
      .input('tenHocVien', tenHocVien || '')
      .input('loaiBang', loaiBang || '')
      .input('ngayTra', ngayTra)
      .input('trangThai', trangThai)
      .input('ghiChu', ghiChu || '')
      .query(`UPDATE tragplx SET mahv = @mahv, tenHocVien = @tenHocVien,
              loaiBang = @loaiBang, ngayTra = @ngayTra, trangThai = @trangThai, ghiChu = @ghiChu
              WHERE magplx = @magplx`)

    res.json({ message: 'Cập nhật yêu cầu thành công' })
  } catch (error) {
    console.error('Update TraGPLX error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.patch('/:id/xac-nhan', async (req, res) => {
  try {
    const pool = await getPool()

    const existing = await pool
      .request()
      .input('magplx', req.params.id)
      .query('SELECT magplx, trangThai FROM tragplx WHERE magplx = @magplx')

    if (!existing.recordset[0]) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu trả GPLX' })
    }

    await pool
      .request()
      .input('magplx', req.params.id)
      .query("UPDATE tragplx SET trangThai = N'Đã xác nhận' WHERE magplx = @magplx")

    res.json({ message: 'Xác nhận trả GPLX thành công' })
  } catch (error) {
    console.error('Xac nhan TraGPLX error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool()

    const existing = await pool
      .request()
      .input('magplx', req.params.id)
      .query('SELECT magplx FROM tragplx WHERE magplx = @magplx')

    if (!existing.recordset[0]) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu trả GPLX' })
    }

    await pool
      .request()
      .input('magplx', req.params.id)
      .query('DELETE FROM tragplx WHERE magplx = @magplx')

    res.json({ message: 'Xóa yêu cầu thành công' })
  } catch (error) {
    console.error('Delete TraGPLX error:', error)
    res.status(500).json({ message: 'Lỗi máy chủ' })
  }
})

module.exports = router
