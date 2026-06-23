require('dotenv').config()
const sql = require('mssql')

async function check() {
  const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT) || 1433,
    options: { encrypt: false, trustServerCertificate: true },
  }

  const pool = await sql.connect(config)
  const tables = await pool.request().query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'")

  for (const t of tables.recordset) {
    const cols = await pool.request()
      .input('t', t.TABLE_NAME)
      .query('SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @t')
    console.log(t.TABLE_NAME + ':', cols.recordset.map(c => c.COLUMN_NAME + '(' + c.DATA_TYPE + ')').join(', '))
  }

  // Check TaiKhoan data
  const tk = await pool.request().query('SELECT * FROM TaiKhoan')
  console.log('\nTaiKhoan data:', tk.recordset)

  await pool.close()
}

check().catch(console.error)
