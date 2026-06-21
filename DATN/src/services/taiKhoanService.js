// Service for handling Tài Khoản (Account) API calls
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api';

export const taiKhoanService = {
  // Login
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
      });
      return await response.json();
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  // Get all accounts
  getAllTaiKhoan: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tai-khoan`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  },

  // Get account by ID
  getTaiKhoanById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tai-khoan/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching account:', error);
      throw error;
    }
  },

  // Create new account
  createTaiKhoan: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tai-khoan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  },

  // Update account
  updateTaiKhoan: async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tai-khoan/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating account:', error);
      throw error;
    }
  },

  // Delete account
  deleteTaiKhoan: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tai-khoan/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  },

  // Change password
  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },
};
