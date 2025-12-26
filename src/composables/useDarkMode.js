import { ref, watch, onMounted } from 'vue'

const STORAGE_KEY = 'dark_mode_preference'
const isDarkMode = ref(false)

// Load dark mode preference from localStorage
const loadDarkModePreference = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) {
      return saved === 'true'
    }
    // Default to light mode if no preference is saved
    return false
  } catch (error) {
    console.error('Error loading dark mode preference:', error)
    return false
  }
}

// Save dark mode preference to localStorage
const saveDarkModePreference = (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, value.toString())
  } catch (error) {
    console.error('Error saving dark mode preference:', error)
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

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}

// Initialize dark mode
const initDarkMode = () => {
  isDarkMode.value = loadDarkModePreference()
  applyDarkMode(isDarkMode.value)
}

// Watch for changes and apply them
watch(isDarkMode, (newValue) => {
  applyDarkMode(newValue)
  saveDarkModePreference(newValue)
})

export function useDarkMode() {
  // Initialize on first use
  if (typeof window !== 'undefined') {
    initDarkMode()
  }

  return {
    isDarkMode,
    toggleDarkMode
  }
}

