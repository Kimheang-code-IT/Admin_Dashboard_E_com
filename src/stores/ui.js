import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { getCachedData, setCachedData } from '../utils/cache'
import { getCurrentLanguage, setCurrentLanguage } from '../utils/i18n'

export const useUIStore = defineStore('ui', () => {
  // Sidebar state
  const isSidebarCollapsed = ref(false)
  
  // Dark mode state
  const isDarkMode = ref(false)
  
  // Language state
  const currentLanguage = ref('en')
  
  // Fullscreen state
  const isFullscreen = ref(false)
  
  const CACHE_KEY_SIDEBAR = 'ui_sidebar'
  const CACHE_KEY_DARK_MODE = 'ui_dark_mode'
  const CACHE_KEY_LANGUAGE = 'ui_language'
  const CACHE_KEY_FULLSCREEN = 'ui_fullscreen'
  const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

  // Initialize UI state from cache
  const init = () => {
    // Load sidebar state from sessionStorage
    const cachedSidebar = getCachedData(CACHE_KEY_SIDEBAR, sessionStorage)
    if (cachedSidebar !== null) {
      isSidebarCollapsed.value = cachedSidebar
    }
    
    // Load dark mode from localStorage (persists across sessions)
    const cachedDarkMode = getCachedData(CACHE_KEY_DARK_MODE, localStorage)
    if (cachedDarkMode !== null) {
      isDarkMode.value = cachedDarkMode
      applyDarkMode(cachedDarkMode)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDarkMode.value = prefersDark
      applyDarkMode(prefersDark)
    }
    
    // Load language from localStorage
    const cachedLanguage = getCachedData(CACHE_KEY_LANGUAGE, localStorage)
    if (cachedLanguage !== null) {
      currentLanguage.value = cachedLanguage
      setCurrentLanguage(cachedLanguage)
    } else {
      const savedLang = getCurrentLanguage()
      currentLanguage.value = savedLang
    }
    
    // Load fullscreen state from sessionStorage
    const cachedFullscreen = getCachedData(CACHE_KEY_FULLSCREEN, sessionStorage)
    if (cachedFullscreen !== null) {
      isFullscreen.value = cachedFullscreen
    }
  }

  // Apply dark mode class to document
  const applyDarkMode = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Toggle sidebar
  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }

  // Set sidebar state
  const setSidebarCollapsed = (collapsed) => {
    isSidebarCollapsed.value = collapsed
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
  }

  // Set dark mode
  const setDarkMode = (dark) => {
    isDarkMode.value = dark
  }

  // Change language
  const changeLanguage = (lang) => {
    currentLanguage.value = lang
    setCurrentLanguage(lang)
    // Trigger language change event for components using useI18n
    window.dispatchEvent(new Event('languagechange'))
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value
  }

  // Watch for changes and cache them
  watch(isSidebarCollapsed, (newValue) => {
    setCachedData(CACHE_KEY_SIDEBAR, newValue, sessionStorage, CACHE_TTL)
  })

  watch(isDarkMode, (newValue) => {
    applyDarkMode(newValue)
    setCachedData(CACHE_KEY_DARK_MODE, newValue, localStorage, CACHE_TTL)
  })

  watch(currentLanguage, (newValue) => {
    setCachedData(CACHE_KEY_LANGUAGE, newValue, localStorage, CACHE_TTL)
  })

  watch(isFullscreen, (newValue) => {
    setCachedData(CACHE_KEY_FULLSCREEN, newValue, sessionStorage, CACHE_TTL)
  })

  // Initialize on store creation
  if (typeof window !== 'undefined') {
    init()
  }

  return {
    isSidebarCollapsed,
    isDarkMode,
    currentLanguage,
    isFullscreen,
    toggleSidebar,
    setSidebarCollapsed,
    toggleDarkMode,
    setDarkMode,
    changeLanguage,
    toggleFullscreen,
    init
  }
})

