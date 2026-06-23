require('dotenv').config()
const sql = require('mssql')

async function create() {
  const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT) || 1433,
    options: { encrypt: false, trustServerCertificate: true },
  }

  const pool = await sql.connect(config)

  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='tragplx' AND xtype='U')
    CREATE TABLE tragplx (
      magplx INT IDENTITY(1,1) PRIMARY KEY,
      mahv NVARCHAR(50) NOT NULL,
      tenHocVien NVARCHAR(100),
      loaiBang NVARCHAR(10),
      ngayTra DATE,
      trangThai NVARCHAR(50) DEFAULT N'Chờ xác nhận',
      ghiChu NVARCHAR(500)
    )
  `)
  console.log('Created tragplx table')

  await pool.close()
  process.exit(0)
}

create().catch(err => { console.error(err); process.exit(1) })
