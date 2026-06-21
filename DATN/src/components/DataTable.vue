<template>
  <div class="data-table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" class="table-header">
            {{ column.label }}
          </th>
          <th class="table-header">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index" class="table-row">
          <td v-for="column in columns" :key="column.key" class="table-cell">
            {{ row[column.key] }}
          </td>
          <td class="table-cell action-cell">
            <button class="btn btn-edit" @click="$emit('edit', row)">Sửa</button>
            <button class="btn btn-delete" @click="$emit('delete', row)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string;
  label: string;
}

defineProps<{
  columns: Column[];
  data: any[];
}>();

defineEmits<{
  edit: [row: any];
  delete: [row: any];
}>();
</script>

<style scoped>
.data-table-container {
  overflow-x: auto;
  margin: 1rem 0;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table-header {
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem;
  text-align: left;
  font-weight: bold;
}

.table-row {
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s;
}

.table-row:hover {
  background-color: #f5f5f5;
}

.table-cell {
  padding: 0.75rem;
}

.action-cell {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s;
}

.btn-edit {
  background-color: #2196F3;
  color: white;
}

.btn-edit:hover {
  background-color: #0b7dda;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-delete:hover {
  background-color: #da190b;
}
</style>
