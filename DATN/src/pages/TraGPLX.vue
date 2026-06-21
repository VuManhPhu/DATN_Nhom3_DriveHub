<template>
  <div class="page-container">
    <div class="page-header">
      <h2>Quản lý trả GPLX</h2>
      <el-button type="primary" @click="openDialog(null)">
        <el-icon><el-icon-plus /></el-icon>
        Thêm yêu cầu
      </el-button>
    </div>

    <el-card class="page-card">
      <div class="toolbar">
        <el-input
          v-model="searchKeyword"
          placeholder="Tìm kiếm học viên..."
          :prefix-icon="Search"
          clearable
          style="width: 280px"
          @input="handleSearch"
        />
        <el-select
          v-model="filterTrangThai"
          placeholder="Trạng thái"
          clearable
          style="width: 150px"
          @change="handleSearch"
        >
          <el-option label="Chờ xác nhận" value="Chờ xác nhận" />
          <el-option label="Đã xác nhận" value="Đã xác nhận" />
          <el-option label="Đã trả" value="Đã trả" />
        </el-select>
      </div>

      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="maHocVien" label="Mã HV" width="100" />
        <el-table-column prop="tenHocVien" label="Học viên" min-width="180" />
        <el-table-column prop="loaiBang" label="Loại bằng" width="120" />
        <el-table-column prop="ngayTra" label="Ngày trả" width="120">
          <template #default="{ row }">
            {{ formatDate(row.ngayTra) }}
          </template>
        </el-table-column>
        <el-table-column prop="trangThai" label="Trạng thái" width="130">
          <template #default="{ row }">
            <el-tag :type="statusTagType(row.trangThai)" size="small">
              {{ row.trangThai }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ghiChu" label="Ghi chú" min-width="200" show-overflow-tooltip />
        <el-table-column label="Thao tác" width="240" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="openDialog(row)">
              Sửa
            </el-button>
            <el-button
              v-if="row.trangThai === 'Chờ xác nhận'"
              type="success"
              link
              size="small"
              @click="handleXacNhan(row)"
            >
              Xác nhận
            </el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">
              Xóa
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrap">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next"
          @size-change="fetchData"
          @current-change="fetchData"
        />
      </div>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? 'Sửa yêu cầu trả GPLX' : 'Thêm yêu cầu trả GPLX'"
      width="520px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="Mã học viên" prop="maHocVien">
          <el-input v-model="form.maHocVien" />
        </el-form-item>
        <el-form-item label="Tên học viên" prop="tenHocVien">
          <el-input v-model="form.tenHocVien" />
        </el-form-item>
        <el-form-item label="Loại bằng" prop="loaiBang">
          <el-select v-model="form.loaiBang" style="width: 100%">
            <el-option label="B1" value="B1" />
            <el-option label="B2" value="B2" />
            <el-option label="C" value="C" />
            <el-option label="D" value="D" />
            <el-option label="E" value="E" />
          </el-select>
        </el-form-item>
        <el-form-item label="Ngày trả" prop="ngayTra">
          <el-date-picker
            v-model="form.ngayTra"
            type="date"
            placeholder="Chọn ngày trả"
            format="DD/MM/YYYY"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="Trạng thái" prop="trangThai">
          <el-select v-model="form.trangThai" style="width: 100%">
            <el-option label="Chờ xác nhận" value="Chờ xác nhận" />
            <el-option label="Đã xác nhận" value="Đã xác nhận" />
            <el-option label="Đã trả" value="Đã trả" />
          </el-select>
        </el-form-item>
        <el-form-item label="Ghi chú" prop="ghiChu">
          <el-input v-model="form.ghiChu" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
          {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import traGPLXService from '@/services/traGPLXService'

const loading = ref(false)
const submitLoading = ref(false)
const tableData = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const searchKeyword = ref('')
const filterTrangThai = ref('')
const formRef = ref(null)
const editingId = ref(null)

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

const defaultForm = {
  maHocVien: '',
  tenHocVien: '',
  loaiBang: 'B2',
  ngayTra: '',
  trangThai: 'Chờ xác nhận',
  ghiChu: '',
}

const form = reactive({ ...defaultForm })

const formRules = {
  maHocVien: [{ required: true, message: 'Vui lòng nhập mã học viên', trigger: 'blur' }],
  tenHocVien: [{ required: true, message: 'Vui lòng nhập tên học viên', trigger: 'blur' }],
  loaiBang: [{ required: true, message: 'Vui lòng chọn loại bằng', trigger: 'change' }],
  ngayTra: [{ required: true, message: 'Vui lòng chọn ngày trả', trigger: 'change' }],
}

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      keyword: searchKeyword.value || undefined,
      trangThai: filterTrangThai.value || undefined,
    }
    const response = await traGPLXService.getAll(params)
    tableData.value = response.data.data || response.data
    pagination.total = response.data.total || (response.data.data || response.data).length
  } catch {
    tableData.value = []
    ElMessage.error('Không thể tải danh sách trả GPLX')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  fetchData()
}

const openDialog = (row) => {
  isEdit.value = !!row
  editingId.value = row ? row.id : null
  if (row) {
    Object.assign(form, {
      maHocVien: row.maHocVien,
      tenHocVien: row.tenHocVien,
      loaiBang: row.loaiBang,
      ngayTra: row.ngayTra,
      trangThai: row.trangThai,
      ghiChu: row.ghiChu || '',
    })
  } else {
    Object.assign(form, { ...defaultForm })
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate())
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    if (isEdit.value) {
      await traGPLXService.update(editingId.value, form)
      ElMessage.success('Cập nhật yêu cầu thành công')
    } else {
      await traGPLXService.create(form)
      ElMessage.success('Thêm yêu cầu thành công')
    }
    dialogVisible.value = false
    fetchData()
  } catch {
    ElMessage.error(isEdit.value ? 'Cập nhật thất bại' : 'Thêm mới thất bại')
  } finally {
    submitLoading.value = false
  }
}

const handleXacNhan = (row) => {
  ElMessageBox.confirm(
    `Xác nhận trả GPLX cho học viên "${row.tenHocVien}"?`,
    'Xác nhận',
    {
      type: 'info',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }
  )
    .then(async () => {
      try {
        await traGPLXService.xacNhanTra(row.id)
        ElMessage.success('Xác nhận trả GPLX thành công')
        fetchData()
      } catch {
        ElMessage.error('Xác nhận thất bại')
      }
    })
    .catch(() => {})
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `Bạn có chắc muốn xóa yêu cầu trả GPLX của "${row.tenHocVien}"?`,
    'Xác nhận',
    {
      type: 'warning',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }
  )
    .then(async () => {
      try {
        await traGPLXService.delete(row.id)
        ElMessage.success('Xóa yêu cầu thành công')
        fetchData()
      } catch {
        ElMessage.error('Xóa thất bại')
      }
    })
    .catch(() => {})
}

const statusTagType = (status) => {
  switch (status) {
    case 'Chờ xác nhận': return 'warning'
    case 'Đã xác nhận': return 'primary'
    case 'Đã trả': return 'success'
    default: return 'info'
  }
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('vi-VN')
}
</script>

<style scoped>
.page-container {
  padding: 0;
}
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.page-header h2 {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a2e;
}
.page-card {
  border-radius: 8px;
}
.toolbar {
  margin-bottom: 16px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.pagination-wrap {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
