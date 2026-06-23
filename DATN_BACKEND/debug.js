require('dotenv').config()
const sql = require('mssql')

async function debug() {
  const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT) || 1433,
    options: { encrypt: false, trustServerCertificate: true },
  }

  try {
    const pool = await sql.connect(config)
    const result = await pool.request().query(`
      SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = 'TaiKhoan'
    `)
    console.log('Columns in TaiKhoan:', result.recordset)
    await pool.close()
  } catch (err) {
    console.error('Error:', err)
  }
}

debug()
