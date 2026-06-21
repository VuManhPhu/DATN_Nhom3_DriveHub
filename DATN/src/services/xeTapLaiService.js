// Service for handling Xe Tập Lái (Practice Vehicle) API calls
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api';

export const xeTapLaiService = {
  // Get all vehicles
  getAllXeTapLai: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/xe-tap-lai`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  },

  // Get vehicle by ID
  getXeTapLaiById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/xe-tap-lai/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      throw error;
    }
  },

  // Create new vehicle
  createXeTapLai: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/xe-tap-lai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating vehicle:', error);
      throw error;
    }
  },

  // Update vehicle
  updateXeTapLai: async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/xe-tap-lai/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating vehicle:', error);
      throw error;
    }
  },

  // Delete vehicle
  deleteXeTapLai: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/xe-tap-lai/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      throw error;
    }
  },
};
