<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>DriveHub</h3>
        <p>Hệ thống quản lý trường dạy lái xe</p>
      </div>
      <div class="footer-section">
        <h4>Liên Kết</h4>
        <ul>
          <li><a href="#about">Về Chúng Tôi</a></li>
          <li><a href="#contact">Liên Hệ</a></li>
          <li><a href="#privacy">Chính Sách Bảo Mật</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Liên Hệ</h4>
        <p>Email: info@drivehub.com</p>
        <p>Điện Thoại: (+84) 123-456-789</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 DriveHub. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component
</script>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  margin-top: 3rem;
  padding: 2rem 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin-top: 0;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section a {
  color: #4CAF50;
  text-decoration: none;
}

.footer-section a:hover {
  text-decoration: underline;
}

.footer-bottom {
  text-align: center;
  padding: 1rem;
  border-top: 1px solid #555;
}

.footer-bottom p {
  margin: 0;
}
</style>
