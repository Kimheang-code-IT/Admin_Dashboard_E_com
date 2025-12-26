import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCachedData, setCachedData } from '../utils/cache'
import taxData from '../data/tax.json'

export const useTaxStore = defineStore('tax', () => {
  const taxRates = ref([])
  const loading = ref(false)
  const lastFetch = ref(null)
  
  const CACHE_KEY = 'tax'
  const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

  // Load tax rates from cache or JSON file
  const loadTaxRates = async () => {
    if (loading.value) return
    
    loading.value = true
    
    try {
      // Try to get from cache first
      const cached = getCachedData(CACHE_KEY, localStorage)
      
      if (cached) {
        taxRates.value = cached
        lastFetch.value = Date.now()
        loading.value = false
        return
      }
      
      // If not in cache, load from JSON and cache it
      taxRates.value = taxData
      setCachedData(CACHE_KEY, taxData, localStorage, CACHE_TTL)
      lastFetch.value = Date.now()
    } catch (error) {
      console.error('Error loading tax rates:', error)
      // Fallback to direct import
      taxRates.value = taxData
    } finally {
      loading.value = false
    }
  }

  // Initialize on store creation - try sync first, then async
  const init = () => {
    if (taxRates.value.length === 0) {
      // Try to get from cache synchronously first
      const cached = getCachedData(CACHE_KEY, localStorage)
      if (cached) {
        taxRates.value = cached
        lastFetch.value = Date.now()
      } else {
        // Fallback to direct import immediately
        taxRates.value = taxData
        // Then cache it async
        loadTaxRates()
      }
    }
  }
  
  // Auto-initialize on store creation
  init()

  // Computed properties
  const totalTaxRates = computed(() => taxRates.value.length)
  
  // Get current tax rate based on today's date
  const currentTaxRate = computed(() => {
    if (taxRates.value.length === 0) return 0
    
    const today = new Date().toISOString().split('T')[0]
    
    // Find tax for today's date
    const todayTax = taxRates.value.find(tax => tax.date === today)
    if (todayTax) {
      return todayTax.rate
    }
    
    // If no tax for today, get the most recent tax rate
    const sorted = [...taxRates.value].sort((a, b) => new Date(b.date) - new Date(a.date))
    return sorted[0]?.rate || 0
  })
  
  const getTaxRateById = (id) => {
    return taxRates.value.find(t => t.id === id)
  }
  
  const getTaxRateByDate = (date) => {
    return taxRates.value.find(t => t.date === date)
  }
  
  const getTaxRateOnDate = (date) => {
    // Get the most recent tax rate on or before the given date
    const dateObj = new Date(date)
    const applicableRates = taxRates.value.filter(t => new Date(t.date) <= dateObj)
    
    if (applicableRates.length === 0) return 0
    
    const sorted = applicableRates.sort((a, b) => new Date(b.date) - new Date(a.date))
    return sorted[0]?.rate || 0
  }

  // Refresh tax rates (clear cache and reload)
  const refreshTaxRates = async () => {
    const { clearCache } = await import('../utils/cache')
    clearCache(CACHE_KEY, localStorage)
    await loadTaxRates()
  }

  return {
    taxRates,
    loading,
    lastFetch,
    totalTaxRates,
    currentTaxRate,
    loadTaxRates,
    init,
    getTaxRateById,
    getTaxRateByDate,
    getTaxRateOnDate,
    refreshTaxRates
  }
})

