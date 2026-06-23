module.exports = {
  secret: process.env.JWT_SECRET || 'drivehub_secret_key_2024',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
}
