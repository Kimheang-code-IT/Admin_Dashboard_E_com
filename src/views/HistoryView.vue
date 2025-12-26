<template>
  <div :class="['mx-auto transition-all duration-300', isSidebarCollapsed ? 'max-w-full px-2' : 'max-w-7xl']">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
      <!-- Total History Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ totalHistoryEntries }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('totalHistory') }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">{{ filteredHistory.length }} {{ t('entries') }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Today Activities Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ todayActivities }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('todayActivities') }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">{{ t('last24Hours') }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Most Common Action Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-gray-800 dark:text-white">{{ mostCommonAction.name || '-' }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('mostCommonAction') }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">{{ mostCommonAction.count || 0 }} {{
              t('activities') }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Most Active User Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xl font-bold text-gray-800 dark:text-white">{{ mostActiveUser.name || '-' }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('mostActiveUser') }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">{{ mostActiveUser.count || 0 }} {{ t('activities')
              }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Header -->


    <!-- History Table -->
    <div class="bg-white dark:bg-gray-800 rounded-sm shadow transition-colors duration-300">
      <div class="p-2">
        <div class="flex items-center justify-between gap-3">
          <!-- Search - Left Side -->
          <div class="relative w-[400px] flex-shrink-0">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input v-model="searchQuery" type="text" :placeholder="t('searchHistory')"
              class="w-full pl-10 pr-4 py-2 text-[13px] border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px]" />
          </div>

          <!-- Filters - Right Side -->
          <div class="flex items-center gap-3 flex-1 justify-end">
            <!-- Date Range Filter -->
            <div class="flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">{{ t('dateBetween')
              }}:</label>
              <input v-model="filterDateFrom" type="date"
                class="px-3 py-2 text-[13px] border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              <span class="text-gray-500 dark:text-gray-400">{{ t('to') }}</span>
              <input v-model="filterDateTo" type="date"
                class="px-3 py-2 text-[13px] border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              <button v-if="filterDateFrom || filterDateTo" @click="clearDateFilter"
                class="px-3 py-2 text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                title="Clear date filter">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Filter Dropdown -->


            <!-- Action Filter -->
            <div class="relative">
              <select v-model="filterAction"
                class="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-sm px-4 py-2 pr-8 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white">
                <option value="">{{ t('allActions') }}</option>
                <option value="login">{{ t('login') }}</option>
                <option value="logout">{{ t('logout') }}</option>
                <option value="add">{{ t('add') }}</option>
                <option value="update">{{ t('update') }}</option>
                <option value="delete">{{ t('delete') }}</option>
                <option value="stock">{{ t('stock') }}</option>
                <option value="damaged">{{ t('damaged') }}</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        :class="['overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-sm transition-all duration-300', uiStore.isFullscreen ? 'max-h-[588px]' : 'max-h-[453px]']">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{
                  t('no') }}</th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{
                  t('time') }}</th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{
                  t('createdCol') }}</th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{
                  t('action') }}</th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{
                  t('type') }}</th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{
                  t('item') }}</th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{
                  t('descriptionCol') }}</th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{
                  t('user') }}</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(entry, index) in filteredHistory" :key="entry.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ index + 1 }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{
                formatTime(entry.timestamp) }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{
                formatCreatedDate(entry.timestamp) }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getActionClass(entry.action)">
                  {{ entry.action.toUpperCase() }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getTypeClass(entry.type)">
                  {{ entry.type }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">{{ entry.itemName || '-' }}</td>
              <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{{ entry.description || '-' }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ entry.user }}</td>
            </tr>
            <tr v-if="filteredHistory.length === 0">
              <td colspan="8" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                {{ t('noHistory') }}
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
import { getHistory, filterHistory, formatTimestamp } from '../utils/history'
import { useI18n } from '../composables/useI18n'

import { useUIStore } from '../stores/ui'

const uiStore = useUIStore()
const isSidebarCollapsed = computed(() => uiStore.isSidebarCollapsed)
const { t } = useI18n()

const history = ref([])
const filterType = ref('')
const filterAction = ref('')
const searchQuery = ref('')
const filterDateFrom = ref('')
const filterDateTo = ref('')

// Load history on mount
onMounted(() => {
  loadHistory()
  // Refresh every 5 seconds to get new entries
  setInterval(loadHistory, 5000)
})

const loadHistory = () => {
  history.value = getHistory()
}

const filteredHistory = computed(() => {
  let filtered = filterHistory({
    type: filterType.value || undefined,
    action: filterAction.value || undefined,
    search: searchQuery.value || undefined
  })

  // Apply date range filter
  if (filterDateFrom.value || filterDateTo.value) {
    filtered = filtered.filter(entry => {
      const entryDate = new Date(entry.timestamp)
      entryDate.setHours(0, 0, 0, 0) // Reset time to start of day

      if (filterDateFrom.value && filterDateTo.value) {
        const fromDate = new Date(filterDateFrom.value)
        fromDate.setHours(0, 0, 0, 0)
        const toDate = new Date(filterDateTo.value)
        toDate.setHours(23, 59, 59, 999) // End of day
        return entryDate >= fromDate && entryDate <= toDate
      } else if (filterDateFrom.value) {
        const fromDate = new Date(filterDateFrom.value)
        fromDate.setHours(0, 0, 0, 0)
        return entryDate >= fromDate
      } else if (filterDateTo.value) {
        const toDate = new Date(filterDateTo.value)
        toDate.setHours(23, 59, 59, 999)
        return entryDate <= toDate
      }
      return true
    })
  }

  return filtered
})

// Summary statistics
const totalHistoryEntries = computed(() => {
  return history.value.length
})

const todayActivities = computed(() => {
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  return history.value.filter(entry => {
    const entryDate = new Date(entry.timestamp)
    return entryDate >= todayStart
  }).length
})

const mostCommonAction = computed(() => {
  const actionCounts = {}
  history.value.forEach(entry => {
    actionCounts[entry.action] = (actionCounts[entry.action] || 0) + 1
  })

  const sorted = Object.entries(actionCounts).sort((a, b) => b[1] - a[1])
  return {
    name: sorted[0] ? sorted[0][0].charAt(0).toUpperCase() + sorted[0][0].slice(1) : null,
    count: sorted[0] ? sorted[0][1] : 0
  }
})

const mostActiveUser = computed(() => {
  const userCounts = {}
  history.value.forEach(entry => {
    userCounts[entry.user] = (userCounts[entry.user] || 0) + 1
  })

  const sorted = Object.entries(userCounts).sort((a, b) => b[1] - a[1])
  return {
    name: sorted[0] ? sorted[0][0] : null,
    count: sorted[0] ? sorted[0][1] : 0
  }
})

const getActionClass = (action) => {
  const classes = {
    'login': 'bg-green-100 text-green-800',
    'logout': 'bg-red-100 text-red-800',
    'add': 'bg-blue-100 text-blue-800',
    'update': 'bg-yellow-100 text-yellow-800',
    'delete': 'bg-red-100 text-red-800',
    'stock': 'bg-green-100 text-green-800',
    'damaged': 'bg-orange-100 text-orange-800'
  }
  return classes[action.toLowerCase()] || 'bg-gray-100 text-gray-800'
}

const getTypeClass = (type) => {
  const classes = {
    'system': 'bg-purple-100 text-purple-800',
    'category': 'bg-blue-100 text-blue-800',
    'product': 'bg-green-100 text-green-800',
    'user': 'bg-yellow-100 text-yellow-800',
    'pos': 'bg-pink-100 text-pink-800',
    'report': 'bg-indigo-100 text-indigo-800'
  }
  return classes[type.toLowerCase()] || 'bg-gray-100 text-gray-800'
}

// Format timestamp for display (relative time)
const formatTime = (timestamp) => {
  return formatTimestamp(timestamp)
}

// Format created date (full date and time)
const formatCreatedDate = (timestamp) => {
  const date = new Date(timestamp)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${month}/${day}/${year} ${hours}:${minutes}`
}

// Clear date filter
const clearDateFilter = () => {
  filterDateFrom.value = ''
  filterDateTo.value = ''
}
</script>
