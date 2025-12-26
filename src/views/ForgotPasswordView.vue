<template>
  <div class="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-sm shadow-lg p-8 transition-colors duration-300">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ t('forgotPassword') }}</h1>
        <p class="text-gray-600 dark:text-gray-300 mt-2">{{ t('forgotPasswordDescription') }}</p>
      </div>

      <!-- Success Message -->
      <div v-if="isSuccess" class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-sm">
        <div class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p class="text-sm font-medium text-green-800 dark:text-green-300">{{ t('resetLinkSent') }}</p>
            <p class="text-sm text-green-700 dark:text-green-400 mt-1">{{ t('checkYourEmail') }}</p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form v-if="!isSuccess" @submit.prevent="handleResetPassword" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('emailAddress') }}
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            @blur="validateEmail"
            @input="errors.email = ''"
            :class="[
              'w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px]',
              errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            ]"
            :placeholder="t('enterYourEmail')"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.email }}</p>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ isLoading ? t('sending') : t('sendResetLink') }}</span>
        </button>
      </form>

      <!-- Error Message -->
      <div v-if="error && !isSuccess" class="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-sm">
        <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
      </div>

      <!-- Back to Login -->
      <div class="mt-6 text-center">
        <router-link
          to="/login"
          class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ t('backToLogin') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n'

const router = useRouter()
const { t } = useI18n()

const email = ref('')
const error = ref('')
const isLoading = ref(false)
const isSuccess = ref(false)
const errors = ref({
  email: ''
})

// Email validation
const validateEmail = () => {
  errors.value.email = ''
  if (!email.value) {
    errors.value.email = t('emailRequired')
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errors.value.email = t('invalidEmailFormat')
    return false
  }
  return true
}

const handleResetPassword = async () => {
  error.value = ''
  errors.value.email = ''

  // Validate email
  const isEmailValid = validateEmail()
  if (!isEmailValid) {
    return
  }

  isLoading.value = true

  // Simulate API call
  setTimeout(() => {
    if (email.value) {
      // In a real app, this would call an API to send reset link
      isSuccess.value = true
      error.value = ''
    } else {
      error.value = t('pleaseEnterEmail')
    }
    isLoading.value = false
  }, 1500)
}
</script>

