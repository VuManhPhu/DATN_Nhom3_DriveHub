<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Đăng Nhập DriveHub</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Tên Đăng Nhập:</label>
          <input
            v-model="username"
            type="text"
            id="username"
            placeholder="Nhập tên đăng nhập"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Mật Khẩu:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        <button type="submit" class="login-btn">Đăng Nhập</button>
      </form>
      <p class="register-link">
        Chưa có tài khoản? <a href="/register">Đăng Ký</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  // TODO: Implement login logic
  console.log('Login with:', { username: username.value, password: password.value });
  // Redirect to dashboard after successful login
  await router.push('/dashboard');
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

.login-card h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 5px rgba(102, 126, 234, 0.1);
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #5568d3;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
  color: #666;
}

.register-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
