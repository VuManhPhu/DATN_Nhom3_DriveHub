<template>
  <div class="tai-khoan-page">
    <h1>Quản Lý Tài Khoản</h1>
    <div class="page-controls">
      <button class="btn btn-primary" @click="openAddModal">Thêm Tài Khoản</button>
    </div>
    <DataTable :columns="columns" :data="accountList" @edit="handleEdit" @delete="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '../components/DataTable.vue';

const columns = ref([
  { key: 'id', label: 'ID' },
  { key: 'username', label: 'Tên Đăng Nhập' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Vai Trò' },
  { key: 'status', label: 'Trạng Thái' },
]);

const accountList = ref([
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'Admin', status: 'Hoạt Động' },
  { id: 2, username: 'teacher1', email: 'teacher1@example.com', role: 'Giáo Viên', status: 'Hoạt Động' },
  { id: 3, username: 'student1', email: 'student1@example.com', role: 'Học Viên', status: 'Hoạt Động' },
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
.tai-khoan-page {
  padding: 2rem;
}

.tai-khoan-page h1 {
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
