import axios from 'axios'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
  const auth = useAuthStore()

  axios.interceptors.request.use((config) => {
  const auth = useAuthStore();

  if (auth.accessToken && !config.url.includes('/auth')) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }

  return config;
});

  axios.interceptors.response.use(
    res => res,
    async (error) => {

      const original = error.config

      // If Access Token Expired (401)
      if (error.response && error.response.status === 401 && !original._retry) {
        original._retry = true

        const newAccessToken = await auth.refreshAccessToken()
        if (newAccessToken) {
          original.headers.Authorization = `Bearer ${newAccessToken}`
          return axios(original)
        }
      }

      return Promise.reject(error)
    }
  )
})
