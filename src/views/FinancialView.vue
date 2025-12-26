<template>
  <div :class="['mx-auto transition-all duration-300', isSidebarCollapsed ? 'max-w-full px-2' : 'max-w-7xl']">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
      <!-- Total Income Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-green-600 dark:text-green-400">${{ totalIncome.toFixed(2) }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('totalIncome') }}</p>
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

      <!-- Total Expense Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-red-600 dark:text-red-400">${{ totalExpense.toFixed(2) }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('totalExpense') }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 dark:text-red-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Net Profit Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold" :class="netProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">${{ netProfit.toFixed(2) }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('netProfit') }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 mb-2 transition-colors duration-300">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">{{ t('incomeExpenseChart') }}</h3>
      <div class="h-[400px]">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <!-- Financial Records Table -->
    <div class="bg-white dark:bg-gray-800 rounded-sm shadow transition-colors duration-300">
      <!-- Header with Add Button -->
      <div class="p-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ t('financialRecords') }}</h3>
        <button @click="openAddDrawer"
          class="px-4 py-2 bg-blue-600 text-white text-[13px] rounded-sm hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          {{ t('addExpense') }}
        </button>
      </div>

      <!-- Search and Filter Bar -->
      <div class="p-2 border-b border-gray-200 dark:border-gray-700">
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
              <select v-model="selectedType"
                class="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-sm px-4 py-2 pr-8 text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white">
                <option value="">{{ t('allTypes') }}</option>
                <option value="income">{{ t('income') }}</option>
                <option value="expense">{{ t('expense') }}</option>
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

      <!-- Scrollable table container -->
      <div class="max-h-[520px] overflow-y-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
            <tr>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('no') }}
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('date') }}
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('type') }}
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('category') }}
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('description') }}
              </th>
              <th
                class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('source') }}
              </th>
              <th
                class="px-4 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('amount') }}
              </th>
              <th
                class="px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                {{ t('actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(record, index) in filteredRecords" :key="record.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ index + 1 }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ formatDate(record.date) }}</td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="record.type === 'income' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'">
                  {{ record.type === 'income' ? t('income') : t('expense') }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ record.category }}</td>
              <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{{ record.description }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                  {{ record.source }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-right"
                :class="record.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                ${{ record.amount.toFixed(2) }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-center">
                <button v-if="record.type === 'expense' && record.source === 'supplier'"
                  @click="handleEdit(record)"
                  class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mr-3"
                  :title="t('edit')">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button v-if="record.type === 'expense' && record.source === 'supplier'"
                  @click="handleDelete(record)"
                  class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                  :title="t('delete')">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-if="filteredRecords.length === 0">
              <td colspan="8" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                {{ t('noRecordsFound') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Expense Drawer -->
    <Transition name="drawer">
      <div v-if="showDrawer" class="fixed inset-0 bg-black bg-opacity-50 z-50" @click.self="closeDrawer">
        <div
          class="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl overflow-y-auto transition-colors duration-300">
          <div
            class="sticky top-0 bg-white dark:bg-gray-800 text-black dark:text-white px-6 py-5 flex items-center justify-between z-10 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <h2 class="text-xl font-bold text-black dark:text-white">
              {{ editingRecord ? t('editExpense') : t('addExpense') }}
            </h2>
            <button @click="closeDrawer"
              class="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm p-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <!-- Date -->
            <div>
              <label for="date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('date') }} <span class="text-red-500">*</span>
              </label>
              <input id="date" v-model="form.date" type="date" required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-[13px]" />
            </div>

            <!-- Category -->
            <div>
              <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('category') }} <span class="text-red-500">*</span>
              </label>
              <input id="category" v-model="form.category" type="text" required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px] placeholder-gray-500 dark:placeholder-gray-400"
                :placeholder="t('category')" />
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('description') }} <span class="text-red-500">*</span>
              </label>
              <textarea id="description" v-model="form.description" rows="3" required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px] placeholder-gray-500 dark:placeholder-gray-400"
                :placeholder="t('description')"></textarea>
            </div>

            <!-- Amount -->
            <div>
              <label for="amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('amount') }} <span class="text-red-500">*</span>
              </label>
              <input id="amount" v-model.number="form.amount" type="number" step="0.01" min="0" required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px] placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="0.00" />
            </div>

            <!-- Buttons -->
            <div class="flex gap-3 pt-4">
              <button type="submit"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium">
                {{ editingRecord ? t('update') : t('add') }}
              </button>
              <button type="button" @click="closeDrawer"
                class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">
                {{ t('cancel') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Confirmation Dialogs -->
    <ConfirmationDialog
      :show="showAddUpdateDialog"
      type="info"
      :title="editingRecord ? t('confirmUpdate') : t('confirmAdd')"
      :message="editingRecord ? `${t('confirmUpdateMessage')} ${t('expense')}: ${form.description || ''}` : `${t('confirmAddMessage')} ${t('expense')}: ${form.description || ''}`"
      :confirm-text="editingRecord ? t('update') : t('add')"
      :cancel-text="t('cancel')"
      @confirm="confirmSubmit"
      @cancel="showAddUpdateDialog = false"
    />

    <ConfirmationDialog
      :show="showDeleteDialog"
      type="delete"
      :title="t('confirmDelete')"
      :message="`${t('confirmDeleteMessage')} ${t('expense')}: ${recordToDelete?.description || ''}`"
      :confirm-text="t('yes') + ', ' + t('delete')"
      :cancel-text="t('cancel')"
      @confirm="confirmDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useToast } from '../composables/useToast'
import ConfirmationDialog from '../components/ConfirmationDialog.vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

// Use Pinia stores
import { useUIStore } from '../stores/ui'
import { useFinancialStore } from '../stores/financial'
import { useSalesStore } from '../stores/sales'

const uiStore = useUIStore()
const financialStore = useFinancialStore()
const salesStore = useSalesStore()
const { success, error: showErrorToast } = useToast()

const isSidebarCollapsed = computed(() => uiStore.isSidebarCollapsed)
const isDarkMode = computed(() => uiStore.isDarkMode)
const { t } = useI18n()


// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const searchQuery = ref('')
const selectedType = ref('')
const showDrawer = ref(false)
const editingRecord = ref(null)
const showDeleteDialog = ref(false)
const showAddUpdateDialog = ref(false)
const recordToDelete = ref(null)

const records = computed(() => financialStore.records)

// Form state
const form = reactive({
  date: '',
  category: '',
  description: '',
  amount: 0
})

// Initialize stores on mount
onMounted(async () => {
  await financialStore.init()
  await salesStore.init()
  
  // Generate sample website sales (you can replace this with actual website sales data)
  // For now, we'll create some sample data
  const websiteSales = [
    { date: '2024-08-12', amount: 450.00, products: ['Product A', 'Product B'] },
    { date: '2024-08-18', amount: 320.00, products: ['Product C'] },
    { date: '2024-08-22', amount: 680.00, products: ['Product D', 'Product E'] }
  ]

  // Note: Adding records directly to computed won't work
  // This should be handled in the store if you want to persist it
  
  // Set default date to today
  const today = new Date().toISOString().split('T')[0]
  form.date = today
})

const filteredRecords = computed(() => {
  let filtered = records.value || []

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(r =>
      (r.description && r.description.toLowerCase().includes(query)) ||
      (r.category && r.category.toLowerCase().includes(query)) ||
      (r.source && r.source.toLowerCase().includes(query))
    )
  }

  if (selectedType.value) {
    filtered = filtered.filter(r => r.type === selectedType.value)
  }

  // Sort by date descending
  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const totalIncome = computed(() => {
  if (!records.value || records.value.length === 0) return 0
  return records.value
    .filter(r => r.type === 'income')
    .reduce((sum, r) => sum + (r.amount || 0), 0)
})

const totalExpense = computed(() => {
  if (!records.value || records.value.length === 0) return 0
  return records.value
    .filter(r => r.type === 'expense')
    .reduce((sum, r) => sum + (r.amount || 0), 0)
})

const netProfit = computed(() => {
  return totalIncome.value - totalExpense.value
})

// Chart data
const chartData = computed(() => {
  // Group records by month
  const monthlyData = {}
  records.value.forEach(record => {
    const date = new Date(record.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expense: 0 }
    }
    if (record.type === 'income') {
      monthlyData[monthKey].income += record.amount
    } else {
      monthlyData[monthKey].expense += record.amount
    }
  })

  const sortedMonths = Object.keys(monthlyData).sort()
  const monthLabels = sortedMonths.map(month => {
    const [year, monthNum] = month.split('-')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${monthNames[parseInt(monthNum) - 1]} ${year}`
  })

  return {
    labels: monthLabels,
    datasets: [
      {
        label: t('income'),
        data: sortedMonths.map(month => monthlyData[month].income),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4
      },
      {
        label: t('expense'),
        data: sortedMonths.map(month => monthlyData[month].expense),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      }
    ]
  }
})

const chartOptions = computed(() => {
  const textColor = isDarkMode.value ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)'
  const gridColor = isDarkMode.value ? 'rgba(55, 65, 81, 0.3)' : 'rgba(0, 0, 0, 0.1)'

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColor
        },
        grid: {
          color: gridColor
        }
      },
      y: {
        ticks: {
          color: textColor,
          callback: function (value) {
            return '$' + value.toFixed(2)
          }
        },
        grid: {
          color: gridColor
        }
      }
    }
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

const openAddDrawer = () => {
  editingRecord.value = null
  resetForm()
  showDrawer.value = true
}

const closeDrawer = () => {
  showDrawer.value = false
  editingRecord.value = null
  resetForm()
}

const resetForm = () => {
  form.date = new Date().toISOString().split('T')[0]
  form.category = ''
  form.description = ''
  form.amount = 0
}

const handleEdit = (record) => {
  editingRecord.value = record
  form.date = record.date
  form.category = record.category
  form.description = record.description
  form.amount = record.amount
  showDrawer.value = true
}

const handleDelete = (record) => {
  recordToDelete.value = record
  showDeleteDialog.value = true
}

const handleSubmit = () => {
  // Validation
  if (!form.date || !form.category || !form.description || !form.amount || form.amount <= 0) {
    showErrorToast('Validation Error: Please fill in all required fields with valid values.')
    return
  }

  // Show confirmation dialog
  showAddUpdateDialog.value = true
}

const confirmSubmit = () => {
  showAddUpdateDialog.value = false

  if (editingRecord.value) {
    // Update existing record
    const index = records.value.findIndex(r => r.id === editingRecord.value.id)
    if (index !== -1) {
      records.value[index] = {
        ...records.value[index],
        date: form.date,
        category: form.category,
        description: form.description,
        amount: form.amount
      }
      success(`${t('expenseUpdated')}: ${form.description} ${t('expenseUpdatedSuccess')}`)
    }
  } else {
    // Add new expense record
    const newRecord = {
      id: `fin-${Date.now()}`,
      date: form.date,
      type: 'expense',
      category: form.category,
      description: form.description,
      amount: form.amount,
      source: 'supplier'
    }
    records.value.push(newRecord)
    success(`${t('expenseAdded')}: ${form.description} ${t('expenseAddedSuccess')}`)
  }
  closeDrawer()
}

const confirmDelete = () => {
  if (recordToDelete.value) {
    const recordDescription = recordToDelete.value.description
    const index = records.value.findIndex(r => r.id === recordToDelete.value.id)
    if (index !== -1) {
      records.value.splice(index, 1)
      success(`${t('expenseDeleted')}: ${recordDescription} ${t('expenseDeletedSuccess')}`)
    }
    showDeleteDialog.value = false
    recordToDelete.value = null
  }
}
</script>

<style scoped>
/* Drawer Animation */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-active .absolute,
.drawer-leave-active .absolute {
  transition: transform 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .absolute,
.drawer-leave-to .absolute {
  transform: translateX(100%);
}
</style>

