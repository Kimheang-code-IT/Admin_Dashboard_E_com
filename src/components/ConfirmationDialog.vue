<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70"
        @click.self="handleCancel">
        <div class="bg-white dark:bg-gray-800 rounded-sm shadow-xl max-w-md w-full mx-4 transform transition-all">
          <div class="p-6">
            <!-- Icon -->
            <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full" :class="iconBgClass">
              <svg v-if="type === 'delete'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="iconClass"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <svg v-else-if="type === 'warning'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="iconClass"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="iconClass" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <!-- Title -->
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
              {{ title }}
            </h3>

            <!-- Message -->
            <p class="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
              {{ message }}
            </p>

            <!-- Actions -->
            <div class="flex gap-3">
              <button @click="handleCancel"
                class="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">
                {{ cancelText }}
              </button>
              <button @click="handleConfirm" :class="[
                'flex-1 px-4 py-2 rounded-sm transition-colors font-medium',
                confirmButtonClass
              ]">
                {{ confirmText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'confirm', // 'confirm', 'delete', 'warning'
    validator: (value) => ['confirm', 'delete', 'warning'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const iconBgClass = computed(() => {
  if (props.type === 'delete') return 'bg-red-100 dark:bg-red-900/30'
  if (props.type === 'warning') return 'bg-yellow-100 dark:bg-yellow-900/30'
  return 'bg-blue-100 dark:bg-blue-900/30'
})

const iconClass = computed(() => {
  if (props.type === 'delete') return 'text-red-600 dark:text-red-400'
  if (props.type === 'warning') return 'text-yellow-600 dark:text-yellow-400'
  return 'text-blue-600 dark:text-blue-400'
})

const confirmButtonClass = computed(() => {
  if (props.type === 'delete') return 'bg-red-600 text-white hover:bg-red-700'
  if (props.type === 'warning') return 'bg-yellow-600 text-white hover:bg-yellow-700'
  return 'bg-blue-600 text-white hover:bg-blue-700'
})

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-enter-active .transform,
.dialog-leave-active .transform {
  transition: transform 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .transform,
.dialog-leave-to .transform {
  transform: scale(0.9);
}
</style>
