require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRoutes = require('./src/routes/auth')
const taiKhoanRoutes = require('./src/routes/taiKhoan')
const thiSatHachRoutes = require('./src/routes/thiSatHach')
const traGPLXRoutes = require('./src/routes/traGPLX')

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/tai-khoan', taiKhoanRoutes)
app.use('/thi-sat-hach', thiSatHachRoutes)
app.use('/tra-gplx', traGPLXRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'DriveHub API is running' })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
