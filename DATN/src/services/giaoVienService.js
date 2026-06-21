// Service for handling Giáo Viên (Teacher) API calls
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api';

export const giaoVienService = {
  // Get all teachers
  getAllGiaoVien: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/giao-vien`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching teachers:', error);
      throw error;
    }
  },

  // Get teacher by ID
  getGiaoVienById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/giao-vien/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching teacher:', error);
      throw error;
    }
  },

  // Create new teacher
  createGiaoVien: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/giao-vien`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating teacher:', error);
      throw error;
    }
  },

  // Update teacher
  updateGiaoVien: async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/giao-vien/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating teacher:', error);
      throw error;
    }
  },

  // Delete teacher
  deleteGiaoVien: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/giao-vien/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting teacher:', error);
      throw error;
    }
  },
};
