<template>
  <div class="max-w-6xl mx-auto p-6">

    <!-- Title -->
    <h1 class="text-3xl font-semibold mb-6">Shopping Cart</h1>

    <!-- Empty Cart Message -->
    <div v-if="cartStore.items.length === 0" class="text-center py-16">
      <p class="text-xl text-gray-500 mb-4">Your cart is empty</p>
      <NuxtLink 
        to="/" 
        class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Continue Shopping
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">

      <!-- Cart Items -->
      <div class="md:col-span-2 space-y-4">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
        >
          <!-- Product -->
          <div class="flex items-center gap-4">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-20 h-20 object-cover rounded-lg border"
            />

            <div>
              <h2 class="text-lg font-medium">{{ item.title }}</h2>
              <p class="text-gray-500 text-sm">₹{{ item.price }}</p>
              <p class="text-xs text-gray-400 capitalize">{{ item.category }}</p>
            </div>
          </div>

          <!-- Quantity -->
          <div class="flex items-center gap-2">
            <button
              class="w-8 h-8 border rounded flex justify-center items-center hover:bg-gray-100 transition"
              @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
            >
              -
            </button>

            <span class="w-8 text-center">{{ item.quantity }}</span>

            <button
              class="w-8 h-8 border rounded flex justify-center items-center hover:bg-gray-100 transition"
              @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
            >
              +
            </button>
          </div>

          <!-- Total Price -->
          <p class="font-semibold w-20 text-right">₹{{ (item.price * item.quantity).toFixed(2) }}</p>

          <!-- Remove -->
          <button
            class="text-red-500 hover:underline text-sm"
            @click="cartStore.removeFromCart(item.id)"
          >
            Remove
          </button>
        </div>
      </div>

      <!-- Summary -->
      <div class="p-5 border rounded-lg bg-white shadow-sm h-fit">
        <h2 class="text-xl font-semibold mb-4">Order Summary</h2>

        <!-- Subtotal -->
        <div class="flex justify-between mb-2">
          <span>Subtotal</span>
          <span class="font-medium">₹{{ cartStore.cartTotal }}</span>
        </div>

        <!-- Shipping -->
        <div class="flex justify-between mb-4">
          <span>Shipping</span>
          <span class="font-medium">₹49</span>
        </div>

        <hr class="my-3" />

        <!-- Total -->
        <div class="flex justify-between text-lg font-semibold mb-4">
          <span>Total</span>
          <span>₹{{ (parseFloat(cartStore.cartTotal) + 49).toFixed(2) }}</span>
        </div>

        <button
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </button>

        <button
          class="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
          @click="cartStore.clearCart"
        >
          Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>