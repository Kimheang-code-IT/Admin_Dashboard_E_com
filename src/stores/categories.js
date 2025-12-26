import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCachedData, setCachedData } from '../utils/cache'
import categoriesData from '../data/categories.json'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([])
  const loading = ref(false)
  const lastFetch = ref(null)
  
  const CACHE_KEY = 'categories'
  const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

  // Load categories from cache or JSON file
  const loadCategories = async () => {
    if (loading.value) return
    
    loading.value = true
    
    try {
      // Try to get from cache first
      const cached = getCachedData(CACHE_KEY, localStorage)
      
      if (cached) {
        categories.value = cached
        lastFetch.value = Date.now()
        loading.value = false
        return
      }
      
      // If not in cache, load from JSON and cache it
      categories.value = categoriesData
      setCachedData(CACHE_KEY, categoriesData, localStorage, CACHE_TTL)
      lastFetch.value = Date.now()
    } catch (error) {
      console.error('Error loading categories:', error)
      // Fallback to direct import
      categories.value = categoriesData
    } finally {
      loading.value = false
    }
  }

  // Initialize on store creation - try sync first, then async
  const init = () => {
    if (categories.value.length === 0) {
      // Try to get from cache synchronously first
      const cached = getCachedData(CACHE_KEY, localStorage)
      if (cached) {
        categories.value = cached
        lastFetch.value = Date.now()
      } else {
        // Fallback to direct import immediately
        categories.value = categoriesData
        // Then cache it async
        loadCategories()
      }
    }
  }
  
  // Auto-initialize on store creation
  init()

  // Computed properties
  const totalCategories = computed(() => categories.value.length)
  
  const getCategoryById = (id) => {
    return categories.value.find(c => c.id === id)
  }
  
  const getCategoryByName = (name) => {
    return categories.value.find(c => c.name === name)
  }
  
  const searchCategories = (query) => {
    const lowerQuery = query.toLowerCase()
    return categories.value.filter(c =>
      c.name.toLowerCase().includes(lowerQuery) ||
      (c.description && c.description.toLowerCase().includes(lowerQuery))
    )
  }

  // Refresh categories (clear cache and reload)
  const refreshCategories = async () => {
    const { clearCache } = await import('../utils/cache')
    clearCache(CACHE_KEY, localStorage)
    await loadCategories()
  }

  // Add category
  const addCategory = (category) => {
    categories.value.push(category)
    setCachedData(CACHE_KEY, categories.value, localStorage, CACHE_TTL)
  }

  // Update category
  const updateCategory = (updatedCategory) => {
    const index = categories.value.findIndex(c => c.id === updatedCategory.id)
    if (index !== -1) {
      categories.value[index] = updatedCategory
      setCachedData(CACHE_KEY, categories.value, localStorage, CACHE_TTL)
    }
  }

  // Delete category
  const deleteCategory = (id) => {
    categories.value = categories.value.filter(c => c.id !== id)
    setCachedData(CACHE_KEY, categories.value, localStorage, CACHE_TTL)
  }

  return {
    categories,
    loading,
    lastFetch,
    totalCategories,
    loadCategories,
    init,
    getCategoryById,
    getCategoryByName,
    searchCategories,
    refreshCategories,
    addCategory,
    updateCategory,
    deleteCategory
  }
})

