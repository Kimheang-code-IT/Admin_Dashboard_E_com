import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCachedData, setCachedData } from '../utils/cache'
import usersData from '../data/users.json'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const loading = ref(false)
  const lastFetch = ref(null)
  
  const CACHE_KEY = 'users'
  const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

  // Load users from cache or JSON file
  const loadUsers = async () => {
    if (loading.value) return
    
    loading.value = true
    
    try {
      // Try to get from cache first
      const cached = getCachedData(CACHE_KEY, localStorage)
      
      if (cached) {
        users.value = cached
        lastFetch.value = Date.now()
        loading.value = false
        return
      }
      
      // If not in cache, load from JSON and cache it
      users.value = usersData
      setCachedData(CACHE_KEY, usersData, localStorage, CACHE_TTL)
      lastFetch.value = Date.now()
    } catch (error) {
      console.error('Error loading users:', error)
      // Fallback to direct import
      users.value = usersData
    } finally {
      loading.value = false
    }
  }

  // Initialize on store creation - try sync first, then async
  const init = () => {
    if (users.value.length === 0) {
      // Try to get from cache synchronously first
      const cached = getCachedData(CACHE_KEY, localStorage)
      if (cached) {
        users.value = cached
        lastFetch.value = Date.now()
      } else {
        // Fallback to direct import immediately
        users.value = usersData
        // Then cache it async
        loadUsers()
      }
    }
  }
  
  // Auto-initialize on store creation
  init()

  // Computed properties
  const totalUsers = computed(() => users.value.length)
  
  const getUserById = (id) => {
    return users.value.find(u => u.id === id)
  }
  
  const getUserByEmail = (email) => {
    return users.value.find(u => u.email === email)
  }
  
  const searchUsers = (query) => {
    const lowerQuery = query.toLowerCase()
    return users.value.filter(u =>
      u.name.toLowerCase().includes(lowerQuery) ||
      u.email.toLowerCase().includes(lowerQuery)
    )
  }

  // Refresh users (clear cache and reload)
  const refreshUsers = async () => {
    const { clearCache } = await import('../utils/cache')
    clearCache(CACHE_KEY, localStorage)
    await loadUsers()
  }

  return {
    users,
    loading,
    lastFetch,
    totalUsers,
    loadUsers,
    init,
    getUserById,
    getUserByEmail,
    searchUsers,
    refreshUsers
  }
})

