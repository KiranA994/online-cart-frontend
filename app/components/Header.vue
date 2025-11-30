 <template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="text-2xl font-bold text-blue-600">ShopHub</NuxtLink>
      
      <nav class="flex items-center gap-6">
        <NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink>
        <NuxtLink to="/products" class="hover:text-blue-600">Products</NuxtLink>
        
        <NuxtLink to="/cart" class="relative">
          <span class="hover:text-blue-600">Cart</span>
          <!-- <span v-if="cartStore.itemCount > 0" class="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {{ cartStore.itemCount }}
          </span> -->
        </NuxtLink>
        
        <div v-if="authStore.isAuthenticated">
          <button class="hover:text-blue-600" @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <NuxtLink to="/auth" class="hover:text-blue-600">Login</NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  authStore.loadFromStorage()
})

const handleLogout = () => {
  authStore.logout()
  router.push('/auth')
}
</script>