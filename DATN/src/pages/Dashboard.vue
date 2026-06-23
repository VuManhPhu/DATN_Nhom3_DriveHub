<template>
  <div class="page-container">
    <div class="page-header">
      <h2>Dashboard</h2>
    </div>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-value">--</div>
          <div class="stat-label">Tài khoản</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-value">--</div>
          <div class="stat-label">Thi sát hạch</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-value">--</div>
          <div class="stat-label">Trả GPLX</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-value">--</div>
          <div class="stat-label">Học viên</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
</script>

<style scoped>
.page-container {
  padding: 0;
}
.page-header {
  margin-bottom: 24px;
}
.page-header h2 {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a2e;
}
.stat-card {
  text-align: center;
  border-radius: 8px;
}
.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #409eff;
}
.stat-label {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}
</style>
