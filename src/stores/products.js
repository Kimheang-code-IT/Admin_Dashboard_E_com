import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCachedData, setCachedData } from '../utils/cache'
import productsData from '../data/products.json'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const lastFetch = ref(null)
  
  const CACHE_KEY = 'products'
  const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

  // Load products from cache or JSON file
  const loadProducts = async () => {
    if (loading.value) return
    
    loading.value = true
    
    try {
      // Try to get from cache first
      const cached = getCachedData(CACHE_KEY, localStorage)
      
      if (cached) {
        products.value = cached
        lastFetch.value = Date.now()
        loading.value = false
        return
      }
      
      // If not in cache, load from JSON and cache it
      products.value = productsData
      setCachedData(CACHE_KEY, productsData, localStorage, CACHE_TTL)
      lastFetch.value = Date.now()
    } catch (error) {
      console.error('Error loading products:', error)
      // Fallback to direct import
      products.value = productsData
    } finally {
      loading.value = false
    }
  }

  // Initialize on store creation - try sync first, then async
  const init = () => {
    if (products.value.length === 0) {
      // Try to get from cache synchronously first
      const cached = getCachedData(CACHE_KEY, localStorage)
      if (cached) {
        products.value = cached
        lastFetch.value = Date.now()
      } else {
        // Fallback to direct import immediately
        products.value = productsData
        // Then cache it async
        loadProducts()
      }
    }
  }
  
  // Auto-initialize on store creation
  init()

  // Computed properties
  const totalProducts = computed(() => products.value.length)
  
  const totalStockUnits = computed(() => {
    return products.value.reduce((sum, product) => sum + (product.inStock || 0), 0)
  })
  
  const lowStockItems = computed(() => {
    return products.value.filter(product => (product.inStock || 0) < 10)
  })
  
  const lowStockCount = computed(() => lowStockItems.value.length)
  
  const getProductById = (id) => {
    return products.value.find(p => p.id === id)
  }
  
  const getProductsByCategory = (category) => {
    return products.value.filter(p => p.category === category)
  }
  
  const searchProducts = (query) => {
    const lowerQuery = query.toLowerCase()
    return products.value.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.sku.toLowerCase().includes(lowerQuery) ||
      (p.category && p.category.toLowerCase().includes(lowerQuery))
    )
  }

  // Refresh products (clear cache and reload)
  const refreshProducts = async () => {
    const { clearCache } = await import('../utils/cache')
    clearCache(CACHE_KEY, localStorage)
    await loadProducts()
  }

  return {
    products,
    loading,
    lastFetch,
    totalProducts,
    totalStockUnits,
    lowStockItems,
    lowStockCount,
    loadProducts,
    init,
    getProductById,
    getProductsByCategory,
    searchProducts,
    refreshProducts
  }
})

