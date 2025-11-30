<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  type ChartConfiguration
} from 'chart.js'
// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
)

// Props
interface Props {
  labels?: string[]
  datasets?: Array<{
    label: string
    data: number[]
    borderColor?: string
    backgroundColor?: string
    tension?: number
  }>
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  labels: () => {return ['January', 'February', 'March', 'April', 'May', 'June']},
  datasets: () => {return [
    {
      label: 'Sales 2024',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1
    }
  ]},
  title: 'Line Chart'
})

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const createChart = () => {
  if (!chartCanvas.value) return

  const config: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: props.labels,
      datasets: props.datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
          // This more specific font property overrides the global property
          font: {
            size: 16,
            family: 'Inter,sans-serif',
          },
          color: 'navyblue',
          usePointStyle: true,
          }
        },
        title: {
          display: true,
          text: props.title,
          color: 'purple',
          font: {
            size: 16,
            family: 'Inter,sans-serif'
          }
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'blue' // X-axis label color
          },
          grid: {
            color: 'gray' // X-axis grid lines
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: 'blue' // Y-axis label color
          },
          grid: {
            color: 'gray' // Y-axis grid lines
          }
        }
      }
    }
  }

  chartInstance = new Chart(chartCanvas.value, config)
}

const destroyChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
}

// Watch for prop changes and update chart
watch(() => {return [props.labels, props.datasets, props.title]}, () => {
  destroyChart()
  createChart()
}, { deep: true })

onMounted(() => {
  createChart()
})

onBeforeUnmount(() => {
  destroyChart()
})
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 400px; /* Set explicit height when maintainAspectRatio is false */
  max-width: 800px;
  margin: 0 auto;
}
</style>