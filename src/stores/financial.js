import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCachedData, setCachedData } from '../utils/cache'
import financialData from '../data/financial.json'

export const useFinancialStore = defineStore('financial', () => {
  const records = ref([])
  const loading = ref(false)
  const lastFetch = ref(null)
  
  const CACHE_KEY = 'financial'
  const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

  // Load financial records from cache or JSON file
  const loadFinancialRecords = async () => {
    if (loading.value) return
    
    loading.value = true
    
    try {
      // Try to get from cache first
      const cached = getCachedData(CACHE_KEY, localStorage)
      
      if (cached) {
        records.value = cached
        lastFetch.value = Date.now()
        loading.value = false
        return
      }
      
      // If not in cache, load from JSON and cache it
      records.value = financialData
      setCachedData(CACHE_KEY, financialData, localStorage, CACHE_TTL)
      lastFetch.value = Date.now()
    } catch (error) {
      console.error('Error loading financial records:', error)
      // Fallback to direct import
      records.value = financialData
    } finally {
      loading.value = false
    }
  }

  // Initialize on store creation - try sync first, then async
  const init = () => {
    if (records.value.length === 0) {
      // Try to get from cache synchronously first
      const cached = getCachedData(CACHE_KEY, localStorage)
      if (cached) {
        records.value = cached
        lastFetch.value = Date.now()
      } else {
        // Fallback to direct import immediately
        records.value = financialData
        // Then cache it async
        loadFinancialRecords()
      }
    }
  }
  
  // Auto-initialize on store creation
  init()

  // Computed properties
  const totalRecords = computed(() => records.value.length)
  
  const totalIncome = computed(() => {
    return records.value
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + (r.amount || 0), 0)
  })
  
  const totalExpenses = computed(() => {
    return records.value
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + (r.amount || 0), 0)
  })
  
  const netProfit = computed(() => {
    return totalIncome.value - totalExpenses.value
  })
  
  const getRecordById = (id) => {
    return records.value.find(r => r.id === id)
  }
  
  const getRecordsByType = (type) => {
    return records.value.filter(r => r.type === type)
  }
  
  const getRecordsByDate = (date) => {
    return records.value.filter(r => r.date === date)
  }
  
  const getRecordsByDateRange = (startDate, endDate) => {
    return records.value.filter(record => {
      const recordDate = new Date(record.date)
      return recordDate >= new Date(startDate) && recordDate <= new Date(endDate)
    })
  }
  
  const searchRecords = (query) => {
    const lowerQuery = query.toLowerCase()
    return records.value.filter(r =>
      (r.category && r.category.toLowerCase().includes(lowerQuery)) ||
      (r.description && r.description.toLowerCase().includes(lowerQuery))
    )
  }

  // Refresh financial records (clear cache and reload)
  const refreshFinancialRecords = async () => {
    const { clearCache } = await import('../utils/cache')
    clearCache(CACHE_KEY, localStorage)
    await loadFinancialRecords()
  }

  return {
    records,
    loading,
    lastFetch,
    totalRecords,
    totalIncome,
    totalExpenses,
    netProfit,
    loadFinancialRecords,
    init,
    getRecordById,
    getRecordsByType,
    getRecordsByDate,
    getRecordsByDateRange,
    searchRecords,
    refreshFinancialRecords
  }
})

