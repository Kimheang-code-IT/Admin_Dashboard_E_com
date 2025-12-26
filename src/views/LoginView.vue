<template>
  <div
    class="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-sm shadow-lg p-8 transition-colors duration-300">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-white text-2xl font-bold">A</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ t('adminPanel') }}</h1>
        <p class="text-gray-600 dark:text-gray-300 mt-2">{{ t('signInToAccount') }}</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('emailAddress') }}
          </label>
          <input id="email" v-model="email" type="email" @blur="validateEmail" @input="errors.email = ''" :class="[
            'w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px]',
            errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
          ]" placeholder="admin@example.com" />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.email }}</p>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('password') }}
          </label>
          <div class="relative">
            <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" @blur="validatePassword"
              @input="errors.password = ''" :class="[
                'w-full px-4 py-2 pr-10 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px]',
                errors.password ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
              ]" :placeholder="t('passwordPlaceholder')" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0A9.973 9.973 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          <p v-if="errors.password" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.password }}</p>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember" v-model="rememberMe" type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label for="remember" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              {{ t('rememberMe') }}
            </label>
          </div>
          <router-link to="/forgot-password"
            class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            {{ t('forgotPassword') }}
          </router-link>
        </div>

        <button type="submit"
          class="w-full px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium">
          {{ t('signIn') }}
        </button>
      </form>

      <div v-if="error"
        class="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-sm">
        <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <ConfirmationDialog :show="showConfirmDialog" type="confirm" :title="t('confirmLogin')"
      :message="t('confirmLoginMessage')" :confirm-text="t('signIn')" :cancel-text="t('cancel')" @confirm="confirmLogin"
      @cancel="showConfirmDialog = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addHistory } from '../utils/history'
import { useI18n } from '../composables/useI18n'
import { useToast } from '../composables/useToast'
import ConfirmationDialog from '../components/ConfirmationDialog.vue'

const router = useRouter()
const { t } = useI18n()
const { success, error: showErrorToast } = useToast()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const error = ref('')
const showPassword = ref(false)
const showConfirmDialog = ref(false)
const errors = ref({
  email: '',
  password: ''
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

// Password validation - must be at least 6 characters with at least one number and one special character
const validatePassword = () => {
  errors.value.password = ''
  if (!password.value) {
    errors.value.password = t('passwordRequired')
    return false
  }
  if (password.value.length < 6) {
    errors.value.password = t('passwordMinLength')
    return false
  }
  if (!/\d/.test(password.value)) {
    errors.value.password = t('passwordMustContainNumber')
    return false
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password.value)) {
    errors.value.password = t('passwordMustContainSpecialChar')
    return false
  }
  return true
}

const handleLogin = () => {
  error.value = ''
  errors.value.email = ''
  errors.value.password = ''

  // Validate email
  const isEmailValid = validateEmail()

  // Validate password
  const isPasswordValid = validatePassword()

  if (!isEmailValid || !isPasswordValid) {
    return
  }

  // Show confirmation dialog
  showConfirmDialog.value = true
}

const confirmLogin = () => {
  showConfirmDialog.value = false

  // Simple validation - in a real app, this would call an API
  if (email.value && password.value) {
    // Log login history
    addHistory('login', {
      type: 'system',
      itemName: email.value,
      description: `User logged in successfully`,
      user: email.value
    })

    // Show success toast
    success(t('loginSuccess'))

    // Simulate successful login
    // In a real app, you would:
    // - Call authentication API
    // - Store authentication token
    // - Set user state

    // Navigate to dashboard
    setTimeout(() => {
      router.push('/')
    }, 500)
  } else {
    error.value = t('pleaseEnterBoth')
    showErrorToast(t('pleaseEnterBoth'))
  }
}
</script>
