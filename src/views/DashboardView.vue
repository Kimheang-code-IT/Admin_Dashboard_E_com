<template>
  <div :class="['mx-auto transition-all duration-300', isSidebarCollapsed ? 'max-w-full px-2' : 'max-w-7xl']">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
      <!-- Total Sales Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">{{ t('totalSales') }}</h3>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">${{ totalSales.toLocaleString('en-US', {
              minimumFractionDigits: 2, maximumFractionDigits: 2
            }) }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Orders Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">{{ t('totalOrders') }}</h3>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ totalOrders.toLocaleString() }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Products Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">{{ t('totalProducts') }}</h3>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ totalProducts.toLocaleString() }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Users Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">{{ t('totalUsers') }}</h3>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ totalUsers.toLocaleString() }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-2">
      <!-- Left: Line Chart -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ t('salesOverview') }}</h3>
        <div class="h-[460px]">
          <Line :data="lineChartData" :options="lineChartOptions" />
        </div>
      </div>

      <!-- Right: Radar Chart and Pie Chart -->
      <div class="lg:col-span-1 space-y-3">
        <!-- Radar Chart 1 -->
        <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ t('performanceMetrics') }}</h3>
          <div class="h-[200px]">
            <Radar :data="radarChart1Data" :options="radarChartOptions" />
          </div>
        </div>

        <!-- Pie Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ t('productCategories') }}</h3>
          <div class="h-[200px]">
            <Pie :data="pieChartData" :options="pieChartOptions" />
          </div>
        </div>
      </div>
    </div>

    <!-- Province Orders Bar Chart -->
    <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ t('ordersByProvince') }}</h3>
      <div class="h-[400px]">
        <Bar :data="provinceBarChartData" :options="provinceBarChartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'

// Use Pinia stores
import { useUIStore } from '../stores/ui'
import { useSalesStore } from '../stores/sales'
import { useProductsStore } from '../stores/products'
import { useUsersStore } from '../stores/users'
import { useCategoriesStore } from '../stores/categories'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
} from 'chart.js'
import { Line, Radar, Pie, Bar } from 'vue-chartjs'

const uiStore = useUIStore()
const salesStore = useSalesStore()
const productsStore = useProductsStore()
const usersStore = useUsersStore()
const categoriesStore = useCategoriesStore()

const isSidebarCollapsed = computed(() => uiStore.isSidebarCollapsed)
const isDarkMode = computed(() => uiStore.isDarkMode)
const { t } = useI18n()

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
)

// Initialize stores on mount
onMounted(() => {
  salesStore.init()
  productsStore.init()
  usersStore.init()
  categoriesStore.init()
})

// Computed values from stores
const totalSales = computed(() => salesStore.totalSales)
const totalOrders = computed(() => salesStore.totalOrders)
const totalProducts = computed(() => productsStore.totalProducts)
const totalUsers = computed(() => usersStore.totalUsers)

// Process sales data for line chart (group by month)
const monthlyData = computed(() => {
  const data = {
    'Jan': { sales: 0, orders: 0 },
    'Feb': { sales: 0, orders: 0 },
    'Mar': { sales: 0, orders: 0 },
    'Apr': { sales: 0, orders: 0 },
    'May': { sales: 0, orders: 0 },
    'Jun': { sales: 0, orders: 0 },
    'Jul': { sales: 0, orders: 0 },
    'Aug': { sales: 0, orders: 0 },
    'Sep': { sales: 0, orders: 0 },
    'Oct': { sales: 0, orders: 0 },
    'Nov': { sales: 0, orders: 0 },
    'Dec': { sales: 0, orders: 0 }
  }

  const sales = salesStore.sales || []
  if (sales.length === 0) {
    return data
  }
  
  sales.forEach(sale => {
    if (!sale || !sale.date) return
    
    // Parse date (format: "8/16/2024")
    const [month, day, year] = sale.date.split('/')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthName = monthNames[parseInt(month) - 1]

    if (monthName && data[monthName]) {
      data[monthName].sales += sale.total || 0
      data[monthName].orders += 1
    }
  })

  return data
})
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Line Chart Data
const lineChartData = computed(() => ({
  labels: monthLabels.map(month => t(month.toLowerCase())),
  datasets: [
    {
      label: t('sales'),
      data: monthLabels.map(month => monthlyData.value[month].sales),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true
    },
    {
      label: t('orders'),
      data: monthLabels.map(month => monthlyData.value[month].orders),
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
}))

const lineChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: isDarkMode.value ? '#d1d5db' : '#374151'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: isDarkMode.value ? '#d1d5db' : '#374151'
      },
      grid: {
        color: isDarkMode.value ? '#374151' : '#e5e7eb'
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: isDarkMode.value ? '#d1d5db' : '#374151'
      },
      grid: {
        color: isDarkMode.value ? '#374151' : '#e5e7eb'
      }
    }
  }
}))

// Calculate performance metrics (normalized to 0-100 scale)
const performanceMetrics = computed(() => {
  const monthly = monthlyData.value
  const maxSales = Math.max(...Object.values(monthly).map(m => m.sales), 1)
  const maxOrders = Math.max(...Object.values(monthly).map(m => m.orders), 1)
  const maxProducts = totalProducts.value || 1
  const maxUsers = totalUsers.value || 1

  // Get current month (August) data
  const currentMonthSales = monthly['Aug']?.sales || 0
  const currentMonthOrders = monthly['Aug']?.orders || 0

  return {
    sales: Math.min(100, (currentMonthSales / maxSales) * 100),
    orders: Math.min(100, (currentMonthOrders / maxOrders) * 100),
    products: Math.min(100, (totalProducts.value / maxProducts) * 100),
    users: Math.min(100, (totalUsers.value / maxUsers) * 100),
    revenue: Math.min(100, (currentMonthSales / maxSales) * 100),
    growth: 75 // Placeholder for growth calculation
  }
})

// Radar Chart 1 Data
const radarChart1Data = computed(() => ({
  labels: [t('sales'), t('orders'), t('products'), t('users'), t('revenue'), t('growth')],
  datasets: [
    {
      label: t('currentMonth'),
      data: [
        Math.round(performanceMetrics.value.sales),
        Math.round(performanceMetrics.value.orders),
        Math.round(performanceMetrics.value.products),
        Math.round(performanceMetrics.value.users),
        Math.round(performanceMetrics.value.revenue),
        Math.round(performanceMetrics.value.growth)
      ],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      pointBackgroundColor: 'rgb(59, 130, 246)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(59, 130, 246)'
    }
  ]
}))

const radarChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        color: isDarkMode.value ? '#d1d5db' : '#374151'
      },
      grid: {
        color: isDarkMode.value ? '#374151' : '#e5e7eb'
      },
      pointLabels: {
        color: isDarkMode.value ? '#d1d5db' : '#374151'
      }
    }
  }
}))

// Process category data for pie chart
const categoryCounts = computed(() => {
  const counts = {}
  productsStore.products.forEach(product => {
    if (counts[product.category]) {
      counts[product.category]++
    } else {
      counts[product.category] = 1
    }
  })
  return counts
})

const categoryLabels = computed(() => Object.keys(categoryCounts.value))
const categoryValues = computed(() => Object.values(categoryCounts.value))

// Color palette for categories
const getCategoryColors = (count) => {
  const colors = [
    'rgb(59, 130, 246)',   // blue
    'rgb(16, 185, 129)',   // green
    'rgb(251, 191, 36)',   // yellow
    'rgb(139, 92, 246)',   // purple
    'rgb(239, 68, 68)',    // red
    'rgb(236, 72, 153)',   // pink
    'rgb(6, 182, 212)',    // cyan
    'rgb(132, 204, 22)',   // lime
    'rgb(249, 115, 22)',   // orange
    'rgb(99, 102, 241)'    // indigo
  ]

  return {
    backgroundColor: colors.slice(0, count),
    borderColor: colors.slice(0, count)
  }
}

// Pie Chart Data
const pieChartData = computed(() => {
  const categoryColors = getCategoryColors(categoryLabels.value.length)
  return {
    labels: categoryLabels.value,
  datasets: [
    {
        data: categoryValues.value,
      backgroundColor: categoryColors.backgroundColor,
      borderColor: categoryColors.borderColor,
      borderWidth: 2
    }
  ]
  }
})

const pieChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: isDarkMode.value ? '#d1d5db' : '#374151'
      }
    }
  }
}))

// Process province data for bar chart
const provinceData = computed(() => {
  const provinceCounts = {}
  const sales = salesStore.sales || []

  sales.forEach(sale => {
    if (!sale) return
    const province = sale.province || t('unknown')
    if (provinceCounts[province]) {
      provinceCounts[province]++
    } else {
      provinceCounts[province] = 1
    }
  })

  // Sort by count (descending) and get top provinces
  const sorted = Object.entries(provinceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10) // Top 10 provinces

  return {
    labels: sorted.map(([province]) => province),
    data: sorted.map(([, count]) => count)
  }
})

// Color palette for provinces (25 different colors)
const getProvinceColors = (count) => {
  const colors = [
    'rgba(59, 130, 246, 0.8)',   // blue
    'rgba(16, 185, 129, 0.8)',   // green
    'rgba(251, 191, 36, 0.8)',   // yellow
    'rgba(139, 92, 246, 0.8)',   // purple
    'rgba(239, 68, 68, 0.8)',    // red
    'rgba(236, 72, 153, 0.8)',   // pink
    'rgba(6, 182, 212, 0.8)',    // cyan
    'rgba(132, 204, 22, 0.8)',   // lime
    'rgba(249, 115, 22, 0.8)',   // orange
    'rgba(99, 102, 241, 0.8)',   // indigo
    'rgba(34, 197, 94, 0.8)',    // emerald
    'rgba(168, 85, 247, 0.8)',   // violet
    'rgba(20, 184, 166, 0.8)',   // teal
    'rgba(245, 158, 11, 0.8)',   // amber
    'rgba(220, 38, 127, 0.8)',   // fuchsia
    'rgba(14, 165, 233, 0.8)',   // sky
    'rgba(74, 222, 128, 0.8)',   // emerald light
    'rgba(251, 146, 60, 0.8)',   // orange light
    'rgba(147, 51, 234, 0.8)',   // purple dark
    'rgba(59, 130, 246, 0.8)',   // blue light
    'rgba(34, 211, 238, 0.8)',   // cyan light
    'rgba(251, 191, 36, 0.8)',   // yellow light
    'rgba(244, 63, 94, 0.8)',    // rose
    'rgba(79, 70, 229, 0.8)',    // indigo dark
    'rgba(16, 185, 129, 0.8)'    // green light
  ]

  const borderColors = [
    'rgb(59, 130, 246)',   // blue
    'rgb(16, 185, 129)',   // green
    'rgb(251, 191, 36)',   // yellow
    'rgb(139, 92, 246)',   // purple
    'rgb(239, 68, 68)',    // red
    'rgb(236, 72, 153)',   // pink
    'rgb(6, 182, 212)',    // cyan
    'rgb(132, 204, 22)',   // lime
    'rgb(249, 115, 22)',   // orange
    'rgb(99, 102, 241)',   // indigo
    'rgb(34, 197, 94)',    // emerald
    'rgb(168, 85, 247)',   // violet
    'rgb(20, 184, 166)',   // teal
    'rgb(245, 158, 11)',   // amber
    'rgb(220, 38, 127)',   // fuchsia
    'rgb(14, 165, 233)',   // sky
    'rgb(74, 222, 128)',   // emerald light
    'rgb(251, 146, 60)',   // orange light
    'rgb(147, 51, 234)',   // purple dark
    'rgb(59, 130, 246)',   // blue light
    'rgb(34, 211, 238)',   // cyan light
    'rgb(251, 191, 36)',   // yellow light
    'rgb(244, 63, 94)',    // rose
    'rgb(79, 70, 229)',    // indigo dark
    'rgb(16, 185, 129)'    // green light
  ]

  // If we need more than 25 colors, cycle through the palette
  const getColor = (index, colorArray) => {
    return colorArray[index % colorArray.length]
  }

  return {
    backgroundColor: Array.from({ length: count }, (_, i) => getColor(i, colors)),
    borderColor: Array.from({ length: count }, (_, i) => getColor(i, borderColors))
  }
}

const provinceColors = computed(() => getProvinceColors(provinceData.value.labels.length))

// Province Bar Chart Data
const provinceBarChartData = computed(() => {
  const colors = provinceColors.value
  return {
    labels: provinceData.value.labels,
  datasets: [
    {
      label: t('orders'),
        data: provinceData.value.data,
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
      borderWidth: 1
    }
  ]
  }
})

const provinceBarChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${t('orders')}: ${context.parsed.y}`
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: isDarkMode.value ? '#d1d5db' : '#374151'
      },
      grid: {
        color: isDarkMode.value ? '#374151' : '#e5e7eb'
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: isDarkMode.value ? '#d1d5db' : '#374151',
        stepSize: 1
      },
      grid: {
        color: isDarkMode.value ? '#374151' : '#e5e7eb'
      }
    }
  }
}))
</script>
