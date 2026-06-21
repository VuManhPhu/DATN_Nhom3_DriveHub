<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <h1>DriveHub</h1>
      </div>
      <div class="navbar-menu">
        <ul class="navbar-items">
          <li><a href="#home">Trang Chủ</a></li>
          <li><a href="#about">Về Chúng Tôi</a></li>
          <li><a href="#contact">Liên Hệ</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Navbar component for main navigation
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 1rem 2rem;
  color: white;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand h1 {
  margin: 0;
  font-size: 1.5rem;
}

.navbar-items {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.navbar-items a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.navbar-items a:hover {
  color: #4CAF50;
}
</style>
