<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <img src="/vite.svg" alt="DriveHub" class="login-logo" />
        <h1 class="login-title">DriveHub</h1>
        <p class="login-subtitle">Hệ thống quản lý trung tâm đào tạo lái xe</p>
      </div>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="0"
        size="large"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="Tên đăng nhập"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Mật khẩu"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            class="login-btn"
            @click="handleLogin"
          >
            Đăng nhập
          </el-button>
        </el-form-item>
      </el-form>
      <div v-if="errorMessage" class="error-message">
        <el-alert :title="errorMessage" type="error" show-icon :closable="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()

const formRef = ref(null)
const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: 'ten dang nhap', trigger: 'blur' }],
  password: [{ required: true, message: 'mat khau', trigger: 'blur' }],
}

const handleLogin = async () => {
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  loading.value = true
  errorMessage.value = ''

  const result = await authStore.login({
    username: form.username,
    password: form.password,
  })

  loading.value = false

  if (result.success) {
    router.push('/admin/dashboard')
  } else {
    errorMessage.value = result.message
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  width: 420px;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}
.login-header {
  text-align: center;
  margin-bottom: 32px;
}
.login-logo {
  width: 64px;
  height: 64px;
  margin-bottom: 8px;
}
.login-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 4px;
}
.login-subtitle {
  font-size: 14px;
  color: #888;
}
.login-btn {
  width: 100%;
}
.error-message {
  margin-top: 16px;
}
</style>
