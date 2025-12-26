<template>
  <div :class="['mx-auto transition-all duration-300', isSidebarCollapsed ? 'max-w-full px-2' : 'max-w-7xl']">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
      <!-- Total Orders Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ totalOrders }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('totalOrders') }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Revenue Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">${{ totalRevenue.toFixed(2) }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('totalRevenue') }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Items Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ totalItems }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('totalItems') }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Table -->
    <div class="bg-white dark:bg-gray-800 rounded-sm shadow transition-colors duration-300">
      <!-- Search and Filter Bar -->
      <div class="p-2">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div class="relative w-[400px]">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input v-model="searchQuery" type="text" :placeholder="t('search')"
              class="w-full pl-10 pr-4 py-2 text-[13px] border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px]" />
          </div>
          <div class="flex items-center gap-4">
            <div class="relative">
              <select v-model="selectedCategory"
                class="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-sm px-4 py-2 pr-8 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white">
                <option value="">{{ t('allCategories') }}</option>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scrollable table container with sticky header -->
      <div
        :class="['overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-sm transition-all duration-300', uiStore.isFullscreen ? 'max-h-[613px]' : 'max-h-[479px]']">
        <table class="w-full">
          <!-- Sticky Header -->
          <thead class="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('no') }}
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('productName') }}
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('category') }}
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('price') }}
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('discount') }}
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('tax') }}
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('qty') }}
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('total') }}
              </th>
              <th
                class="px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('invoice') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(order, index) in filteredOrders" :key="order.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ index + 1 }}</td>
              <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{{ order.productName }}</td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getCategoryColorClass(order.category)">
                  {{ order.category }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                ${{ order.price.toFixed(2) }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm">
                <span v-if="order.discount"
                  class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
                  {{ order.discount }}%
                </span>
                <span v-else class="text-gray-400 dark:text-gray-500">-</span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                ${{ order.taxAmount.toFixed(2) }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ order.quantity }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                ${{ order.totalPrice.toFixed(2) }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-center">
                <button @click="viewInvoice(order)"
                  class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  :title="t('viewInvoice')">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="9" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                {{ t('noOrdersFound') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n'
// Import products from Website folder
import { products, categories as websiteCategories } from '../../../Website/src/data/products.js'

import { useUIStore } from '../stores/ui'
import { useTaxStore } from '../stores/tax'
import { useProductsStore } from '../stores/products'

const uiStore = useUIStore()
const taxStore = useTaxStore()
const productsStore = useProductsStore()

const isSidebarCollapsed = computed(() => uiStore.isSidebarCollapsed)
const { t } = useI18n()
const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('')

// Get current tax rate from store
const currentTaxRate = computed(() => taxStore.currentTaxRate)

// Initialize stores on mount
onMounted(() => {
  taxStore.init()
  productsStore.init()
})

// Generate orders from products (simulating order data)
const generateOrders = () => {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return []
  }
  return products.map((product, index) => {
    // Generate random quantity between 1 and 5
    const quantity = Math.floor(Math.random() * 5) + 1
    const price = product.price
    const discount = product.discount || 0
    const discountAmount = (price * quantity * discount) / 100
    const subtotal = (price * quantity) - discountAmount
    const taxAmount = (subtotal * currentTaxRate.value) / 100
    const totalPrice = subtotal + taxAmount

    return {
      id: `order-${index + 1}`,
      productName: product.title,
      category: product.category,
      price: price,
      discount: discount,
      quantity: quantity,
      taxAmount: taxAmount,
      totalPrice: totalPrice
    }
  })
}

const orders = ref([])

// Get unique categories from products (excluding 'All Products')
const categories = computed(() => {
  return websiteCategories.filter(cat => cat !== 'All Products')
})

const filteredOrders = computed(() => {
  let filtered = orders.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(order =>
      order.productName.toLowerCase().includes(query) ||
      order.category.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(order => order.category === selectedCategory.value)
  }

  return filtered
})

const totalOrders = computed(() => orders.value.length)

const totalRevenue = computed(() => {
  return orders.value.reduce((sum, order) => sum + order.totalPrice, 0)
})

const totalItems = computed(() => {
  return orders.value.reduce((sum, order) => sum + order.quantity, 0)
})

const getCategoryColorClass = (category) => {
  const colors = {
    'Electronics': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
    'Computers': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400',
    'Audio & Video': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
    'Accessories': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
    'Books': 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-400',
    'Office Supplies': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400',
    'Mobile Devices': 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-400',
    'Gaming': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
  }
  return colors[category] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
}

const viewInvoice = (order) => {
  // Create cart data for invoice
  const cartData = {
    cart: [{
      id: order.id,
      name: order.productName,
      price: order.price,
      quantity: order.quantity
    }],
    customer: {
      name: '',
      phone: '',
      address: '',
      date: new Date().toISOString().split('T')[0]
    },
    discount: order.discount ? (order.price * order.quantity * order.discount) / 100 : 0,
    tax: {
      rate: currentTaxRate.value,
      amount: order.taxAmount
    }
  }

  // Navigate to invoice with cart data
  const encodedData = encodeURIComponent(JSON.stringify(cartData))
  router.push(`/invoice/${encodedData}`)
}

onMounted(() => {
  // Generate orders from products
  orders.value = generateOrders()
})
</script>
