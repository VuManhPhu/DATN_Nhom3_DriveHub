<template>
  <div class="giao-vien-page">
    <h1>Quản Lý Giáo Viên</h1>
    <div class="page-controls">
      <button class="btn btn-primary" @click="openAddModal">Thêm Giáo Viên</button>
    </div>
    <DataTable :columns="columns" :data="giaoVienList" @edit="handleEdit" @delete="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '../components/DataTable.vue';

const columns = ref([
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Tên Giáo Viên' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Điện Thoại' },
  { key: 'specialization', label: 'Chuyên Môn' },
]);

const giaoVienList = ref([
  { id: 1, name: 'Trần Văn C', email: 'c@example.com', phone: '0923456789', specialization: 'Lái Xe' },
  { id: 2, name: 'Lê Thị D', email: 'd@example.com', phone: '0934567890', specialization: 'Lý Thuyết' },
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
.giao-vien-page {
  padding: 2rem;
}

.giao-vien-page h1 {
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
