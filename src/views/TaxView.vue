<template>
  <div :class="['mx-auto transition-all duration-300', isSidebarCollapsed ? 'max-w-full px-2' : 'max-w-7xl']">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
      <!-- Total Tax Records Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ totalTaxRecords }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('totalTaxRecords') }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Current Tax Rate Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ currentTaxRate }}%</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('currentTaxRate') }}</p>
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

      <!-- Today's Tax Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-xl font-bold text-gray-800 dark:text-white">{{ todayTaxRate }}%</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('todayTaxRate') }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ formatDate(todayDate) }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Two-column layout: Form (left) and Table (right) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
      <!-- Left Panel: Add New Tax Form -->
      <div class="lg:col-span-1 bg-white dark:bg-gray-800 shadow rounded-sm p-3 transition-colors duration-300">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {{ editingTax ? t('editTax') : t('addNewTax') }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-2">
          <!-- Date Field -->
          <div>
            <label for="date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ t('date') }} <span class="text-red-500">*</span>
            </label>
            <input id="date" v-model="form.date" type="date" required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-[13px]" />
            <p v-if="errors.date" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.date }}</p>
          </div>

          <!-- Tax Rate Field -->
          <div>
            <label for="rate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ t('taxRate') }} (%) <span class="text-red-500">*</span>
            </label>
            <input id="rate" v-model.number="form.rate" type="number" min="0" max="100" step="0.01" required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px]"
              :placeholder="t('taxRatePlaceholder')" />
            <p v-if="errors.rate" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.rate }}</p>
          </div>

          <!-- Description Field -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ t('description') }}
            </label>
            <textarea id="description" v-model="form.description" rows="8"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px]"
              :placeholder="t('descriptionPlaceholder')"></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.description }}
            </p>
          </div>

          <!-- Add/Update Tax Button -->
          <div class="flex gap-2">
            <button type="submit"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium">
              {{ editingTax ? t('updateTax') : t('addTax') }}
            </button>
            <button v-if="editingTax" @click="cancelEdit" type="button"
              class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">
              {{ t('cancel') }}
            </button>
          </div>
        </form>
      </div>

      <!-- Right Panel: Tax List Table -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-sm p-2 transition-colors duration-300">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">{{ t('taxRecords') }}</h2>

        <!-- Search Bar -->
        <div class="mb-2 flex items-center justify-between">
          <div class="relative w-[300px]">
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
        </div>

        <!-- Scrollable table container with sticky header -->
        <div
          :class="['overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-sm transition-all duration-300', uiStore.isFullscreen ? 'max-h-[549px]' : 'max-h-[417px]']">
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
                  {{ t('date') }}
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('taxRate') }}
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('descriptionCol') }}
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('created') }}
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                </th>
              </tr>
            </thead>

            <!-- Scrollable Body -->
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(tax, index) in filteredTaxRecords" :key="tax.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ index + 1 }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {{ formatDate(tax.date) }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  <span
                    class="px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                    {{ tax.rate }}%
                  </span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  {{ tax.description || '-' }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ formatDate(tax.created) }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <div class="relative">
                    <button @click="toggleActionMenu(tax.id)"
                      class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="Actions">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>

                    <!-- Dropdown Menu -->
                    <div v-if="activeActionMenu === tax.id"
                      class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-sm shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                      <button @click="handleEdit(tax)"
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        {{ t('edit') }}
                      </button>
                      <button @click="handleDelete(tax)"
                        class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        {{ t('delete') }}
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialogs -->
    <ConfirmationDialog :show="showAddUpdateDialog" type="info"
      :title="editingTax ? t('confirmUpdate') : t('confirmAdd')"
      :message="editingTax ? `${t('confirmUpdateMessage')} ${t('taxRecords')}: ${form.date} - ${form.rate}%` : `${t('confirmAddMessage')} ${t('taxRecords')}: ${form.date} - ${form.rate}%`"
      :confirm-text="editingTax ? t('update') : t('add')" :cancel-text="t('cancel')" @confirm="confirmSubmit"
      @cancel="showAddUpdateDialog = false" />

    <ConfirmationDialog :show="showDeleteDialog" type="delete" :title="t('confirmDelete')"
      :message="`${t('confirmDeleteMessage')} ${t('taxRecords')}: ${formatDate(taxToDelete?.date)} - ${taxToDelete?.rate}%`"
      :confirm-text="t('yes') + ', ' + t('delete')" :cancel-text="t('no')" @confirm="confirmDelete"
      @cancel="showDeleteDialog = false" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { addHistory } from '../utils/history'
import { useI18n } from '../composables/useI18n'
import { useToast } from '../composables/useToast'
import ConfirmationDialog from '../components/ConfirmationDialog.vue'
import { useUIStore } from '../stores/ui'
import { useTaxStore } from '../stores/tax'

const uiStore = useUIStore()
const taxStore = useTaxStore()
const { success, error: showErrorToast } = useToast()

const isSidebarCollapsed = computed(() => uiStore.isSidebarCollapsed)
const { t } = useI18n()

// Use tax records from store - create local mutable copy for mutations
const taxRecords = ref([])

// Initialize stores on mount
onMounted(() => {
  taxStore.init()
  // Create local copy for mutations
  if (taxStore.taxRates && taxStore.taxRates.length > 0) {
    taxRecords.value = [...taxStore.taxRates]
  }
})

// Watch for store changes and update local copy
watch(() => taxStore.taxRates, (newTaxRates) => {
  if (newTaxRates && newTaxRates.length > 0) {
    taxRecords.value = [...newTaxRates]
  }
}, { immediate: true, deep: true })

// Form state
const form = reactive({
  date: '',
  rate: '',
  description: ''
})

// Form validation errors
const errors = reactive({
  date: '',
  rate: '',
  description: ''
})

// Search
const searchQuery = ref('')

// Action menu state
const activeActionMenu = ref(null)

// Edit state
const editingTax = ref(null)

// Confirmation dialog states
const showAddUpdateDialog = ref(false)
const showDeleteDialog = ref(false)
const taxToDelete = ref(null)

// Computed properties
const totalTaxRecords = computed(() => taxRecords.value?.length || 0)

const currentTaxRate = computed(() => {
  // Get the most recent tax rate
  if (!taxRecords.value || taxRecords.value.length === 0) return 0
  const sorted = [...taxRecords.value].sort((a, b) => new Date(b?.date || 0) - new Date(a?.date || 0))
  return sorted[0]?.rate || 0
})

const todayDate = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const todayTaxRate = computed(() => {
  // Get tax rate for today's date
  if (!taxRecords.value || taxRecords.value.length === 0) return 0
  const today = new Date().toISOString().split('T')[0]
  const todayTax = taxRecords.value.find(tax => tax && tax.date === today)
  return todayTax?.rate || currentTaxRate.value || 0
})

const filteredTaxRecords = computed(() => {
  let filtered = taxRecords.value || []

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(tax =>
      tax && (
        (tax.date && tax.date.toLowerCase().includes(query)) ||
        (tax.rate && tax.rate.toString().includes(query)) ||
        (tax.description && tax.description.toLowerCase().includes(query))
      )
    )
  }

  // Sort by date descending (most recent first)
  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

// Methods
// Format date
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

const handleSubmit = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => errors[key] = '')

  // Simple validation
  let hasErrors = false

  if (!form.date.trim()) {
    errors.date = t('date') + ' ' + t('isRequired')
    hasErrors = true
  }

  if (!form.rate || form.rate < 0 || form.rate > 100) {
    errors.rate = t('taxRate') + ' ' + t('isRequired') + ' (0-100)'
    hasErrors = true
  }

  if (hasErrors) {
    showErrorToast('Validation Error: Please fix the errors in the form.')
    return
  }

  // Show confirmation dialog
  showAddUpdateDialog.value = true
}

const confirmSubmit = () => {
  showAddUpdateDialog.value = false

  if (editingTax.value) {
    // Update existing tax record
    const index = taxRecords.value.findIndex(tax => tax.id === editingTax.value.id)
    if (index !== -1) {
      taxRecords.value[index] = {
        ...taxRecords.value[index],
        date: form.date,
        rate: parseFloat(form.rate),
        description: form.description || ''
      }
      // Log update history
      addHistory('update', {
        type: 'tax',
        itemName: `${form.date} - ${form.rate}%`,
        itemId: editingTax.value.id,
        description: `Tax "${form.date}" updated to ${form.rate}%`,
        user: 'Admin'
      })
      // Show success toast
      success(`${t('taxUpdated')}: "${form.date}" ${t('taxUpdatedSuccess')}`)
    }
    // Reset edit state
    editingTax.value = null
  } else {
    // Check if tax for this date already exists
    const existingTax = taxRecords.value.find(tax => tax.date === form.date)
    if (existingTax) {
      errors.date = t('taxAlreadyExists')
      return
    }

    // Add new tax record
    const newTax = {
      id: taxRecords.value.length > 0 ? Math.max(...taxRecords.value.map(t => t.id)) + 1 : 1,
      date: form.date,
      rate: parseFloat(form.rate),
      description: form.description || '',
      created: new Date().toISOString().split('T')[0]
    }
    taxRecords.value.push(newTax)
    // Log add history
    addHistory('add', {
      type: 'tax',
      itemName: `${form.date} - ${form.rate}%`,
      itemId: newTax.id,
      description: `Tax "${form.date}" added with rate ${form.rate}%`,
      user: 'Admin'
    })
    // Show success toast
    success(`${t('taxAdded')}: "${form.date}" ${t('taxAddedSuccess')}`)
  }

  // Clear form
  form.date = ''
  form.rate = ''
  form.description = ''
  Object.keys(errors).forEach(key => errors[key] = '')
  activeActionMenu.value = null
}

const toggleActionMenu = (taxId) => {
  activeActionMenu.value = activeActionMenu.value === taxId ? null : taxId
}

const handleEdit = (tax) => {
  editingTax.value = tax
  form.date = tax.date
  form.rate = tax.rate
  form.description = tax.description || ''
  activeActionMenu.value = null
}

const cancelEdit = () => {
  editingTax.value = null
  form.date = ''
  form.rate = ''
  form.description = ''
  Object.keys(errors).forEach(key => errors[key] = '')
}

const handleDelete = (tax) => {
  taxToDelete.value = tax
  showDeleteDialog.value = true
  activeActionMenu.value = null
}

// Removed - using useToast composable

const confirmDelete = () => {
  if (taxToDelete.value) {
    const taxDate = taxToDelete.value.date
    const taxRate = taxToDelete.value.rate
    const taxId = taxToDelete.value.id
    const index = taxRecords.value.findIndex(tax => tax.id === taxToDelete.value.id)
    if (index !== -1) {
      taxRecords.value.splice(index, 1)
      // Log delete history
      addHistory('delete', {
        type: 'tax',
        itemName: `${taxDate} - ${taxRate}%`,
        itemId: taxId,
        description: `Tax "${taxDate}" deleted`,
        user: 'Admin'
      })
      // Show success toast after deletion
      success(`${t('taxDeleted')}: "${taxDate}" ${t('taxDeletedSuccess')}`)
    }
  }
  showDeleteDialog.value = false
  taxToDelete.value = null
}

// Close action menu when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    activeActionMenu.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  // Set default date to today
  form.date = new Date().toISOString().split('T')[0]
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Toast Animation */
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
