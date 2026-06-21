// Service for handling Học Viên (Student) API calls
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api';

export const hocVienService = {
  // Get all students
  getAllHocVien: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hoc-vien`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  // Get student by ID
  getHocVienById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hoc-vien/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  },

  // Create new student
  createHocVien: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hoc-vien`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },

  // Update student
  updateHocVien: async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hoc-vien/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  },

  // Delete student
  deleteHocVien: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hoc-vien/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  },
};
