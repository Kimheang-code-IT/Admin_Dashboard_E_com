<template>
  <div :class="['mx-auto transition-all duration-300', isSidebarCollapsed ? 'max-w-full px-2' : 'max-w-7xl']">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
      <!-- Total Categories Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ totalCategories }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('totalCategories') }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Products Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ totalProducts }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('totalProducts') }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Top Category Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-xl font-bold text-gray-800 dark:text-white">{{ topCategory.name }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('topCategory') }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 text-right">{{ t('products') }} {{
              topCategory.products }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Two-column layout: Form (left) and Table (right) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
      <!-- Left Panel: Add New Category Form -->
      <div class="lg:col-span-1 bg-white dark:bg-gray-800 shadow rounded-sm p-3 transition-colors duration-300">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {{ editingCategory ? t('editCategory') : t('addNewCategory') }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-2">
          <!-- Category Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ t('categoryName') }} <span class="text-red-500">*</span>
            </label>
            <input id="name" v-model="form.name" type="text" required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px]"
              :placeholder="t('categoryPlaceholder')" />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.name }}</p>
          </div>

          <!-- Description Field -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ t('description') }}
            </label>
            <textarea id="description" v-model="form.description" rows="8"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px]"
              :placeholder="t('descriptionPlaceholder')"></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
          </div>

          <!-- Add/Update Category Button -->
          <div class="flex gap-2">
            <button type="button" @click="handleSubmitClick"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium">
              {{ editingCategory ? t('updateCategory') : t('addCategory') }}
            </button>
            <button v-if="editingCategory" @click="cancelEdit" type="button"
              class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">
              {{ t('cancel') }}
            </button>
          </div>
        </form>
      </div>

      <!-- Right Panel: Category List Table -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-sm p-2 transition-colors duration-300">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">{{ t('categories') }}</h2>

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
          :class="['overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-sm transition-all duration-300', uiStore.isFullscreen ? 'max-h-[550px]' : 'max-h-[420px]']">
          <table class="w-full">
            <!-- Sticky Header -->
            <thead class="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
              <tr>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('no') }}
                </th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                  {{ t('name') }}
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('descriptionCol') }}
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('total') }}
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
              <tr v-for="(category, index) in filteredCategories" :key="category.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ index + 1 }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs"
                      :style="{ backgroundColor: getCategoryColor(category.name) }">
                      {{ category.name.charAt(0).toUpperCase() }}
                    </div>
                    <span>{{ category.name }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  {{ category.description || '-' }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ getProductCount(category.name) }} {{ t('items') }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ formatDate(category.created) }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <div class="relative">
                    <button @click="toggleActionMenu(category.id)"
                      class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="Actions">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>

                    <!-- Dropdown Menu -->
                    <div v-if="activeActionMenu === category.id"
                      class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-sm shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                      <button @click="handleEdit(category)"
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        {{ t('edit') }}
                      </button>
                      <button @click="handleDelete(category)"
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
    <ConfirmationDialog :show="showCreateDialog" type="confirm" :title="t('confirmCreate')"
      :message="t('confirmCreateMessage')" :confirm-text="t('confirm')" :cancel-text="t('cancel')"
      @confirm="confirmCreate" @cancel="showCreateDialog = false" />

    <ConfirmationDialog :show="showUpdateDialog" type="confirm" :title="t('confirmUpdate')"
      :message="t('confirmUpdateMessage')" :confirm-text="t('confirm')" :cancel-text="t('cancel')"
      @confirm="confirmUpdate" @cancel="showUpdateDialog = false" />

    <ConfirmationDialog :show="showDeleteDialog" type="delete" :title="t('confirmDelete')"
      :message="`${t('confirmDeleteMessage')} ${t('category')}: ${categoryToDelete?.name || ''}`"
      :confirm-text="t('yes') + ', ' + t('delete')" :cancel-text="t('no')" @confirm="confirmDelete"
      @cancel="showDeleteDialog = false" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { addHistory } from '../utils/history'
import { useI18n } from '../composables/useI18n'
import { useUIStore } from '../stores/ui'
import { useCategoriesStore } from '../stores/categories'
import { useProductsStore } from '../stores/products'
import { useToast } from '../composables/useToast'
import ConfirmationDialog from '../components/ConfirmationDialog.vue'

const uiStore = useUIStore()
const categoriesStore = useCategoriesStore()
const productsStore = useProductsStore()
const { success } = useToast()

const isSidebarCollapsed = computed(() => uiStore.isSidebarCollapsed)
const { t } = useI18n()

// Use categories from store
const categories = computed(() => categoriesStore.categories)

// Initialize stores on mount
onMounted(() => {
  categoriesStore.init()
  productsStore.init()
})

// Form state
const form = reactive({
  name: '',
  description: ''
})

// Form validation errors
const errors = reactive({
  name: '',
  description: ''
})

// Search
const searchQuery = ref('')

// Action menu state
const activeActionMenu = ref(null)

// Edit state
const editingCategory = ref(null)

// Confirmation dialog states
const showCreateDialog = ref(false)
const showUpdateDialog = ref(false)
const showDeleteDialog = ref(false)
const categoryToDelete = ref(null)

// Computed properties
const totalCategories = computed(() => categories.value?.length || 0)

const totalProducts = computed(() => {
  // Calculate total products that are in stock (inStock > 0)
  if (!productsStore.products || productsStore.products.length === 0) return 0
  return productsStore.products.filter(p => p && p.inStock > 0).length
})

const topCategory = computed(() => {
  if (!categories.value || categories.value.length === 0) {
    return { name: 'N/A', products: 0 }
  }
  const sorted = [...categories.value].sort((a, b) => (b?.totalProduct || 0) - (a?.totalProduct || 0))
  return sorted[0] || { name: 'N/A', products: 0 }
})

const filteredCategories = computed(() => {
  let filtered = categories.value || []

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(cat =>
      cat && (
        (cat.name && cat.name.toLowerCase().includes(query)) ||
        (cat.description && cat.description.toLowerCase().includes(query))
      )
    )
  }

  return filtered
})

// Methods
const getCategoryColor = (name) => {
  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

// Get product count for a category from products store
const getProductCount = (categoryName) => {
  if (!productsStore.products || productsStore.products.length === 0) return 0
  return productsStore.products.filter(p => p.category === categoryName).length
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) {
    // If no created date, use a default or current date
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const year = now.getFullYear()
    return `${month}/${day}/${year}`
  }
  const date = new Date(dateString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

const handleSubmitClick = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => errors[key] = '')

  // Simple validation
  let hasErrors = false

  if (!form.name.trim()) {
    errors.name = t('name') + ' ' + t('isRequired')
    hasErrors = true
  }

  if (hasErrors) {
    return
  }

  // Show confirmation dialog
  if (editingCategory.value) {
    showUpdateDialog.value = true
  } else {
    showCreateDialog.value = true
  }
}

const confirmCreate = () => {
  showCreateDialog.value = false

  // Add new category
  const newCategory = {
    id: categories.value.length + 1,
    name: form.name,
    description: form.description || '',
    totalProduct: 0,
    created: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
  }
  categories.value.push(newCategory)

  // Update store
  categoriesStore.addCategory(newCategory)

  // Log add history
  addHistory('add', {
    type: 'category',
    itemName: form.name,
    itemId: newCategory.id,
    description: `Category "${form.name}" added`,
    user: 'Admin'
  })

  // Show success toast
  success(t('categoryAdded') + ': ' + form.name)

  // Clear form
  form.name = ''
  form.description = ''
  Object.keys(errors).forEach(key => errors[key] = '')
  activeActionMenu.value = null
}

const confirmUpdate = () => {
  showUpdateDialog.value = false

  // Update existing category
  const index = categories.value.findIndex(cat => cat.id === editingCategory.value.id)
  if (index !== -1) {
    const updatedCategory = {
      ...categories.value[index],
      name: form.name,
      description: form.description || ''
    }
    categories.value[index] = updatedCategory

    // Update store
    categoriesStore.updateCategory(updatedCategory)

    // Log update history
    addHistory('update', {
      type: 'category',
      itemName: form.name,
      itemId: editingCategory.value.id,
      description: `Category "${form.name}" updated`,
      user: 'Admin'
    })

    // Show success toast
    success(t('categoryUpdated') + ': ' + form.name)
  }

  // Reset edit state
  editingCategory.value = null

  // Clear form
  form.name = ''
  form.description = ''
  Object.keys(errors).forEach(key => errors[key] = '')
  activeActionMenu.value = null
}

const toggleActionMenu = (categoryId) => {
  activeActionMenu.value = activeActionMenu.value === categoryId ? null : categoryId
}

const handleEdit = (category) => {
  editingCategory.value = category
  form.name = category.name
  form.description = category.description || ''
  activeActionMenu.value = null
}

const cancelEdit = () => {
  editingCategory.value = null
  form.name = ''
  form.description = ''
  Object.keys(errors).forEach(key => errors[key] = '')
}

const handleDelete = (category) => {
  categoryToDelete.value = category
  showDeleteDialog.value = true
  activeActionMenu.value = null
}

const confirmDelete = () => {
  showDeleteDialog.value = false

  if (categoryToDelete.value) {
    const categoryName = categoryToDelete.value.name
    const categoryId = categoryToDelete.value.id
    const index = categories.value.findIndex(cat => cat.id === categoryToDelete.value.id)
    if (index !== -1) {
      categories.value.splice(index, 1)

      // Update store
      categoriesStore.deleteCategory(categoryId)

      // Log delete history
      addHistory('delete', {
        type: 'category',
        itemName: categoryName,
        itemId: categoryId,
        description: `Category "${categoryName}" deleted`,
        user: 'Admin'
      })

      // Show success toast
      success(t('categoryDeleted') + ': ' + categoryName)
    }
  }
  categoryToDelete.value = null
}

// Close action menu when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    activeActionMenu.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
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
