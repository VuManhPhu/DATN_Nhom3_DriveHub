<template>
  <div class="thi-sat-hach-page">
    <h1>Quản Lý Thi Sát Hạch</h1>
    <div class="page-controls">
      <button class="btn btn-primary" @click="openAddModal">Tạo Kì Thi</button>
    </div>
    <DataTable :columns="columns" :data="thiSatHachList" @edit="handleEdit" @delete="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '../components/DataTable.vue';

const columns = ref([
  { key: 'id', label: 'ID' },
  { key: 'examName', label: 'Tên Kì Thi' },
  { key: 'date', label: 'Ngày Thi' },
  { key: 'examiner', label: 'Giáo Viên' },
  { key: 'status', label: 'Trạng Thái' },
]);

const thiSatHachList = ref([
  { id: 1, examName: 'Kì Thi Lý Thuyết 1', date: '2024-02-10', examiner: 'Trần Văn C', status: 'Hoàn Thành' },
  { id: 2, examName: 'Kì Thi Thực Hành 1', date: '2024-02-15', examiner: 'Lê Thị D', status: 'Sắp Tới' },
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
.thi-sat-hach-page {
  padding: 2rem;
}

.thi-sat-hach-page h1 {
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
