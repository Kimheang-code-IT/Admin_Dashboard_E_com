/**
 * Cache utility for localStorage and sessionStorage
 * Supports TTL (Time To Live) for automatic expiration
 */

const CACHE_PREFIX = 'app_cache_'
const TTL_PREFIX = 'app_cache_ttl_'
const DEFAULT_TTL = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

/**
 * Get cached data from storage
 * @param {string} key - Cache key
 * @param {Storage} storage - localStorage or sessionStorage
 * @returns {any|null} - Cached data or null if expired/not found
 */
export function getCachedData(key, storage = localStorage) {
  try {
    const cacheKey = CACHE_PREFIX + key
    const ttlKey = TTL_PREFIX + key
    
    const cached = storage.getItem(cacheKey)
    const ttl = storage.getItem(ttlKey)
    
    if (!cached || !ttl) {
      return null
    }
    
    const now = Date.now()
    const expirationTime = parseInt(ttl, 10)
    
    // Check if cache has expired
    if (now > expirationTime) {
      // Clear expired cache
      storage.removeItem(cacheKey)
      storage.removeItem(ttlKey)
      return null
    }
    
    return JSON.parse(cached)
  } catch (error) {
    console.error('Error reading from cache:', error)
    return null
  }
}

/**
 * Set data in cache with TTL
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {Storage} storage - localStorage or sessionStorage
 * @param {number} ttlMs - Time to live in milliseconds (default: 24 hours)
 */
export function setCachedData(key, data, storage = localStorage, ttlMs = DEFAULT_TTL) {
  try {
    const cacheKey = CACHE_PREFIX + key
    const ttlKey = TTL_PREFIX + key
    
    const expirationTime = Date.now() + ttlMs
    
    storage.setItem(cacheKey, JSON.stringify(data))
    storage.setItem(ttlKey, expirationTime.toString())
  } catch (error) {
    console.error('Error writing to cache:', error)
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      console.warn('Storage quota exceeded, clearing old cache...')
      clearAllCache(storage)
      // Try again
      try {
        storage.setItem(cacheKey, JSON.stringify(data))
        storage.setItem(ttlKey, expirationTime.toString())
      } catch (retryError) {
        console.error('Failed to cache after clearing:', retryError)
      }
    }
  }
}

/**
 * Clear specific cache entry
 * @param {string} key - Cache key
 * @param {Storage} storage - localStorage or sessionStorage
 */
export function clearCache(key, storage = localStorage) {
  try {
    const cacheKey = CACHE_PREFIX + key
    const ttlKey = TTL_PREFIX + key
    
    storage.removeItem(cacheKey)
    storage.removeItem(ttlKey)
  } catch (error) {
    console.error('Error clearing cache:', error)
  }
}

/**
 * Clear all cached data
 * @param {Storage} storage - localStorage or sessionStorage (optional, clears both if not specified)
 */
export function clearAllCache(storage = null) {
  try {
    const storages = storage ? [storage] : [localStorage, sessionStorage]
    
    storages.forEach(st => {
      const keysToRemove = []
      
      // Find all cache keys
      for (let i = 0; i < st.length; i++) {
        const key = st.key(i)
        if (key && (key.startsWith(CACHE_PREFIX) || key.startsWith(TTL_PREFIX))) {
          keysToRemove.push(key)
        }
      }
      
      // Remove all cache keys
      keysToRemove.forEach(key => st.removeItem(key))
    })
  } catch (error) {
    console.error('Error clearing all cache:', error)
  }
}

/**
 * Check if cache exists and is valid
 * @param {string} key - Cache key
 * @param {Storage} storage - localStorage or sessionStorage
 * @returns {boolean} - True if cache exists and is valid
 */
export function hasCachedData(key, storage = localStorage) {
  return getCachedData(key, storage) !== null
}

/**
 * Get cache expiration time
 * @param {string} key - Cache key
 * @param {Storage} storage - localStorage or sessionStorage
 * @returns {number|null} - Expiration timestamp or null if not found
 */
export function getCacheExpiration(key, storage = localStorage) {
  try {
    const ttlKey = TTL_PREFIX + key
    const ttl = storage.getItem(ttlKey)
    return ttl ? parseInt(ttl, 10) : null
  } catch (error) {
    console.error('Error getting cache expiration:', error)
    return null
  }
}

