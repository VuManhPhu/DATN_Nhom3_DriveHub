<template>
  <div class="phong-hoc-page">
    <h1>Quản Lý Phòng Học</h1>
    <div class="page-controls">
      <button class="btn btn-primary" @click="openAddModal">Thêm Phòng Học</button>
    </div>
    <DataTable :columns="columns" :data="phongHocList" @edit="handleEdit" @delete="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '../components/DataTable.vue';

const columns = ref([
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Tên Phòng' },
  { key: 'capacity', label: 'Sức Chứa' },
  { key: 'location', label: 'Vị Trí' },
  { key: 'status', label: 'Trạng Thái' },
]);

const phongHocList = ref([
  { id: 1, name: 'Phòng A', capacity: '30', location: 'Tầng 1', status: 'Hoạt Động' },
  { id: 2, name: 'Phòng B', capacity: '25', location: 'Tầng 2', status: 'Hoạt Động' },
]);

const openAddModal = () => {
  console.log('Open add modal');
  // TODO: Implement add modal
};

const handleEdit = (row: any) => {
  console.log('Edit:', row);
  // TODO: Implement edit logic
};

const handleDelete = (row: any) => {
  console.log('Delete:', row);
  // TODO: Implement delete logic
};
</script>

<style scoped>
.phong-hoc-page {
  padding: 2rem;
}

.phong-hoc-page h1 {
  margin-bottom: 1.5rem;
  color: #333;
}

.page-controls {
  margin-bottom: 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
}
</style>
