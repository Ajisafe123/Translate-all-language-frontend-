import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:8000'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref('')

  const setToken = (newToken) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }

  const clearAuth = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }

  const register = async (formData) => {
    loading.value = true
    error.value = ''
    try {
      const res = await axios.post(`${API_URL}/auth/register`, formData)
      alert('Registration successful! Please login.')
      return true
    } catch (err) {
      error.value = err.response?.data?.detail || 'Registration failed'
      return false
    } finally {
      loading.value = false
    }
  }

  const login = async (username, password) => {
    loading.value = true
    error.value = ''
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { username, password })
      setToken(res.data.access_token)

      const meRes = await axios.get(`${API_URL}/auth/me`)
      user.value = meRes.data

      // Role-based redirect
      const role = user.value.role
      if (role === 'student') {
        window.location.href = '/student/dashboard'
      } else if (role === 'lecturer') {
        window.location.href = '/lecturer/classes'
      } else if (role === 'admin') {
        window.location.href = '/admin/dashboard'
      }
    } catch (err) {
      error.value = err.response?.data?.detail || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    clearAuth()
    window.location.href = '/login'
  }

  const checkAuth = async () => {
    if (!token.value) return false
    try {
      const res = await axios.get(`${API_URL}/auth/me`)
      user.value = res.data
      return true
    } catch {
      clearAuth()
      return false
    }
  }

  return { user, token, loading, error, register, login, logout, checkAuth }
})