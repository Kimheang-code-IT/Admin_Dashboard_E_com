<template>
  <div :class="['mx-auto transition-all duration-300', isSidebarCollapsed ? 'max-w-full px-2' : 'max-w-7xl']">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <!-- Left Panel: Product Listing -->
      <div class="lg:col-span-2">
        <!-- Category Filters and Search -->
        <div class=" rounded-sm  p-3 mb-3 sticky top-0 z-10">
          <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
            <!-- Category Filters -->
            <div class="flex gap-2 items-center">
              <!-- All Button (Always Visible) -->
              <button @click="selectedCategory = null" :class="[
                'px-4 py-2 text-[13px] rounded-sm font-medium transition-colors flex-shrink-0',
                !selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              ]">
                {{ t('all') }}
              </button>
              <!-- Other Category Buttons (Scrollable) -->
              <div class="flex gap-2 overflow-x-auto max-w-[400px] category-scroll"
                style="scrollbar-width: none; -ms-overflow-style: none;">
                <button v-for="cat in categoryFilters.filter(c => c !== t('all'))" :key="cat"
                  @click="selectedCategory = cat" :class="[
                    'px-4 py-2 text-[13px] rounded-sm font-medium transition-colors flex-shrink-0',
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  ]">
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- Search Bar -->
            <div class="relative w-[300px]">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input v-model="searchQuery" type="text" :placeholder="t('searchProducts')"
                class="w-full pl-10 pr-4 py-2 text-[13px] border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px]" />
            </div>
          </div>
        </div>

        <!-- Product Grid -->
        <div
          :class="['grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto transition-all duration-300', uiStore.isFullscreen ? 'max-h-[680px]' : 'max-h-[555px]']">
          <div v-for="product in filteredProducts" :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-sm shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300 relative group">
            <!-- Search Icon Button - Top Right (Show on Hover) -->
            <button @click="showProductDetail(product)"
              class="absolute top-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-all z-10 opacity-0 group-hover:opacity-100"
              title="View Details">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <!-- Product Image -->
            <div class="w-full h-48 bg-blue-50 rounded-t-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>

            <!-- Product Info -->
            <div class="p-4">
              <h3 class="font-bold text-gray-900 dark:text-white text-base mb-1 truncate">{{ product.name }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ t('sku') }}: {{ product.sku }}</p>
              <div class="flex items-center justify-between mb-4">
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ product.inStock }} {{ t('inStock') }}</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white">${{ product.price.toFixed(2) }}</p>
              </div>

              <!-- Add to Cart Button -->
              <button @click="addToCart(product)"
                class="w-full px-4 py-2.5 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                {{ t('addToCart') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel: Shopping Cart -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 sticky top-0 transition-colors duration-300">
          <!-- Cart Header -->
          <div class="flex items-center justify-between mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {{ t('cart') }}
            </h2>
            <div class="flex items-center gap-2">
              <button @click="openCustomerInfoDialog" :disabled="cart.length === 0"
                class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-md flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ t('customerInfo') }}
              </button>
              <button v-if="cart.length > 0" @click="clearCart"
                class="text-sm text-red-400 hover:text-red-600 font-medium bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-md flex items-center gap-1 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {{ t('clearAll') }}
              </button>
            </div>
          </div>

          <!-- Cart Items -->
          <div
            :class="['space-y-2 mb-3 overflow-y-auto transition-all duration-300', uiStore.isFullscreen ? 'h-[443px]' : 'h-[313px]']">
            <div v-for="item in cart" :key="item.id"
              class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-sm">
              <div class="flex-1">
                <p class="font-medium text-[13px] text-gray-900 dark:text-white text-sm">{{ item.name }}</p>
                <p class="text-xs text-[13px] text-gray-500 dark:text-gray-400">${{ item.price.toFixed(2) }}</p>
              </div>
              <div class="flex items-center gap-2">
                <button @click="decreaseQuantity(item.id)"
                  class="w-7 h-7 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white">
                  -
                </button>
                <span class="w-3 text-center text-[13px] text-sm font-medium text-gray-900 dark:text-white">{{
                  item.quantity }}</span>
                <button @click="increaseQuantity(item.id)"
                  class="w-7 h-7 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white">
                  +
                </button>
              </div>
              <div class="text-right min-w-[70px]">
                <p class="font-medium text-[14px] text-gray-900 dark:text-white">${{ (item.price *
                  item.quantity).toFixed(2) }}</p>
              </div>
              <button @click="removeFromCart(item.id)" class="text-red-400 hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <div v-if="cart.length === 0"
              class="text-center text-gray-500 dark:text-gray-400 text-sm py-8 flex flex-col items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>{{ t('cartIsEmpty') }}</p>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="border-t dark:border-gray-700 pt-3 space-y-2 mb-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">{{ t('items') }}</span>
              <span class="text-gray-900 dark:text-white font-medium">{{ totalItems }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">{{ t('subtotal') }}</span>
              <span class="text-gray-900 dark:text-white font-medium">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm items-center">
              <span class="text-gray-600 dark:text-gray-400">{{ t('discount') }}</span>
              <div class="flex items-center gap-2">
                <input v-model.number="discount" type="number" min="0"
                  class="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                <span class="text-gray-900 dark:text-white font-medium">${{ discountAmount.toFixed(2) }}</span>
              </div>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">{{ t('tax') }} ({{ currentTaxRate }}%)</span>
              <span class="text-gray-900 dark:text-white font-medium">${{ taxAmount.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold pt-2 border-t dark:border-gray-700">
              <span class="text-gray-900 dark:text-white">{{ t('total') }}</span>
              <span class="text-gray-900 dark:text-white">${{ total.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Checkout Button -->
          <button @click="handleCheckout" :disabled="cart.length === 0"
            class="w-full px-4 py-3 bg-green-600 text-white rounded-sm hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ t('checkout') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Product Detail Dialog -->
    <Transition name="dialog">
      <div v-if="showProductDetailDialog"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        @click.self="closeProductDetailDialog">
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col transition-all duration-300">
          <!-- Dialog Header -->
          <div
            class="sticky top-0 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between z-10">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ t('productDetails') }}</h2>
            </div>
            <button @click="closeProductDetailDialog"
              class="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Close dialog">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Dialog Content -->
          <div class="flex-1 overflow-y-auto p-6" v-if="selectedProduct">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <!-- Left Column - Product Image -->
              <div class="flex flex-col h-full">
                <!-- Product Picture -->
                <div
                  class="w-full h-full min-h-[400px] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg shadow-inner flex items-center justify-center overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 text-blue-400 dark:text-blue-500" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>

              <!-- Right Column - Product Details -->
              <div class="flex flex-col h-full">
                <!-- Product Information Card -->
                <div
                  class="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700 flex-1 flex flex-col">
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-4 text-base flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ t('productInformation') }}
                  </h4>
                  <div class="space-y-3 flex-1">
                    <h3 class="font-bold text-2xl text-gray-900 dark:text-white mb-4">
                      {{ selectedProduct.name }}
                    </h3>
                    <div
                      class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ t('sku') }}</span>
                      <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ selectedProduct.sku }}</span>
                    </div>
                    <div
                      class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ t('category') }}</span>
                      <span
                        class="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                        {{ selectedProduct.category }}
                      </span>
                    </div>
                    <div
                      class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ t('price') }}</span>
                      <span class="text-xl font-bold text-blue-600 dark:text-blue-400">
                        ${{ selectedProduct.price.toFixed(2) }}
                      </span>
                    </div>
                    <div
                      class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ t('inStock') }}</span>
                      <span
                        class="px-3 py-1 text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                        {{ selectedProduct.inStock }} {{ t('units') }}
                      </span>
                    </div>
                    <div class="flex items-center justify-between py-2">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ t('status') }}</span>
                      <span
                        class="px-3 py-1 text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full">
                        {{ selectedProduct.status || 'Active' }}
                      </span>
                    </div>
                  </div>
                  <!-- Add to Cart Button - Bottom Right -->
                  <div class="mt-auto pt-4 flex justify-end">
                    <button @click="addToCartFromDetail"
                      class="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                      {{ t('addToCart') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Customer Info Dialog -->
    <Transition name="dialog">
      <div v-if="showCustomerInfoDialog"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        @click.self="closeCustomerInfoDialog">
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full overflow-hidden flex flex-col transition-all duration-300">
          <!-- Dialog Header -->
          <div
            class="sticky top-0 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between z-10">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ t('customerInfo') }}</h2>
            </div>
            <button @click="closeCustomerInfoDialog"
              class="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Close dialog">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Dialog Content -->
          <div class="flex-1 overflow-y-auto p-6">
            <!-- Customer Type Selection -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {{ t('customerType') }}
              </label>
              <div class="grid grid-cols-2 gap-3">
                <button @click="selectCustomerType('customer')"
                  :class="['px-4 py-3 rounded-lg font-medium transition-all duration-200 border-2', customerType === 'customer'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500']">
                  <div class="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{{ t('customer') }}</span>
                  </div>
                </button>
                <button @click="selectCustomerType('walk_in')"
                  :class="['px-4 py-3 rounded-lg font-medium transition-all duration-200 border-2', customerType === 'walk_in'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500']">
                  <div class="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{{ t('walkIn') }}</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Customer Form Fields (Only show when Customer is selected) -->
            <div v-if="customerType === 'customer'" class="space-y-4">
              <!-- Name Field -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('name') }} <span class="text-red-500">*</span>
                </label>
                <input v-model="customerForm.name" type="text" :placeholder="t('enterName')"
                  class="w-full px-4 py-2.5 text-[13px] border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px] placeholder-gray-500 dark:placeholder-gray-400" />
              </div>

              <!-- Address Field -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('address') }} <span class="text-red-500">*</span>
                </label>
                <textarea v-model="customerForm.address" rows="3" :placeholder="t('enterAddress')"
                  class="w-full px-4 py-2.5 text-[13px] border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px] placeholder-gray-500 dark:placeholder-gray-400 resize-none"></textarea>
              </div>

              <!-- Phone Field -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('phone') }} <span class="text-red-500">*</span>
                </label>
                <input v-model="customerForm.phone" type="tel" :placeholder="t('enterPhone')"
                  class="w-full px-4 py-2.5 text-[13px] border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px] placeholder-gray-500 dark:placeholder-gray-400" />
              </div>
            </div>

            <!-- Walk-in Message -->
            <div v-if="customerType === 'walk_in'"
              class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
              <div class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm text-blue-800 dark:text-blue-300">
                  {{ t('walkInMessage') }}
                </p>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="mt-6 flex gap-3">
              <button @click="closeCustomerInfoDialog" type="button"
                class="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">
                {{ t('cancel') }}
              </button>
              <button @click="submitCustomerInfo" type="button"
                class="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40">
                {{ t('submit') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Checkout Confirmation Dialog -->
    <ConfirmationDialog :show="showCheckoutDialog" type="info" :title="t('confirmCheckout')"
      :message="`${t('confirmCheckoutMessage')} Total: $${total.toFixed(2)}`" :confirm-text="t('checkout')"
      :cancel-text="t('cancel')" @confirm="confirmCheckout" @cancel="showCheckoutDialog = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '../composables/useI18n'
import { useToast } from '../composables/useToast'
import ConfirmationDialog from '../components/ConfirmationDialog.vue'
import { useUIStore } from '../stores/ui'
import { useProductsStore } from '../stores/products'
import { useCategoriesStore } from '../stores/categories'
import { useTaxStore } from '../stores/tax'

const router = useRouter()
const uiStore = useUIStore()
const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const taxStore = useTaxStore()
const { success, error: showErrorToast } = useToast()

const isSidebarCollapsed = computed(() => uiStore.isSidebarCollapsed)
const { t } = useI18n()

// Initialize stores on mount
onMounted(() => {
  productsStore.init()
  categoriesStore.init()
  taxStore.init()
})

// Use products from store
const allProducts = computed(() => productsStore.products)

// Map products to POS format
const products = computed(() => productsStore.products.map(p => ({
  id: p.id,
  name: p.name,
  sku: p.sku,
  category: p.category,
  price: p.price,
  inStock: p.inStock
})))

// Get categories from store that have products
const categoryFilters = computed(() => {
  // Get unique categories from products
  const productCategories = [...new Set(products.value.map(p => p.category))]
  // Filter categories to only include those that have products
  const categoryNames = categoriesStore.categories
    .map(cat => cat.name)
    .filter(catName => productCategories.includes(catName))
    .sort()
  return [t('all'), ...categoryNames]
})

const selectedCategory = ref(null)
const searchQuery = ref('')
const cart = ref([])
const discount = ref(0)
const showProductDetailDialog = ref(false)
const selectedProduct = ref(null)

// Customer Info Dialog State
const showCustomerInfoDialog = ref(false)
const customerType = ref('customer') // 'customer' or 'walk_in'
const customerForm = ref({
  name: '',
  address: '',
  phone: ''
})
const customerInfo = ref(null)

const filteredProducts = computed(() => {
  let filtered = products.value

  if (selectedCategory.value && selectedCategory.value !== t('all')) {
    filtered = filtered.filter(p => p.category === selectedCategory.value)
  } else if (!selectedCategory.value) {
    // Show all products when "All" is selected or no category selected
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query)
    )
  }

  return filtered
})

const getCartButtonText = (productId) => {
  const item = cart.value.find(i => i.id === productId)
  if (item) {
    return `${t('addMore')} (${t('inCart')}: ${item.quantity})`
  }
  return t('addToCart')
}

const addToCart = (product) => {
  const existingItem = cart.value.find(item => item.id === product.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({
      ...product,
      quantity: 1
    })
  }
}

const removeFromCart = (productId) => {
  const index = cart.value.findIndex(item => item.id === productId)
  if (index !== -1) {
    cart.value.splice(index, 1)
  }
}

const increaseQuantity = (productId) => {
  const item = cart.value.find(i => i.id === productId)
  if (item) {
    item.quantity++
  }
}

const decreaseQuantity = (productId) => {
  const item = cart.value.find(i => i.id === productId)
  if (item && item.quantity > 1) {
    item.quantity--
  } else if (item) {
    removeFromCart(productId)
  }
}

const clearCart = () => {
  if (confirm(t('clearCartConfirm'))) {
    cart.value = []
  }
}

const totalItems = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0)
})

const subtotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const discountAmount = computed(() => {
  return discount.value || 0
})

// Get current tax rate from store
const currentTaxRate = computed(() => taxStore.currentTaxRate)

// Calculate tax amount
const taxAmount = computed(() => {
  const amountAfterDiscount = Math.max(0, subtotal.value - discountAmount.value)
  return (amountAfterDiscount * currentTaxRate.value) / 100
})

const total = computed(() => {
  const amountAfterDiscount = Math.max(0, subtotal.value - discountAmount.value)
  return amountAfterDiscount + taxAmount.value
})

const proceedToCheckout = () => {
  // Prepare data for invoice
  const checkoutData = {
    cart: cart.value,
    discount: discount.value,
    tax: {
      rate: currentTaxRate.value,
      amount: taxAmount.value
    },
    total: total.value,
    customer: customerInfo.value
  }

  // Encode data for URL
  const encodedData = encodeURIComponent(JSON.stringify(checkoutData))

  // Navigate to invoice page using Vue Router
  router.push({
    name: 'Invoice',
    params: { cartData: encodedData }
  })
}

const showCheckoutDialog = ref(false)

const handleCheckout = () => {
  if (cart.value.length === 0) {
    showErrorToast('Cart is empty: Please add items to cart before checkout.')
    return
  }

  // Check if customer info is complete
  if (!customerInfo.value) {
    // Show customer info dialog if not completed
    openCustomerInfoDialog()
    return
  }

  // Show confirmation dialog
  showCheckoutDialog.value = true
}

const confirmCheckout = () => {
  showCheckoutDialog.value = false
  // Proceed to checkout with customer info
  proceedToCheckout()
  success('Checkout successful: Order processed successfully!')
}

// Product detail dialog functions
const showProductDetail = (product) => {
  // Find full product details from allProducts
  const fullProduct = allProducts.value.find(p => p.id === product.id)
  selectedProduct.value = fullProduct || product
  showProductDetailDialog.value = true
}

const closeProductDetailDialog = () => {
  showProductDetailDialog.value = false
  selectedProduct.value = null
}

const addToCartFromDetail = () => {
  if (selectedProduct.value) {
    const posProduct = {
      id: selectedProduct.value.id,
      name: selectedProduct.value.name,
      sku: selectedProduct.value.sku,
      category: selectedProduct.value.category,
      price: selectedProduct.value.price,
      inStock: selectedProduct.value.inStock
    }
    addToCart(posProduct)
    closeProductDetailDialog()
  }
}

// Customer Info Dialog Functions
const selectCustomerType = (type) => {
  customerType.value = type
  if (type === 'walk_in') {
    // Auto-complete with null/empty values for walk-in
    customerForm.value = {
      name: '',
      address: '',
      phone: ''
    }
  }
}

const openCustomerInfoDialog = () => {
  // If customer info already exists, pre-fill the form
  if (customerInfo.value) {
    if (customerInfo.value.type === 'customer') {
      customerType.value = 'customer'
      customerForm.value = {
        name: customerInfo.value.name || '',
        address: customerInfo.value.address || '',
        phone: customerInfo.value.phone || ''
      }
    } else {
      customerType.value = 'walk_in'
      customerForm.value = {
        name: '',
        address: '',
        phone: ''
      }
    }
  } else {
    // Reset form if no customer info exists
    customerType.value = 'customer'
    customerForm.value = {
      name: '',
      address: '',
      phone: ''
    }
  }
  showCustomerInfoDialog.value = true
}

const closeCustomerInfoDialog = () => {
  showCustomerInfoDialog.value = false
  // Don't reset form - keep it for next time
}

const submitCustomerInfo = () => {
  if (customerType.value === 'customer') {
    // Validate customer fields
    if (!customerForm.value.name || !customerForm.value.address || !customerForm.value.phone) {
      alert(t('pleaseFillAllFields'))
      return
    }
    customerInfo.value = {
      type: 'customer',
      name: customerForm.value.name,
      address: customerForm.value.address,
      phone: customerForm.value.phone,
      date: new Date().toISOString()
    }
  } else {
    // Walk-in customer - all fields null
    customerInfo.value = {
      type: 'walk_in',
      name: null,
      address: null,
      phone: null,
      date: new Date().toISOString()
    }
  }
  closeCustomerInfoDialog()
  // Customer info is now complete - user can click checkout when ready
}
</script>

<style scoped>
.category-scroll {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.category-scroll::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

/* Dialog Transition */
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-enter-active .bg-white,
.dialog-leave-active .bg-white {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .bg-white,
.dialog-leave-to .bg-white {
  transform: scale(0.95);
  opacity: 0;
}
</style>
