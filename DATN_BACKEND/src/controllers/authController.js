const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const authConfig = require('../config/auth')

const authController = {
  async login(req, res) {
    try {
      const { username, password } = req.body
      if (!username || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập tên đăng nhập và mật khẩu' })
      }

      const user = await User.findByUsername(username)
      if (!user) {
        return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.matkhau)
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' })
      }

      if (!user.trangthai) {
        return res.status(403).json({ message: 'Tài khoản đã bị khóa' })
      }

      const token = jwt.sign(
        { id: user.matk, username: user.tendangnhap, vaiTro: user.vaitro },
        authConfig.secret,
        { expiresIn: authConfig.expiresIn }
      )

      res.json({
        user: {
          id: user.matk,
          username: user.tendangnhap,
          hoTen: user.hoten,
          email: user.email || '',
          vaiTro: user.vaitro,
        },
        token,
      })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ message: 'Lỗi máy chủ' })
    }
  },

  async register(req, res) {
    try {
      const { username, password, hoTen, email, vaiTro } = req.body

      if (!username || !password || !hoTen || !email) {
        return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' })
      }

      if (password.length < 6) {
        return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự' })
      }

      const existingUser = await User.findByUsername(username)
      if (existingUser) {
        return res.status(409).json({ message: 'Tên đăng nhập đã tồn tại' })
      }

      const existingEmail = await User.findByEmail(email)
      if (existingEmail) {
        return res.status(409).json({ message: 'Email đã được sử dụng' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const newId = await User.create({
        username,
        password: hashedPassword,
        hoTen,
        email,
        vaiTro,
      })

      const token = jwt.sign(
        { id: newId, username, vaiTro: vaiTro || 'Nhân viên' },
        authConfig.secret,
        { expiresIn: authConfig.expiresIn }
      )

      res.status(201).json({
        user: { id: newId, username, hoTen, email, vaiTro: vaiTro || 'Nhân viên' },
        token,
      })
    } catch (error) {
      console.error('Register error:', error)
      res.status(500).json({ message: 'Lỗi máy chủ' })
    }
  },

  async profile(req, res) {
    try {
      const user = await User.findById(req.userId)
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' })
      }

      res.json({
        id: user.matk,
        username: user.tendangnhap,
        hoTen: user.hoten,
        email: user.email || '',
        vaiTro: user.vaitro,
        trangThai: user.trangthai ? 'Hoạt động' : 'Khóa',
        ngayTao: user.ngayTao,
      })
    } catch (error) {
      console.error('Profile error:', error)
      res.status(500).json({ message: 'Lỗi máy chủ' })
    }
  },
}

module.exports = authController
