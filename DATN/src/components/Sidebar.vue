<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2>Menu</h2>
    </div>
    <nav class="sidebar-nav">
      <ul class="sidebar-items">
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/hoc-vien">Học Viên</router-link></li>
        <li><router-link to="/giao-vien">Giáo Viên</router-link></li>
        <li><router-link to="/xe-tap-lai">Xe Tập Lái</router-link></li>
        <li><router-link to="/chuong-trinh-hoc">Chương Trình Học</router-link></li>
        <li><router-link to="/phong-hoc">Phòng Học</router-link></li>
        <li><router-link to="/thi-sat-hach">Thi Sát Hạch</router-link></li>
        <li><router-link to="/tra-gplx">Tra Cứu GPLX</router-link></li>
        <li><router-link to="/ho-so-hoc-vien">Hồ Sơ Học Viên</router-link></li>
        <li><router-link to="/tai-khoan">Tài Khoản</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
// Sidebar component for navigation menu
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f5f5f5;
  padding: 1rem 0;
  border-right: 1px solid #ddd;
  height: 100vh;
  position: fixed;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.sidebar-nav {
  margin-top: 1rem;
}

.sidebar-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-items li {
  margin: 0;
}

.sidebar-items a {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s;
}

.sidebar-items a:hover {
  background-color: #e0e0e0;
}

.sidebar-items a.router-link-active {
  background-color: #4CAF50;
  color: white;
}
</style>
