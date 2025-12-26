<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
      <TransitionGroup name="toast" tag="div">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'pointer-events-auto min-w-[320px] max-w-md bg-white dark:bg-gray-800 rounded-sm shadow-lg border-l-4',
            getToastBorderClass(toast.type)
          ]"
        >
          <div class="p-4 flex items-start gap-3">
            <!-- Colored Vertical Bar is handled by border-l-4 -->
            
            <!-- Icon Container -->
            <div :class="[
              'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
              getToastIconBgClass(toast.type)
            ]">
              <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <svg v-else-if="toast.type === 'warning'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">
                {{ getToastTitle(toast) }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ toast.message }}
              </p>
            </div>

            <!-- Close Button -->
            <button
              @click="removeToast(toast.id)"
              class="flex-shrink-0 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Progress Bar -->
          <div v-if="toast.duration > 0" class="h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              :class="['h-full transition-all ease-linear', getToastProgressClass(toast.type)]"
              :style="{ width: `${toast.progress || 100}%` }"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useToast } from '../composables/useToast'

const { toasts, removeToast } = useToast()

// Progress bar animation
let progressIntervals = new Map()

const startProgress = (toast) => {
  if (toast.duration <= 0) return
  
  const startTime = Date.now()
  const updateProgress = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.max(0, 100 - (elapsed / toast.duration) * 100)
    toast.progress = progress
    
    if (progress <= 0) {
      const interval = progressIntervals.get(toast.id)
      if (interval) {
        clearInterval(interval)
        progressIntervals.delete(toast.id)
      }
    }
  }
  
  toast.progress = 100
  const interval = setInterval(updateProgress, 16) // ~60fps for smooth animation
  progressIntervals.set(toast.id, interval)
}

// Watch for new toasts and start progress
let checkInterval = null

onMounted(() => {
  const checkToasts = () => {
    toasts.value.forEach(toast => {
      if (!progressIntervals.has(toast.id) && toast.duration > 0) {
        startProgress(toast)
      }
    })
  }
  
  checkInterval = setInterval(checkToasts, 100)
  
  // Also check immediately
  checkToasts()
})

onUnmounted(() => {
  if (checkInterval) {
    clearInterval(checkInterval)
  }
  progressIntervals.forEach(interval => clearInterval(interval))
  progressIntervals.clear()
})

// Watch for toast removals to clean up intervals
watch(() => toasts.value.length, () => {
  // Clean up intervals for toasts that no longer exist
  const existingIds = new Set(toasts.value.map(t => t.id))
  progressIntervals.forEach((interval, id) => {
    if (!existingIds.has(id)) {
      clearInterval(interval)
      progressIntervals.delete(id)
    }
  })
})

const getToastBorderClass = (type) => {
  const classes = {
    success: 'border-green-500',
    error: 'border-red-500',
    warning: 'border-orange-500',
    info: 'border-blue-500'
  }
  return classes[type] || classes.info
}

const getToastIconBgClass = (type) => {
  const classes = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-orange-500',
    info: 'bg-blue-500'
  }
  return classes[type] || classes.info
}

const getToastProgressClass = (type) => {
  const classes = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-orange-500',
    info: 'bg-blue-500'
  }
  return classes[type] || classes.info
}

const getToastTitle = (toast) => {
  // If message contains a title (separated by colon or newline), extract it
  // Otherwise, use default titles based on type
  if (toast.title) {
    return toast.title
  }
  
  const titles = {
    success: 'Yay! Everything worked!',
    error: 'Uh oh, something went wrong',
    warning: 'Warning',
    info: 'Did you know?'
  }
  return titles[toast.type] || titles.info
}
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.7, 0, 0.84, 0);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.toast-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-move {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>

