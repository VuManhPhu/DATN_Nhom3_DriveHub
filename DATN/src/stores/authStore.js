// Pinia store for authentication
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = ref(false);
  const token = ref(null);

  // Set user data
  const setUser = (userData) => {
    user.value = userData;
    isAuthenticated.value = true;
  };

  // Clear user data
  const clearUser = () => {
    user.value = null;
    isAuthenticated.value = false;
    token.value = null;
  };

  // Set token
  const setToken = (authToken) => {
    token.value = authToken;
  };

  // Check if user is authenticated
  const checkAuth = () => {
    return isAuthenticated.value;
  };

  // Get current user
  const getCurrentUser = () => {
    return user.value;
  };

  return {
    user,
    isAuthenticated,
    token,
    setUser,
    clearUser,
    setToken,
    checkAuth,
    getCurrentUser,
  };
});
