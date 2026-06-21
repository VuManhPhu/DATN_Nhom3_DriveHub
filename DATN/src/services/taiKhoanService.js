import api from './axios'

const taiKhoanService = {
  getAll(params = {}) {
    return api.get('/tai-khoan', { params })
  },

  getById(id) {
    return api.get(`/tai-khoan/${id}`)
  },

  create(data) {
    return api.post('/tai-khoan', data)
  },

  update(id, data) {
    return api.put(`/tai-khoan/${id}`, data)
  },

  delete(id) {
    return api.delete(`/tai-khoan/${id}`)
  },

  search(keyword) {
    return api.get('/tai-khoan/search', { params: { keyword } })
  },
}

export default taiKhoanService
