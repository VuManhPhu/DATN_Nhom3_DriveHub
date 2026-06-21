<template>
  <div class="tra-gplx-page">
    <h1>Tra Cứu GPLX</h1>
    <div class="search-section">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Nhập số GPLX hoặc tên học viên"
        class="search-input"
      />
      <button class="btn btn-primary" @click="handleSearch">Tìm Kiếm</button>
    </div>
    <div v-if="searchResult" class="search-result">
      <h3>Kết Quả Tìm Kiếm</h3>
      <p><strong>Tên:</strong> {{ searchResult.name }}</p>
      <p><strong>Số GPLX:</strong> {{ searchResult.licenseNumber }}</p>
      <p><strong>Hạng:</strong> {{ searchResult.class }}</p>
      <p><strong>Ngày Cấp:</strong> {{ searchResult.issueDate }}</p>
      <p><strong>Ngày Hết Hạn:</strong> {{ searchResult.expiryDate }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
const searchResult = ref(null);

const handleSearch = () => {
  // TODO: Implement search logic
  console.log('Searching for:', searchQuery.value);
  // Mock result
  searchResult.value = {
    name: 'Nguyễn Văn A',
    licenseNumber: 'GH-123456789',
    class: 'B',
    issueDate: '2024-01-20',
    expiryDate: '2034-01-20',
  };
};
</script>

<style scoped>
.tra-gplx-page {
  padding: 2rem;
}

.tra-gplx-page h1 {
  margin-bottom: 1.5rem;
  color: #333;
}

.search-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #4CAF50;
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

.search-result {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-result h3 {
  margin-top: 0;
  color: #333;
}

.search-result p {
  margin: 0.5rem 0;
}
</style>
