const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Không có quyền truy cập' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, authConfig.secret)
    req.userId = decoded.id
    req.username = decoded.username
    req.vaiTro = decoded.vaiTro
    next()
  } catch {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' })
  }
}

module.exports = authenticate
