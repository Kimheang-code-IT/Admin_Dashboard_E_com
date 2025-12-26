<template>
  <div class="flex justify-center gap-4 max-w-7xl mx-auto p-4 transition-colors duration-300">
    <!-- Main Invoice Content -->
    <div class="max-w-[700px] bg-white dark:bg-gray-800 p-8 transition-colors duration-300">
      <!-- Header Section -->
      <div class="flex justify-between items-center mb-8">
        <!-- Left: Company Info -->
        <div>
          <div class="flex items-center gap-3 ">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-sm flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-800 dark:text-white">{{ t('companyName') }}</h1>
              <p class="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-1">{{ t('companyTagline') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Invoice Title -->
        <div>
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white">{{ t('invoice') }}</h2>
        </div>
      </div>

      <hr class="border-gray-200 dark:border-gray-700 my-4">

      <!-- Invoice Info and Customer Info -->
      <div class="grid grid-cols-2 gap-[150px] items-end mb-8">
        <!-- Invoice Info -->
        <div>
          <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">{{
            t('invoiceInfo') }}</h3>
          <div class="space-y-2">
            <p class="text-sm text-gray-700 dark:text-gray-300"><span class="font-medium">{{ t('invoiceNo') }}</span> {{
              invoiceNumber }}
            </p>
            <p class="text-sm text-gray-700 dark:text-gray-300"><span class="font-medium">{{ t('date') }}:</span> {{
              invoiceDate }}</p>
          </div>
        </div>

        <!-- Customer Info -->
        <div>
          <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">{{
            t('customerInfo') }}</h3>
          <div class="space-y-2">
            <p class="text-sm text-gray-700 dark:text-gray-300"><span class="font-medium">{{ t('name') }}:</span> {{
              customerInfo.name || t('walkIn') }}</p>
            <p class="text-sm text-gray-700 dark:text-gray-300"><span class="font-medium">{{ t('phone') }}:</span> {{
              customerInfo.phone || t('defaultPhone') }}</p>
            <p class="text-sm text-gray-700 dark:text-gray-300"><span class="font-medium">{{ t('address') }}:</span> {{
              customerInfo.address || t('unknownAddress') }}</p>
          </div>
        </div>
      </div>

      <!-- Itemized List -->
      <div class="mb-8">
        <div class="bg-blue-600 dark:bg-blue-700 text-white px-4 py-3 ">
          <div class="grid grid-cols-12 gap-4 text-sm font-semibold">
            <div class="col-span-1">{{ t('no') }}</div>
            <div class="col-span-5">{{ t('description') }}</div>
            <div class="col-span-2 text-center">{{ t('price') }}</div>
            <div class="col-span-2 text-center">{{ t('qty') }}</div>
            <div class="col-span-2 text-right">{{ t('total') }}</div>
          </div>
        </div>
        <div class="border border-gray-200 dark:border-gray-700 border-t-0 ">
          <div v-for="(item, index) in cartItems" :key="item.id"
            class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
            <div class="grid grid-cols-12 gap-4 text-sm">
              <div class="col-span-1 text-gray-700 dark:text-gray-300">{{ String(index + 1).padStart(2, '0') }}</div>
              <div class="col-span-5 text-gray-900 dark:text-white font-medium">{{ item.name }}</div>
              <div class="col-span-2 text-center text-gray-700 dark:text-gray-300">${{ item.price.toFixed(2) }}</div>
              <div class="col-span-2 text-center text-gray-700 dark:text-gray-300">{{ item.quantity }}</div>
              <div class="col-span-2 text-right text-gray-900 dark:text-white font-medium">${{ (item.price *
                item.quantity).toFixed(2)
              }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Terms & Conditions and Payment Summary -->
      <div class="grid grid-cols-2 gap-8 mb-8">
        <!-- Terms & Conditions -->
        <div>
          <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">{{
            t('termsAndConditions') }}</h3>
          <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {{ t('thankYouMessage') }}
          </p>
        </div>

        <!-- Payment Summary -->
        <div>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span class="text-gray-900 dark:text-white">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Discount</span>
              <span class="text-gray-900 dark:text-white">${{ discountAmount.toFixed(2) }}</span>
            </div>
            <div v-if="tax" class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Tax ({{ tax.rate }}%)</span>
              <span class="text-gray-900 dark:text-white">${{ tax.amount.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold pt-2 border-t border-gray-300 dark:border-gray-700">
              <span class="text-gray-900 dark:text-white">{{ t('grandTotal') }}</span>
              <span class="text-gray-900 dark:text-white">${{ grandTotal.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Section -->
      <div class="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-3 gap-12">
          <div class="flex items-center gap-2 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p class="text-[12px] text-gray-700 dark:text-gray-300">{{ companyAddress }}</p>
          </div>
          <div class="flex items-center justify-end gap-2 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <p class="text-[13px] text-gray-700 dark:text-gray-300">{{ companyPhone }}</p>
          </div>
          <div class="flex items-center justify-end gap-2 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p class="text-[13px] text-gray-700 dark:text-gray-300">{{ companyEmail }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar: Action Buttons (Sticky) -->
    <div class="w-64 flex-shrink-0">
      <div
        class="sticky top-4 bg-white dark:bg-gray-800 rounded-sm shadow-lg border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">

        <div class="space-y-3">
          <button @click="takeScreenshot"
            class="w-full px-4 py-2.5 bg-green-600 text-white rounded-sm hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ t('screenshot') }}
          </button>
          <button @click="printInvoice"
            class="w-full px-4 py-2.5 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            {{ t('print') }}
          </button>
          <button @click="goBack"
            class="w-full px-4 py-2.5 bg-red-600 text-white rounded-sm hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {{ t('close') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const cartItems = ref([])
const customerInfo = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
})
const discount = ref(0)
const tax = ref(null)
const invoiceNumber = ref('')
const invoiceDate = ref('')

// Company information for footer
const companyAddress = ref('123 Business Street, City, State 12345')
const companyPhone = ref('+1 (555) 123-4567')
const companyEmail = ref('info@company.com')

// Generate invoice number and date
const generateInvoiceNumber = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `ORD-${year}${month}${day}${hours}${minutes}${seconds}`
}

const formatDate = (date) => {
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()
  return `${month}/${day}/${year}`
}

onMounted(() => {
  // Get data from route params or query
  if (route.params.cartData) {
    try {
      const data = JSON.parse(decodeURIComponent(route.params.cartData))
      cartItems.value = data.cart || []
      customerInfo.value = data.customer || {}
      discount.value = data.discount || 0
      tax.value = data.tax || null
    } catch (e) {
      console.error('Error parsing cart data:', e)
    }
  }

  // Generate invoice number and date
  invoiceNumber.value = generateInvoiceNumber()
  invoiceDate.value = formatDate(new Date())
})

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const discountAmount = computed(() => {
  return discount.value || 0
})

const grandTotal = computed(() => {
  const amountAfterDiscount = Math.max(0, subtotal.value - discountAmount.value)
  const taxAmount = tax.value ? tax.value.amount : 0
  return amountAfterDiscount + taxAmount
})

const printInvoice = () => {
  window.print()
}

const takeScreenshot = () => {
  // Using html2canvas library would be ideal, but for now we'll use a simple approach
  // You can install html2canvas: npm install html2canvas
  alert('Screenshot feature - You can implement using html2canvas library')
  // Example implementation with html2canvas:
  // import html2canvas from 'html2canvas'
  // html2canvas(document.querySelector('.max-w-4xl')).then(canvas => {
  //   const link = document.createElement('a')
  //   link.download = `invoice-${invoiceNumber.value}.png`
  //   link.href = canvas.toDataURL()
  //   link.click()
  // })
}

const goBack = () => {
  router.push('/pos')
}
</script>

<style scoped>
@media print {
  .max-w-4xl {
    max-width: 100%;
  }

  button {
    display: none;
  }

  /* Hide the right sidebar when printing */
  .w-64 {
    display: none;
  }

  /* Make invoice full width when printing */
  .flex {
    display: block;
  }

  .flex-1 {
    max-width: 100%;
  }
}
</style>
