import { defineStore } from 'pinia'
import api from '@/services/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('auth'))?.user || null,
    token: JSON.parse(localStorage.getItem('auth'))?.token || null,
    isAuthenticated: !!JSON.parse(localStorage.getItem('auth'))?.token,
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials)
        const { user, token } = response.data
        this.user = user
        this.token = token
        this.isAuthenticated = true
        localStorage.setItem(
          'auth',
          JSON.stringify({ user, token, isAuthenticated: true })
        )
        return { success: true }
      } catch (error) {
        this.user = null
        this.token = null
        this.isAuthenticated = false
        const message =
          error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'
        return { success: false, message }
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('auth')
    },

    async getProfile() {
      try {
        const response = await api.get('/auth/profile')
        this.user = response.data
        const auth = JSON.parse(localStorage.getItem('auth')) || {}
        auth.user = response.data
        localStorage.setItem('auth', JSON.stringify(auth))
        return response.data
      } catch (error) {
        return null
      }
    },
  },
})
