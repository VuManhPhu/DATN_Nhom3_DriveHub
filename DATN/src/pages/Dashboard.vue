<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="dashboard-grid">
      <div class="card">
        <h3>Tổng Học Viên</h3>
        <p class="stat-number">{{ stats.totalStudents }}</p>
      </div>
      <div class="card">
        <h3>Tổng Giáo Viên</h3>
        <p class="stat-number">{{ stats.totalTeachers }}</p>
      </div>
      <div class="card">
        <h3>Xe Tập Lái</h3>
        <p class="stat-number">{{ stats.totalVehicles }}</p>
      </div>
      <div class="card">
        <h3>Phòng Học</h3>
        <p class="stat-number">{{ stats.totalClassrooms }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const stats = ref({
  totalStudents: 150,
  totalTeachers: 20,
  totalVehicles: 15,
  totalClassrooms: 10,
});
</script>

<style scoped>
.dashboard {
  padding: 2rem;
}

.dashboard h1 {
  margin-bottom: 2rem;
  color: #333;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card h3 {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.95rem;
}

.stat-number {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  color: #4CAF50;
}
</style>
