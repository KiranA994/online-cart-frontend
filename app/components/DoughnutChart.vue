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
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  type ChartConfiguration
} from 'chart.js'
// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  DoughnutController, 
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
)

// Props
interface Props {
  labels?: string[]
  data?: number[]
  backgroundColor?: string[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
    labels: () => {return ['Red', 'Blue', 'Yellow', 'Green', 'Purple']},
  data: () => {return [300, 50, 100, 80, 120]},
  backgroundColor: () => {return [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)'
  ]},
  title: 'Doughnut Chart',
})

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const createChart = () => {
  if (!chartCanvas.value) return

  const config: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: props.labels,
      datasets: [{
        data: props.data,
        backgroundColor: props.backgroundColor,
        hoverOffset: 4
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: 'rebeccapurple',
            font: {
              size: 20,
              family: 'Inter, sans-serif',
              weight: 'normal'
            },
            padding: 15,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        title: {
          display: true,
          text: props.title,
          color: 'purple',
          font: {
            size: 20,
            family: 'Inter, sans-serif',
            weight: 'normal'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13,
          },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a: number, b: number) => {return a + b}, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      },
    },
    plugins: [{
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        if (ctx) {
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'transparent';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      }
    }]
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