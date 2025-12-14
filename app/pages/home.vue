<template>
    <div>
        <vueper-slides autoplay :touchable="false">
            <vueper-slide
                v-for="(slide, i) in slides"
                :key="i"
                :image="slide.image"
            >
                <template #content>
                    <div class="slide-overlay"></div>
                    <div class="slide-content">
                        <h3 class="product-title">{{ slide.title }}</h3>
                        <p class="product-description">{{ slide.content }}</p>
                        <p class="product-price">{{ slide.price }}</p>
                       <div class="flex justify-center items-center gap-8">
                          <button 
                              class="add-to-cart-btn"
                              @click="addToCart(slide)"
                          >
                              Add to Cart
                          </button>
                          <button
                              class="save-to-cart-button"
                              @click="addToCart(slide)"
                          >
                            <FontAwesomeIcon :icon="faBookmark" size="2xl" />
                          </button>
                       </div>
                    </div>
                </template>
            </vueper-slide>
        </vueper-slides>
    </div>
</template>

<script setup>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'

definePageMeta({
  role: ['user']
})

const slides = [
   {
    id: 1,
    title: 'Iphone',
    content: '16 Pro',
    price: '$99.99',
    image: new URL('@/assets/img/iphone.jfif', import.meta.url).href
  },
  {
    id: 2,
    title: 'Egg Boiler',
    content: 'Exclusive Offer',
    price: '$149.99',
    image: new URL('@/assets/img/egg-boiler.webp', import.meta.url).href
  }
]

const addToCart = (product) => {
  console.log('Adding to cart:', product)
  // Add your cart logic here
}
</script>

<style scoped>
.vueperslide {
  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
}

.vueperslides__arrow .vueperslides__arrow--next {
  color: red !important;
} 

/* Blur effect on background */
.vueperslide::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: filter 0.3s ease;
  z-index: 1;
}

.vueperslide:hover::before {
  filter: blur(8px);
}

/* Overlay for better contrast */
.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.3s ease;
  z-index: 2;
}

.vueperslide:hover .slide-overlay {
  background-color: rgba(0, 0, 0, 0.3);
}

.slide-content {
  position: relative;
  z-index: 10;
  padding: 20px;
  text-align: center;
}

.product-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: olive;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
}

.product-description {
  font-size: 16px;
  margin-bottom: 10px;
  color: olive;
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
}

.product-price {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: olive;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
}

.add-to-cart-btn {
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  border: 2px solid white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
}

.save-to-cart-button {
  opacity: 0;
}

.vueperslide:hover .add-to-cart-btn, .vueperslide:hover .save-to-cart-button {
  opacity: 1;
  transform: translateY(0);
}

.add-to-cart-btn:hover {
  background-color: white;
  color: #E73C7E;
  transform: scale(1.05);
}
</style>