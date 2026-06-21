<template>
  <div class="page-container">
    <div class="page-header">
      <h2>Quản lý tài khoản</h2>
      <el-button type="primary" @click="openDialog(null)">
        <el-icon><el-icon-plus /></el-icon>
        Thêm tài khoản
      </el-button>
    </div>

    <el-card class="page-card">
      <div class="toolbar">
        <el-input
          v-model="searchKeyword"
          placeholder="Tìm kiếm tài khoản..."
          :prefix-icon="Search"
          clearable
          style="width: 300px"
          @input="handleSearch"
        />
      </div>

      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        border
        style="width: 100%"
        @sort-change="handleSortChange"
      >
        <el-table-column prop="id" label="ID" width="70" sortable="custom" />
        <el-table-column prop="username" label="Tên đăng nhập" min-width="140" />
        <el-table-column prop="hoTen" label="Họ tên" min-width="180" />
        <el-table-column prop="email" label="Email" min-width="200" />
        <el-table-column prop="vaiTro" label="Vai trò" width="120">
          <template #default="{ row }">
            <el-tag :type="roleTagType(row.vaiTro)" size="small">
              {{ row.vaiTro }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="trangThai" label="Trạng thái" width="110">
          <template #default="{ row }">
            <el-tag :type="row.trangThai === 'Hoạt động' ? 'success' : 'danger'" size="small">
              {{ row.trangThai }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ngayTao" label="Ngày tạo" width="120">
          <template #default="{ row }">
            {{ formatDate(row.ngayTao) }}
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="openDialog(row)">
              Sửa
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
      :title="isEdit ? 'Sửa tài khoản' : 'Thêm tài khoản'"
      width="520px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        label-width="130px"
        label-position="left"
      >
        <el-form-item label="Tên đăng nhập" prop="username">
          <el-input v-model="form.username" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="Mật khẩu" prop="password" v-if="!isEdit">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="Họ tên" prop="hoTen">
          <el-input v-model="form.hoTen" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Vai trò" prop="vaiTro">
          <el-select v-model="form.vaiTro" style="width: 100%">
            <el-option label="Quản trị viên" value="Quản trị viên" />
            <el-option label="Giáo viên" value="Giáo viên" />
            <el-option label="Nhân viên" value="Nhân viên" />
          </el-select>
        </el-form-item>
        <el-form-item label="Trạng thái" prop="trangThai">
          <el-switch
            v-model="form.trangThai"
            active-value="Hoạt động"
            inactive-value="Khóa"
            active-text="Hoạt động"
            inactive-text="Khóa"
          />
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
import taiKhoanService from '@/services/taiKhoanService'

const loading = ref(false)
const submitLoading = ref(false)
const tableData = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const searchKeyword = ref('')
const formRef = ref(null)
const editingId = ref(null)

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

const defaultForm = {
  username: '',
  password: '',
  hoTen: '',
  email: '',
  vaiTro: 'Nhân viên',
  trangThai: 'Hoạt động',
}

const form = reactive({ ...defaultForm })

const formRules = {
  username: [{ required: true, message: 'duytan', trigger: 'blur' }],
  password: [{ required: true, message: '0306', trigger: 'blur' }],
  hoTen: [{ required: true, message: 'nguyenduytan', trigger: 'blur' }],
  email: [
    { required: true, message: 'tn307389@gmail.com', trigger: 'blur' },
    { type: 'email', message: 'Email không hợp lệ', trigger: 'blur' },
  ],
  vaiTro: [{ required: true, message: 'admin', trigger: 'change' }],
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
    }
    const response = await taiKhoanService.getAll(params)
    tableData.value = response.data.data || response.data
    pagination.total = response.data.total || (response.data.data || response.data).length
  } catch {
    tableData.value = []
    ElMessage.error('Không thể tải danh sách tài khoản')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  fetchData()
}

const handleSortChange = ({ prop, order }) => {
  fetchData()
}

const openDialog = (row) => {
  isEdit.value = !!row
  editingId.value = row ? row.id : null
  if (row) {
    Object.assign(form, {
      username: row.username,
      hoTen: row.hoTen,
      email: row.email,
      vaiTro: row.vaiTro,
      trangThai: row.trangThai,
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
      await taiKhoanService.update(editingId.value, form)
      ElMessage.success('Cập nhật tài khoản thành công')
    } else {
      await taiKhoanService.create(form)
      ElMessage.success('Thêm tài khoản thành công')
    }
    dialogVisible.value = false
    fetchData()
  } catch {
    ElMessage.error(isEdit.value ? 'Cập nhật thất bại' : 'Thêm mới thất bại')
  } finally {
    submitLoading.value = false
  }
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`Bạn có chắc muốn xóa tài khoản "${row.username}"?`, 'Xác nhận', {
    type: 'warning',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
  }).then(async () => {
    try {
      await taiKhoanService.delete(row.id)
      ElMessage.success('Xóa tài khoản thành công')
      fetchData()
    } catch {
      ElMessage.error('Xóa thất bại')
    }
  }).catch(() => {})
}

const roleTagType = (role) => {
  switch (role) {
    case 'Quản trị viên': return 'danger'
    case 'Giáo viên': return 'warning'
    case 'Nhân viên': return 'info'
    default: return ''
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
}
.pagination-wrap {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
