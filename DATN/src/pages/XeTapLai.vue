<template>
  <div class="xe-tap-lai-page">
    <h1>Quản Lý Xe Tập Lái</h1>
    <div class="page-controls">
      <button class="btn btn-primary" @click="openAddModal">Thêm Xe</button>
    </div>
    <DataTable :columns="columns" :data="xeTapLaiList" @edit="handleEdit" @delete="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '../components/DataTable.vue';

const columns = ref([
  { key: 'id', label: 'ID' },
  { key: 'licensePlate', label: 'Biển Số' },
  { key: 'model', label: 'Model' },
  { key: 'year', label: 'Năm' },
  { key: 'status', label: 'Trạng Thái' },
]);

const xeTapLaiList = ref([
  { id: 1, licensePlate: '29A-12345', model: 'Toyota Vios', year: 2022, status: 'Hoạt Động' },
  { id: 2, licensePlate: '29A-12346', model: 'Honda City', year: 2023, status: 'Bảo Dưỡng' },
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
.xe-tap-lai-page {
  padding: 2rem;
}

.xe-tap-lai-page h1 {
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
