<template>
  <div class="hoc-vien-page">
    <h1>Quản Lý Học Viên</h1>
    <div class="page-controls">
      <button class="btn btn-primary" @click="openAddModal">Thêm Học Viên</button>
    </div>
    <DataTable :columns="columns" :data="hocVienList" @edit="handleEdit" @delete="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '../components/DataTable.vue';

const columns = ref([
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Tên Học Viên' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Điện Thoại' },
  { key: 'status', label: 'Trạng Thái' },
]);

const hocVienList = ref([
  { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', phone: '0901234567', status: 'Đang Học' },
  { id: 2, name: 'Trần Thị B', email: 'b@example.com', phone: '0912345678', status: 'Hoàn Thành' },
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
.hoc-vien-page {
  padding: 2rem;
}

.hoc-vien-page h1 {
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
