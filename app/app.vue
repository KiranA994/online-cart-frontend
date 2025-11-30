<template>
     <Header v-if="authStore.isAuthenticated" />
     <NuxtPage />
</template>


<script setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore()

onMounted(() => {
  authStore.loadFromStorage()
})

</script>