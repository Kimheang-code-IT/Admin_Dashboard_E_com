<template>
  <div class="flex items-center justify-center min-h-[400px]">
    <div class="flex flex-col items-center gap-4">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      <p class="text-gray-600 dark:text-gray-400">{{ text || 'Loading...' }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'Loading...'
  }
})
</script>

