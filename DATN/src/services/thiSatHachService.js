import api from './axios'

const thiSatHachService = {
  getAll(params = {}) {
    return api.get('/thi-sat-hach', { params })
  },

  getById(id) {
    return api.get(`/thi-sat-hach/${id}`)
  },

  create(data) {
    return api.post('/thi-sat-hach', data)
  },

  update(id, data) {
    return api.put(`/thi-sat-hach/${id}`, data)
  },

  delete(id) {
    return api.delete(`/thi-sat-hach/${id}`)
  },

  capNhatKetQua(id, data) {
    return api.patch(`/thi-sat-hach/${id}/ket-qua`, data)
  },
}

export default thiSatHachService
