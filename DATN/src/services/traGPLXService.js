import api from './axios'

const traGPLXService = {
  getAll(params = {}) {
    return api.get('/tra-gplx', { params })
  },

  getById(id) {
    return api.get(`/tra-gplx/${id}`)
  },

  create(data) {
    return api.post('/tra-gplx', data)
  },

  update(id, data) {
    return api.put(`/tra-gplx/${id}`, data)
  },

  delete(id) {
    return api.delete(`/tra-gplx/${id}`)
  },

  xacNhanTra(id) {
    return api.patch(`/tra-gplx/${id}/xac-nhan`)
  },
}

export default traGPLXService
