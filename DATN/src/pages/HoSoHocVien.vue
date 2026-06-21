<template>
  <div class="ho-so-hoc-vien-page">
    <h1>Hồ Sơ Học Viên</h1>
    <div class="page-controls">
      <button class="btn btn-primary" @click="openAddModal">Thêm Hồ Sơ</button>
    </div>
    <DataTable :columns="columns" :data="hoSoList" @edit="handleEdit" @delete="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '../components/DataTable.vue';

const columns = ref([
  { key: 'id', label: 'ID' },
  { key: 'studentName', label: 'Tên Học Viên' },
  { key: 'documentStatus', label: 'Tình Trạng Hồ Sơ' },
  { key: 'startDate', label: 'Ngày Bắt Đầu' },
  { key: 'endDate', label: 'Ngày Kết Thúc' },
]);

const hoSoList = ref([
  {
    id: 1,
    studentName: 'Nguyễn Văn A',
    documentStatus: 'Đầy Đủ',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
  },
  {
    id: 2,
    studentName: 'Trần Thị B',
    documentStatus: 'Chờ Hồ Sơ',
    startDate: '2024-01-20',
    endDate: '2024-04-20',
  },
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
.ho-so-hoc-vien-page {
  padding: 2rem;
}

.ho-so-hoc-vien-page h1 {
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
