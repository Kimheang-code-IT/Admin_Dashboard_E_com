<template>
  <aside :class="[
    'fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 flex flex-col z-50 transition-all duration-300 shadow-sm border-r border-gray-200 dark:border-gray-700',
    isCollapsed ? 'w-16' : 'w-64'
  ]">
    <!-- Logo/Title -->
    <div class="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
      <div v-if="!isCollapsed" class="flex items-center gap-2">
        <div class="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">{{ t('adminPanel') }}</h1>
      </div>
      <div v-else class="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center ">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
    </div>

    <!-- Menu Items -->
    <nav class="flex-1 p-4 overflow-y-auto">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.path" :class="[isCollapsed ? 'flex justify-center' : '']">
          <router-link :to="item.path" :class="[
            'flex items-center rounded-sm transition-colors relative group',
            isCollapsed ? 'justify-center px-6 py-3 w-full' : 'px-4 py-3',
            'hover:bg-gray-100 dark:hover:bg-gray-700',
            'hover:text-blue-600 dark:hover:text-blue-400',
            $route.path === item.path
              ? 'bg-blue-100 dark:bg-blue-900 font-semibold text-blue-600 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300'
          ]" :title="isCollapsed ? item.label : ''">
            <!-- Left border line for active page -->
            <span v-if="$route.path === item.path"
              class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 dark:bg-blue-400 rounded-r-sm"></span>
            <span class="flex-shrink-0 flex items-center justify-center transition-colors" :class="{
              'mr-3': !isCollapsed,
              'w-7 h-7 text-blue-600 dark:text-blue-400': $route.path === item.path,
              'w-5 h-5 group-hover:text-blue-600 dark:group-hover:text-blue-400': $route.path !== item.path
            }" v-html="item.icon"></span>
            <span v-if="!isCollapsed" class="transition-colors" :class="{
              'text-lg font-bold': $route.path === item.path,
              'text-base font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400': $route.path !== item.path
            }">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useUIStore } from '../stores/ui'

// Use Pinia UI store
const uiStore = useUIStore()
const isCollapsed = computed(() => uiStore.isSidebarCollapsed)
const { t } = useI18n()

// Menu items configuration with SVG icons
const menuItems = computed(() => [
  {
    path: '/',
    label: t('dashboard'),
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>'
  },
  {
    path: '/category',
    label: t('category'),
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>'
  },
  {
    path: '/product',
    label: t('product'),
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>'
  },
  {
    path: '/pos',
    label: t('pos'),
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>'
  },
  {
    path: '/report',
    label: t('report'),
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>'
  },
  {
    path: '/tax',
    label: t('tax'),
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>'
  },
  {
    path: '/order',
    label: t('order'),
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'
  },
  {
    path: '/financial',
    label: t('financial'),
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
  }

])
</script>
