import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCachedData, setCachedData } from '../utils/cache'
import salesData from '../data/sales.json'

export const useSalesStore = defineStore('sales', () => {
  const sales = ref([])
  const loading = ref(false)
  const lastFetch = ref(null)
  
  const CACHE_KEY = 'sales'
  const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

  // Load sales from cache or JSON file
  const loadSales = async () => {
    if (loading.value) return
    
    loading.value = true
    
    try {
      // Try to get from cache first
      const cached = getCachedData(CACHE_KEY, localStorage)
      
      if (cached) {
        sales.value = cached
        lastFetch.value = Date.now()
        loading.value = false
        return
      }
      
      // If not in cache, load from JSON and cache it
      sales.value = salesData
      setCachedData(CACHE_KEY, salesData, localStorage, CACHE_TTL)
      lastFetch.value = Date.now()
    } catch (error) {
      console.error('Error loading sales:', error)
      // Fallback to direct import
      sales.value = salesData
    } finally {
      loading.value = false
    }
  }

  // Initialize on store creation - try sync first, then async
  const init = () => {
    if (sales.value.length === 0) {
      // Try to get from cache synchronously first
      const cached = getCachedData(CACHE_KEY, localStorage)
      if (cached) {
        sales.value = cached
        lastFetch.value = Date.now()
      } else {
        // Fallback to direct import immediately
        sales.value = salesData
        // Then cache it async
        loadSales()
      }
    }
  }
  
  // Auto-initialize on store creation
  init()

  // Computed properties
  const totalSales = computed(() => {
    return sales.value.reduce((sum, sale) => sum + (sale.total || 0), 0)
  })
  
  const totalOrders = computed(() => sales.value.length)
  
  const getSaleById = (id) => {
    return sales.value.find(s => s.id === id)
  }
  
  const getSalesByDate = (date) => {
    return sales.value.filter(s => s.date === date)
  }
  
  const getSalesByDateRange = (startDate, endDate) => {
    return sales.value.filter(sale => {
      const saleDate = new Date(sale.date)
      return saleDate >= new Date(startDate) && saleDate <= new Date(endDate)
    })
  }

  // Process sales by month for charts
  const processSalesByMonth = () => {
    const monthlyData = {
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

    sales.value.forEach(sale => {
      // Parse date (format: "8/16/2024")
      const [month, day, year] = sale.date.split('/')
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const monthName = monthNames[parseInt(month) - 1]

      if (monthlyData[monthName]) {
        monthlyData[monthName].sales += sale.total || 0
        monthlyData[monthName].orders += 1
      }
    })

    return monthlyData
  }

  // Refresh sales (clear cache and reload)
  const refreshSales = async () => {
    const { clearCache } = await import('../utils/cache')
    clearCache(CACHE_KEY, localStorage)
    await loadSales()
  }

  return {
    sales,
    loading,
    lastFetch,
    totalSales,
    totalOrders,
    loadSales,
    init,
    getSaleById,
    getSalesByDate,
    getSalesByDateRange,
    processSalesByMonth,
    refreshSales
  }
})

