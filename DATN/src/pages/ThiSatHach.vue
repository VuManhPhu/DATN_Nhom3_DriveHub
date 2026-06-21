<template>
  <div class="page-container">
    <div class="page-header">
      <h2>Quản lý thi sát hạch</h2>
      <el-button type="primary" @click="openDialog(null)">
        <el-icon><el-icon-plus /></el-icon>
        Thêm lịch thi
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
          <el-option label="Chờ thi" value="Chờ thi" />
          <el-option label="Đã thi" value="Đã thi" />
          <el-option label="Đạt" value="Đạt" />
          <el-option label="Không đạt" value="Không đạt" />
        </el-select>
        <el-date-picker
          v-model="filterDate"
          type="date"
          placeholder="Ngày thi"
          format="DD/MM/YYYY"
          value-format="YYYY-MM-DD"
          style="width: 160px"
          @change="handleSearch"
        />
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
        <el-table-column prop="ngayThi" label="Ngày thi" width="120">
          <template #default="{ row }">
            {{ formatDate(row.ngayThi) }}
          </template>
        </el-table-column>
        <el-table-column prop="ketQua" label="Kết quả" width="120">
          <template #default="{ row }">
            <el-tag :type="resultTagType(row.ketQua)" size="small">
              {{ row.ketQua || '---' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="trangThai" label="Trạng thái" width="110">
          <template #default="{ row }">
            <el-tag :type="statusTagType(row.trangThai)" size="small">
              {{ row.trangThai }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" width="220" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="openDialog(row)">
              Sửa
            </el-button>
            <el-button
              v-if="row.trangThai === 'Chờ thi'"
              type="warning"
              link
              size="small"
              @click="openKetQuaDialog(row)"
            >
              Nhập kết quả
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
      :title="isEdit ? 'Sửa lịch thi' : 'Thêm lịch thi'"
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
            <el-option label="F" value="F" />
          </el-select>
        </el-form-item>
        <el-form-item label="Ngày thi" prop="ngayThi">
          <el-date-picker
            v-model="form.ngayThi"
            type="date"
            placeholder="Chọn ngày thi"
            format="DD/MM/YYYY"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="Trạng thái" prop="trangThai">
          <el-select v-model="form.trangThai" style="width: 100%">
            <el-option label="Chờ thi" value="Chờ thi" />
            <el-option label="Đã thi" value="Đã thi" />
            <el-option label="Đạt" value="Đạt" />
            <el-option label="Không đạt" value="Không đạt" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
          {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="ketQuaDialogVisible"
      title="Nhập kết quả thi"
      width="400px"
      :close-on-click-modal="false"
    >
      <el-form ref="ketQuaFormRef" :model="ketQuaForm" label-width="100px" label-position="left">
        <el-form-item label="Kết quả" prop="ketQua">
          <el-select v-model="ketQuaForm.ketQua" style="width: 100%">
            <el-option label="Đạt" value="Đạt" />
            <el-option label="Không đạt" value="Không đạt" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="ketQuaDialogVisible = false">Hủy</el-button>
        <el-button type="primary" :loading="submitKetQuaLoading" @click="handleSubmitKetQua">
          Xác nhận
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import thiSatHachService from '@/services/thiSatHachService'

const loading = ref(false)
const submitLoading = ref(false)
const submitKetQuaLoading = ref(false)
const tableData = ref([])
const dialogVisible = ref(false)
const ketQuaDialogVisible = ref(false)
const isEdit = ref(false)
const searchKeyword = ref('')
const filterTrangThai = ref('')
const filterDate = ref('')
const formRef = ref(null)
const ketQuaFormRef = ref(null)
const editingId = ref(null)
const ketQuaEditingId = ref(null)

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

const defaultForm = {
  maHocVien: '',
  tenHocVien: '',
  loaiBang: 'B2',
  ngayThi: '',
  trangThai: 'Chờ thi',
}

const form = reactive({ ...defaultForm })

const ketQuaForm = reactive({
  ketQua: '',
})

const formRules = {
  maHocVien: [{ required: true, message: 'Vui lòng nhập mã học viên', trigger: 'blur' }],
  tenHocVien: [{ required: true, message: 'Vui lòng nhập tên học viên', trigger: 'blur' }],
  loaiBang: [{ required: true, message: 'Vui lòng chọn loại bằng', trigger: 'change' }],
  ngayThi: [{ required: true, message: 'Vui lòng chọn ngày thi', trigger: 'change' }],
  trangThai: [{ required: true, message: 'Vui lòng chọn trạng thái', trigger: 'change' }],
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
      ngayThi: filterDate.value || undefined,
    }
    const response = await thiSatHachService.getAll(params)
    tableData.value = response.data.data || response.data
    pagination.total = response.data.total || (response.data.data || response.data).length
  } catch {
    tableData.value = []
    ElMessage.error('Không thể tải danh sách thi sát hạch')
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
      ngayThi: row.ngayThi,
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
      await thiSatHachService.update(editingId.value, form)
      ElMessage.success('Cập nhật lịch thi thành công')
    } else {
      await thiSatHachService.create(form)
      ElMessage.success('Thêm lịch thi thành công')
    }
    dialogVisible.value = false
    fetchData()
  } catch {
    ElMessage.error(isEdit.value ? 'Cập nhật thất bại' : 'Thêm mới thất bại')
  } finally {
    submitLoading.value = false
  }
}

const openKetQuaDialog = (row) => {
  ketQuaEditingId.value = row.id
  ketQuaForm.ketQua = ''
  ketQuaDialogVisible.value = true
  nextTick(() => ketQuaFormRef.value?.clearValidate())
}

const handleSubmitKetQua = async () => {
  if (!ketQuaForm.ketQua) {
    ElMessage.warning('Vui lòng chọn kết quả')
    return
  }
  submitKetQuaLoading.value = true
  try {
    await thiSatHachService.capNhatKetQua(ketQuaEditingId.value, {
      ketQua: ketQuaForm.ketQua,
      trangThai: ketQuaForm.ketQua,
    })
    ElMessage.success('Cập nhật kết quả thành công')
    ketQuaDialogVisible.value = false
    fetchData()
  } catch {
    ElMessage.error('Cập nhật kết quả thất bại')
  } finally {
    submitKetQuaLoading.value = false
  }
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `Bạn có chắc muốn xóa lịch thi của học viên "${row.tenHocVien}"?`,
    'Xác nhận',
    {
      type: 'warning',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }
  )
    .then(async () => {
      try {
        await thiSatHachService.delete(row.id)
        ElMessage.success('Xóa lịch thi thành công')
        fetchData()
      } catch {
        ElMessage.error('Xóa thất bại')
      }
    })
    .catch(() => {})
}

const resultTagType = (result) => {
  switch (result) {
    case 'Đạt': return 'success'
    case 'Không đạt': return 'danger'
    default: return 'info'
  }
}

const statusTagType = (status) => {
  switch (status) {
    case 'Chờ thi': return 'warning'
    case 'Đã thi': return 'primary'
    case 'Đạt': return 'success'
    case 'Không đạt': return 'danger'
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
