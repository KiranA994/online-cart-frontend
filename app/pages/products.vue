<template>
  <div class="p-6 space-y-10">

    <div class="max-w-md mx-auto">
      <input
        v-model="search"
        type="text"
        placeholder="Search products..."
        class="w-full p-3 border rounded-xl shadow-sm"
      />
    </div>

    <div
      v-for="(items, category) in groupedProducts"
      :key="category"
      class="border-b pb-8"
    >
      <!-- Category Title -->
      <h2 class="text-2xl font-bold mb-6 capitalize">{{ category }}</h2>

      <!-- Grid of products -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div
          v-for="prod in items"
          :key="prod.id"
          class="rounded-xl p-5 bg-white shadow hover:shadow-lg transition"
        >
          <div class="w-full h-48 mb-3 flex">
            <img
              :src="prod.image"
              :alt="prod.title"
              class="w-full h-full object-contain"
            />
            <FontAwesomeIcon
              :icon="isWishlisted(prod.id) ? faHeartSolid : faHeartRegular"
              :style="{ color: isWishlisted(prod.id) ? 'red' : '' }"
              size="xl"
              @click="toggleWish(prod.id)"
            />
          </div>

          <p class="font-semibold text-lg mb-1 font-inter">{{ prod.title.slice(0, 25) }}</p>
          <p class="text-gray-600 mb-1 font-inter">{{ prod.description.slice(0, 50) }}...</p>

          <p class="font-bold text-green-700 text-lg mb-1 font-inter">
            ${{ prod.price }}
          </p>

          <p class="text-sm text-gray-700 font-inter">
            ⭐ {{ prod.rating.rate }} ({{ prod.rating.count }} reviews)
          </p>

         <div class="flex justify-end items-center"> 
          <button class="p-2 bg-green-500 rounded-lg text-white font-inter text-sm hover:bg-white hover:text-green-500" @click="addToCartCheckout(prod)">Add to Cart</button>
        </div>
        </div>

      </div>
    </div>
     
  </div>

</template>

<script setup>
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { ref, onMounted, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useCartStore } from '~/stores/cart'

const products = ref([]);
const cartStore = useCartStore()
const wishlist = ref([]);
const toast = useToast()

const addToCartCheckout = (product) => {
    cartStore.addToCart(product)
}

onMounted(async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  products.value = await response.json();
});

// GROUP PRODUCTS BY CATEGORY
const groupedProducts = computed(() => {
  const groups = {};

  products.value.forEach((prod) => {
    if (!groups[prod.category]) {
      groups[prod.category] = [];
    }
    groups[prod.category].push(prod);
  });

  return groups;
});

const toggleWish = (id) => {
  if (wishlist.value.includes(id)) {
    wishlist.value = wishlist.value.filter(w => {return w !== id});
    toast.info({ message: 'Item removed from wish list', timeout: 3000, position: 'topCenter' })
  } else {
    wishlist.value.push(id);
    toast.success({ message: 'Item added to wish list', timeout: 2000, position: 'topCenter'   })
  }
};

const isWishlisted = (id) => {return wishlist.value.includes(id)};
</script>

<style scoped>
</style>