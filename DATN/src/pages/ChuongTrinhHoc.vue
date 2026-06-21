<template>
  <div class="chuong-trinh-hoc-page">
    <h1>Quản Lý Chương Trình Học</h1>
    <div class="page-controls">
      <button class="btn btn-primary" @click="openAddModal">Thêm Chương Trình</button>
    </div>
    <DataTable :columns="columns" :data="chuongTrinhList" @edit="handleEdit" @delete="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '../components/DataTable.vue';

const columns = ref([
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Tên Chương Trình' },
  { key: 'duration', label: 'Thời Gian' },
  { key: 'fee', label: 'Học Phí' },
  { key: 'status', label: 'Trạng Thái' },
]);

const chuongTrinhList = ref([
  { id: 1, name: 'Bằng Lái A', duration: '30 giờ', fee: '5,000,000đ', status: 'Đang Mở' },
  { id: 2, name: 'Bằng Lái B', duration: '40 giờ', fee: '7,000,000đ', status: 'Đang Mở' },
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
.chuong-trinh-hoc-page {
  padding: 2rem;
}

.chuong-trinh-hoc-page h1 {
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
