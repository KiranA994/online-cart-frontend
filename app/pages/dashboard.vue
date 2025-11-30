<template>
    <div class="page-wrapper p-4">
        <h2 class="text-[#000] text-2xl font-inter font-medium">Dashboard</h2>
        <p class="text-slate-600">Welcome back! Here's your store overview</p>
        <div class="flex flex-wrap gap-6 mt-4">
            <button
              v-for="option in options"
              :key="option"
              class="px-4 py-2 border border-solid rounded-xl transition-all duration-200"
              :class="active === option 
                ? 'bg-blue-600 text-white' 
                : 'bg-[#FFFFF] text-black border-none'"
              @click="active = option"
            >
              {{ option }}
            </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-6">

          <div class="rounded-xl p-4 border hover:shadow-[0_0_11px_rgba(33,33,33,0.2)]">
            <div class="flex justify-between">
              <div class="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <img :src="dollar" alt="">
              </div>
              <p class="text-green-900 font-inter text-base">+15.3%</p>
            </div>
            <p class="text-base text-slate-600 font-inter mt-2">Total Revenue</p>
            <p class="font-inter font-bold text-xl mt-2">$45,231</p>
          </div>

          <div class="rounded-xl p-3 border hover:shadow-[0_0_11px_rgba(33,33,33,0.2)]">
            <div class="flex justify-between">
              <div class="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <img :src="cart" alt="">
              </div>
              <p class="text-green-900 font-inter text-base">+15.3%</p>
            </div>
            <p class="text-base text-slate-600 font-inter mt-2">Orders</p>
            <p class="font-inter font-bold text-xl mt-2">1,235</p>
          </div>

          <div class="rounded-xl p-3 border hover:shadow-[0_0_11px_rgba(33,33,33,0.2)]">
            <div class="flex justify-between">
              <div class="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white">
                <img :src="users" alt="">
              </div>
              <p class="text-green-900 font-inter text-base">+15.3%</p>
            </div>
            <p class="text-base text-slate-600 font-inter mt-2">Customers</p>
            <p class="font-inter font-bold text-xl mt-2">8,542</p>
          </div>

          <div class="rounded-xl p-3 border hover:shadow-[0_0_11px_rgba(33,33,33,0.2)]">
            <div class="flex justify-between">
              <div class="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white">
                <img :src="market" alt="">
              </div>
              <p class="text-green-900 font-inter text-base">+15.3%</p>
            </div>
            <p class="text-base text-slate-800 font-inter mt-2">Avg Order Value</p>
            <p class="font-inter font-bold text-xl mt-2">$36.65</p>
          </div>

        </div>

         <div class="page-container">

           <div class="rounded-xl p-3 border">
              <ClientOnly>

                <!-- Custom data example -->
                <LineChart
                  :labels="customLabels"
                  :datasets="customDatasets"
                  title="Sales Overview"
                />

              </ClientOnly>
           </div>


           <div class="rounded-xl p-3 border mt-6">
              <ClientOnly>

                <DoughnutChart
                  :labels="doughnutLabels"
                  :data="doughnutData"
                  :background-color="doughnutColors"
                  title="Sales by Category"
                />
                
              </ClientOnly>
           </div>

           <div class="rounded-xl p-6 border my-6">
            <h2 class="text-xl font-bold font-inter">Top Products</h2>
            <div v-for="(prod,index) in topProducts" :key="index" class="flex justify-between my-6 max-[640px]:flex-col max-[640px]:items-center">
              <div class="flex gap-4 items-center max-[640px]:gap-7">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-center">
                  <p class="text-white font-inter font-medium">{{ index + 1 }}</p>
                </div>
                <div class="flex flex-col">
                  <p class="font-inter font-bold text-xl">{{ prod.product }}</p>
                  <p>{{prod.salesCount}} sales</p>
                </div>
              </div>
              <div class="flex flex-col">
                <p class="font-inter font-bold text-lg">{{ prod.amount }}</p>
                <p class="font-inter text-green-800 text-md">{{ prod.profit }}</p>
              </div>
            </div>
           </div>

        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import dollar from '@/assets/icons/dollar.svg';
import cart from '@/assets/icons/cart.svg';
import users from '@/assets/icons/users.svg';
import market from '@/assets/icons/market.svg';
import LineChart from '@/app/components/LineChart.vue'

const options = ["Today", "Week", "Month", "Year"];

const topProducts = ref([
  { product: 'Wireless Earbuds Pro', salesCount: '324', amount: '$32,400', profit: '+12%' },
  { product: 'Smart Watch Series 5', salesCount: '289', amount: '$86,700', profit: '+8%' },
  { product: 'Designer Sneakers', salesCount: '256', amount: '$25,600', profit: '+15%' },
  { product: 'Laptop Stand', salesCount: '198', amount: '$9,900', profit: '+5%' },
])
const active = ref("Today");
const customLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const customDatasets = [
  {
    label: 'Website Visitors',
    data: [120, 150, 180, 170, 200, 220, 190],
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
  },
  {
    label: 'Sales',
    data: [80, 90, 100, 95, 110, 130, 115],
    borderColor: 'rgb(54, 162, 235)',
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
  }
]

const doughnutLabels = ['Electronics', 'Fashion', 'Home', 'Sports']
const doughnutData = [450, 320, 280, 150]
const doughnutColors = [
  'rgba(255, 99, 132, 0.8)',
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)'
]
</script>

<style scoped>
.page-wrapper {
  background: linear-gradient(360deg, pink, violet);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}

.page-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

</style>