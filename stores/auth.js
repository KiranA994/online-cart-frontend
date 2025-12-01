import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    user: null,   // includes role
  }),

  actions: {
    async register(data) {
      await axios.post('http://localhost:5000/api/auth/register', {...data,role: 'user'});
    },

    async login(payload) {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', payload);
      
      this.accessToken = data.accessToken
      this.refreshToken = data.refreshToken

      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('refreshToken', this.refreshToken)

      await this.fetchUser()
    },

    async fetchUser() {
      const { data } = await axios.get('http://localhost:5000/user/profile', {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })

      this.user = data
    },

    async refreshAccessToken() {
      try {
        const { data } = await axios.post('http://localhost:5000/api/auth/refresh', {
          token: this.refreshToken
        })

        this.accessToken = data.accessToken
        this.refreshToken = data.refreshToken

        localStorage.setItem('accessToken', this.accessToken)
        localStorage.setItem('refreshToken', this.refreshToken)

        return data.accessToken
      } catch (err) {
        this.logout()
        return null
      }
    },

    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null

      localStorage.clear()
      navigateTo('/auth')
    },

    loadFromStorage() {
      if (!import.meta.client) return
      this.accessToken = localStorage.getItem('accessToken')
      this.refreshToken = localStorage.getItem('refreshToken')
    },

    getters: {
      isAuthenticated: (state) => !!state.token,
      isAdmin: (state) => state.user?.role === 'admin'
    }
    
  }
})
