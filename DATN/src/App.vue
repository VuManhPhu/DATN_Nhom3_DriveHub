<template>
  <el-config-provider :locale="locale">
    <div v-if="isLoginPage" class="login-layout">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <el-container v-else class="admin-layout">
      <el-aside :width="isCollapse ? '64px' : '240px'" class="sidebar">
        <div class="logo" @click="router.push('/admin/dashboard')">
          <img src="/vite.svg" alt="DriveHub" class="logo-icon" />
          <span v-show="!isCollapse" class="logo-text">DriveHub</span>
        </div>
        <el-menu
          :default-active="route.path"
          :collapse="isCollapse"
          :collapse-transition="false"
          background-color="#001529"
          text-color="#ffffffbf"
          active-text-color="#ffffff"
          router
        >
          <el-menu-item index="/admin/dashboard">
            <el-icon><el-icon-data-analysis /></el-icon>
            <template #title>Dashboard</template>
          </el-menu-item>
          <el-menu-item index="/admin/tai-khoan">
            <el-icon><el-icon-user /></el-icon>
            <template #title>Tài khoản</template>
          </el-menu-item>
          <el-menu-item index="/admin/thi-sat-hach">
            <el-icon><el-icon-document-checked /></el-icon>
            <template #title>Thi sát hạch</template>
          </el-menu-item>
          <el-menu-item index="/admin/tra-gplx">
            <el-icon><el-icon-reading /></el-icon>
            <template #title>Trả GPLX</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="header-left">
            <el-icon class="collapse-btn" @click="isCollapse = !isCollapse">
              <el-icon-expand v-if="isCollapse" />
              <el-icon-fold v-else />
            </el-icon>
            <el-breadcrumb>
              <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">Trang chủ</el-breadcrumb-item>
              <el-breadcrumb-item v-if="route.meta?.title">{{ route.meta.title }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="header-right">
            <el-dropdown trigger="click">
              <span class="user-info">
                <el-avatar :size="32" icon="el-icon-user-solid" />
                <span class="username">{{ user?.hoTen || 'Admin' }}</span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleLogout">
                    <el-icon><el-icon-switch-button /></el-icon>
                    Đăng xuất
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="main-content">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElLoading } from 'element-plus'
import vi from 'element-plus/dist/locale/vi.mjs'
import { useAuthStore } from '@/stores/authStore'

const locale = ref(vi)
const loadingInstance = ref(null)

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isCollapse = ref(false)
const user = computed(() => authStore.user)

const isLoginPage = computed(() => route.name === 'Login')

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'Login' })
}

onMounted(() => {
  window._showLoading = () => {
    loadingInstance.value = ElLoading.service({
      fullscreen: true,
      text: 'Đang tải...',
    })
  }
  window._hideLoading = () => {
    loadingInstance.value?.close()
    loadingInstance.value = null
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body, #app {
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', Arial, sans-serif;
}

.admin-layout {
  height: 100vh;
}
.sidebar {
  background: #001529;
  transition: width 0.3s;
  overflow: hidden;
}
.logo {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
}
.logo-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}
.logo-text {
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  margin-left: 10px;
  white-space: nowrap;
}
.header {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  z-index: 10;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.collapse-btn {
  font-size: 20px;
  cursor: pointer;
}
.header-right {
  display: flex;
  align-items: center;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.username {
  font-size: 14px;
  color: #333;
}
.main-content {
  background: #f0f2f5;
  min-height: calc(100vh - 60px);
}

.login-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
