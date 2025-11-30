import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()

  // Load tokens/user from localStorage on first load
  await auth.loadFromStorage()

  const publicPages = ['/auth']

  // Allow public pages
  if (publicPages.includes(to.path)) return

  // Not logged in → redirect
  if (!auth.accessToken) {
    return navigateTo('/auth')
  }

  // If user not loaded yet → fetch profile
  if (!auth.user) {
    try {
      await auth.fetchUser()
    } catch (e) {
      // token invalid → logout & redirect
      auth.logout()
      return navigateTo('/auth')
    }
  }

  // Role-based access
  if (to.meta.role && !to.meta.role.includes(auth.user.role)) {
    return navigateTo('/forbidden')
  }
})
