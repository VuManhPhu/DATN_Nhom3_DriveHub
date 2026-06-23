require('dotenv').config()
const sql = require('mssql')

async function fix() {
  const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT) || 1433,
    options: { encrypt: false, trustServerCertificate: true },
  }

  const pool = await sql.connect(config)

  // Drop tables we accidentally created
  await pool.request().query("IF EXISTS (SELECT * FROM sysobjects WHERE name='ThiSatHach' AND xtype='U') DROP TABLE ThiSatHach")
  await pool.request().query("IF EXISTS (SELECT * FROM sysobjects WHERE name='TraGPLX' AND xtype='U') DROP TABLE TraGPLX")
  console.log('Dropped extra tables')

  // Add missing columns to taikhoan
  try { await pool.request().query("ALTER TABLE taikhoan ADD email NVARCHAR(100) NULL") } catch {}
  try { await pool.request().query("ALTER TABLE taikhoan ADD ngayTao DATETIME DEFAULT GETDATE()") } catch {}
  console.log('Added missing columns to taikhoan')

  // Add columns to thisathach if missing
  try { await pool.request().query("ALTER TABLE thisathach ADD loaiBang NVARCHAR(10) NULL") } catch {}
  try { await pool.request().query("ALTER TABLE thisathach ADD trangThai NVARCHAR(50) DEFAULT N'Chờ thi'") } catch {}
  try { await pool.request().query("ALTER TABLE thisathach ADD tenHocVien NVARCHAR(100) NULL") } catch {}
  console.log('Added missing columns to thisathach')

  // Add columns to tragplx if missing
  try { await pool.request().query("ALTER TABLE tragplx ADD loaiBang NVARCHAR(10) NULL") } catch {}
  try { await pool.request().query("ALTER TABLE tragplx ADD ngayTra DATE NULL") } catch {}
  try { await pool.request().query("ALTER TABLE tragplx ADD trangThai NVARCHAR(50) DEFAULT N'Chờ xác nhận'") } catch {}
  try { await pool.request().query("ALTER TABLE tragplx ADD ghiChu NVARCHAR(500) NULL") } catch {}
  try { await pool.request().query("ALTER TABLE tragplx ADD tenHocVien NVARCHAR(100) NULL") } catch {}
  console.log('Added missing columns to tragplx')

  await pool.close()
  console.log('Fix completed!')
  process.exit(0)
}

fix().catch(err => { console.error(err); process.exit(1) })
