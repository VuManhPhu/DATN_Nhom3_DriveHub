<template>
  <div class="admin-layout">
    <Navbar />
    <div class="admin-container">
      <Sidebar />
      <main class="admin-content">
        <router-view />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import Footer from '../components/Footer.vue';
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-container {
  display: flex;
  flex: 1;
}

.admin-content {
  flex: 1;
  margin-left: 250px;
  background-color: #f9f9f9;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .admin-container {
    flex-direction: column;
  }

  .admin-content {
    margin-left: 0;
  }
}
</style>
