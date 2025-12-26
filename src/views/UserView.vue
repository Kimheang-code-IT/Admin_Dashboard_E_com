<template>
  <div :class="['mx-auto transition-all duration-300', isSidebarCollapsed ? 'max-w-full px-2' : 'max-w-7xl']">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
      <!-- Total Users Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ totalUsers }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('totalUsers') }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Active Users Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ activeUsers }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('activeUsers') }}</p>
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

      <!-- Male Users Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ maleUsers }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('maleUsers') }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">{{ malePercentage }}% {{ t('ofTotal') }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Female Users Card -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow p-3 transition-colors duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ femaleUsers }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ t('femaleUsers') }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">{{ femalePercentage }}% {{ t('ofTotal') }}</p>
          </div>
          <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- User Tab Content -->
    <div v-show="activeTab === 'user'">
      <!-- Users Table -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow transition-colors duration-300">
        <!-- Tab Navigation -->
        <div
          class="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div class="flex">
            <button @click="activeTab = 'user'" :class="['px-6 py-3 text-sm font-medium transition-colors border-b-2', activeTab === 'user'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300']">
              {{ t('user') }}
            </button>
            <button @click="activeTab = 'role'" :class="['px-6 py-3 text-sm font-medium transition-colors border-b-2', activeTab === 'role'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300']">
              {{ t('role') }}
            </button>
            <button @click="activeTab = 'permission'" :class="['px-6 py-3 text-sm font-medium transition-colors border-b-2', activeTab === 'permission'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300']">
              {{ t('permission') }}
            </button>
          </div>
        </div>
        <!-- Search Bar -->
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
              <input v-model="searchQuery" type="text" :placeholder="t('searchByNameEmail')"
                class="w-full pl-10 pr-4 py-2 text-[13px] border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px]" />
            </div>
            <button @click="openAddDrawer"
              class="px-6 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ t('addUser') }}
            </button>
          </div>
        </div>
        <!-- Scrollable table container with sticky header -->
        <div
          :class="['overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-sm transition-all duration-300', uiStore.isFullscreen ? 'max-h-[540px]' : 'max-h-[407px]']">
          <table class="w-full">
            <!-- Sticky Header -->
            <thead class="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
              <tr>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('no') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('name') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('gender') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('created') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('loginTime') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('logoutTime') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('totalTime') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(user, index) in filteredUsers" :key="user.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ index + 1 }}</td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0"
                      :class="user.gender === 'Male' || user.gender === t('male') ? 'bg-blue-500' : 'bg-pink-500'">
                      {{ user.name.charAt(0) }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="font-medium text-gray-900 dark:text-white">{{ user.name }}</div>
                      <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span class="truncate">{{ user.email || '-' }}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">
                  <span class="px-2 py-1 text-xs font-medium rounded-full"
                    :class="(user.gender === 'Male' || user.gender === t('male')) ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'">
                    {{ (user.gender === 'Male' || user.gender === t('male')) ? t('male') : t('female') }}
                  </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{
                  formatDate(user.created) }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ user.loginTime }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ user.logoutTime ||
                  '-'
                  }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-medium">{{
                  calculateTotalTime(user.loginTime, user.logoutTime) }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <div class="relative">
                    <button @click="toggleActionMenu(user.id)"
                      class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="Actions">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>

                    <!-- Dropdown Menu -->
                    <div v-if="activeActionMenu === user.id"
                      class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-sm shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                      <button @click="handleEdit(user)"
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        {{ t('edit') }}
                      </button>
                      <button @click="handleDelete(user)"
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

      <!-- Add/Edit User Drawer -->
      <div v-if="showDrawer" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
        @click.self="closeDrawer">
        <div
          class="bg-white dark:bg-gray-800 w-[500px] h-full shadow-xl overflow-y-auto transition-colors duration-300">
          <!-- Drawer Header -->
          <div
            class="sticky top-0 bg-white dark:bg-gray-800 text-black dark:text-white px-6 py-5 flex items-center justify-between z-10 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black dark:text-white" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-black dark:text-white">{{ isEditMode ? t('editUser') : t('addUser') }}
              </h2>
            </div>
            <button @click="closeDrawer"
              class="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm p-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black dark:text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Drawer Content -->
          <div class="p-6">
            <form @submit.prevent="handleSubmit" class="space-y-5">
              <!-- Name Field -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('userForm.nameLabel') }} <span class="text-red-500">*</span>
                </label>
                <input v-model="form.name" type="text" required :placeholder="t('userForm.namePlaceholder')"
                  class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px] placeholder-gray-500 dark:placeholder-gray-400" />
              </div>

              <!-- Email Field -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('userForm.emailLabel') }} <span class="text-red-500">*</span>
                </label>
                <input v-model="form.email" type="email" required :placeholder="t('userForm.emailPlaceholder')"
                  class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px] placeholder-gray-500 dark:placeholder-gray-400" />
              </div>

              <!-- Gender Field -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ t('userForm.genderLabel') }} <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <select v-model="form.gender" required
                    class="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">{{ t('userForm.selectGender') }}</option>
                    <option value="Male">{{ t('male') }}</option>
                    <option value="Female">{{ t('female') }}</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button type="button" @click="closeDrawer"
                  class="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300 transition-colors font-medium">
                  {{ t('cancel') }}
                </button>
                <button type="submit"
                  class="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium">
                  {{ isEditMode ? t('update') : t('add') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Confirmation Dialogs -->
      <ConfirmationDialog :show="showAddUpdateDialog" type="info"
        :title="isEditMode ? t('confirmUpdate') : t('confirmAdd')"
        :message="isEditMode ? `${t('confirmUpdateMessage')} ${t('user')}: ${form.name}` : `${t('confirmAddMessage')} ${t('user')}: ${form.name}`"
        :confirm-text="isEditMode ? t('update') : t('add')" :cancel-text="t('cancel')" @confirm="confirmSubmit"
        @cancel="showAddUpdateDialog = false" />

      <ConfirmationDialog :show="showDeleteDialog" type="delete" :title="t('confirmDelete')"
        :message="`${t('confirmDeleteMessage')} ${t('user')}: ${userToDelete?.name || ''}`" :confirm-text="t('delete')"
        :cancel-text="t('cancel')" @confirm="confirmDelete" @cancel="showDeleteDialog = false" />
    </div>

    <!-- Role Tab Content -->
    <div v-show="activeTab === 'role'">
      <!-- Roles Table -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow transition-colors duration-300">
        <!-- Tab Navigation -->
        <div
          class="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div class="flex">
            <button @click="activeTab = 'user'" :class="['px-6 py-3 text-sm font-medium transition-colors border-b-2', activeTab === 'user'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300']">
              {{ t('user') }}
            </button>
            <button @click="activeTab = 'role'" :class="['px-6 py-3 text-sm font-medium transition-colors border-b-2', activeTab === 'role'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300']">
              {{ t('role') }}
            </button>
            <button @click="activeTab = 'permission'" :class="['px-6 py-3 text-sm font-medium transition-colors border-b-2', activeTab === 'permission'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300']">
              {{ t('permission') }}
            </button>
          </div>
        </div>
        <!-- Search and Add Bar -->
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
              <input v-model="roleSearchQuery" type="text" :placeholder="t('searchRole')"
                class="w-full pl-10 pr-4 py-2 text-[13px] border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px]" />
            </div>
            <button @click="openAddRoleDrawer"
              class="px-6 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ t('addRole') }}
            </button>
          </div>
        </div>
        <!-- Scrollable table container with sticky header -->
        <div
          :class="['overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-sm transition-all duration-300', uiStore.isFullscreen ? 'max-h-[540px]' : 'max-h-[407px]']">
          <table class="w-full">
            <!-- Sticky Header -->
            <thead class="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
              <tr>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('no') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('roleName') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('description') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('permissions') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('users') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('created') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(role, index) in filteredRoles" :key="role.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ index + 1 }}</td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 bg-indigo-500">
                      {{ role.name.charAt(0).toUpperCase() }}
                    </div>
                    <span class="font-medium text-gray-900 dark:text-white">{{ role.name }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{{ role.description || '-' }}</td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex flex-wrap gap-1">
                    <span v-for="(perm, idx) in role.permissions.slice(0, 3)" :key="idx"
                      class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-sm">
                      {{ perm }}
                    </span>
                    <span v-if="role.permissions.length > 3"
                      class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-sm">
                      +{{ role.permissions.length - 3 }}
                    </span>
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {{ getUsersCountForRole(role.id) }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{
                  formatDate(role.created) }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <div class="relative">
                    <button @click="toggleRoleActionMenu(role.id)"
                      class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="Actions">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                    <!-- Dropdown Menu -->
                    <div v-if="activeRoleActionMenu === role.id"
                      class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-sm shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                      <button @click="handleEditRole(role)"
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        {{ t('edit') }}
                      </button>
                      <button @click="handleDeleteRole(role)"
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

    <!-- Permission Tab Content -->
    <div v-show="activeTab === 'permission'">
      <!-- Permissions Table -->
      <div class="bg-white dark:bg-gray-800 rounded-sm shadow transition-colors duration-300">
        <!-- Tab Navigation -->
        <div
          class="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div class="flex">
            <button @click="activeTab = 'user'" :class="['px-6 py-3 text-sm font-medium transition-colors border-b-2', activeTab === 'user'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300']">
              {{ t('user') }}
            </button>
            <button @click="activeTab = 'role'" :class="['px-6 py-3 text-sm font-medium transition-colors border-b-2', activeTab === 'role'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300']">
              {{ t('role') }}
            </button>
            <button @click="activeTab = 'permission'" :class="['px-6 py-3 text-sm font-medium transition-colors border-b-2', activeTab === 'permission'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300']">
              {{ t('permission') }}
            </button>
          </div>
        </div>
        <!-- Search and Add Bar -->
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
              <input v-model="permissionSearchQuery" type="text" :placeholder="t('searchPermission')"
                class="w-full pl-10 pr-4 py-2 text-[13px] border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px]" />
            </div>
            <button @click="openAddPermissionDrawer"
              class="px-6 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ t('addPermission') }}
            </button>
          </div>
        </div>
        <!-- Scrollable table container with sticky header -->
        <div
          :class="['overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-sm transition-all duration-300', uiStore.isFullscreen ? 'max-h-[540px]' : 'max-h-[407px]']">
          <table class="w-full">
            <!-- Sticky Header -->
            <thead class="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
              <tr>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('no') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('permissionName') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('module') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('action') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('roles') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                  {{ t('created') }}</th>
                <th
                  class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(permission, index) in filteredPermissions" :key="permission.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{ index + 1 }}</td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 bg-green-500">
                      {{ permission.name.charAt(0).toUpperCase() }}
                    </div>
                    <span class="font-medium text-gray-900 dark:text-white">{{ permission.name }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  <span
                    class="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-sm">
                    {{ permission.module }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  <span
                    class="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-sm">
                    {{ permission.action }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  {{ getRolesCountForPermission(permission.id) }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{{
                  formatDate(permission.created) }}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <div class="relative">
                    <button @click="togglePermissionActionMenu(permission.id)"
                      class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title="Actions">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                    <!-- Dropdown Menu -->
                    <div v-if="activePermissionActionMenu === permission.id"
                      class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-sm shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                      <button @click="handleEditPermission(permission)"
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        {{ t('edit') }}
                      </button>
                      <button @click="handleDeletePermission(permission)"
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

    <!-- Add/Edit Role Drawer -->
    <div v-if="showRoleDrawer" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
      @click.self="closeRoleDrawer">
      <div class="bg-white dark:bg-gray-800 w-[500px] h-full shadow-xl overflow-y-auto transition-colors duration-300">
        <!-- Drawer Header -->
        <div
          class="sticky top-0 bg-white dark:bg-gray-800 text-black dark:text-white px-6 py-5 flex items-center justify-between z-10 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-sm flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black dark:text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-black dark:text-white">{{ isEditRoleMode ? t('editRole') : t('addRole') }}
            </h2>
          </div>
          <button @click="closeRoleDrawer"
            class="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm p-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black dark:text-white" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <!-- Drawer Content -->
        <div class="p-6">
          <form @submit.prevent="handleRoleSubmit" class="space-y-5">
            <!-- Role Name Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('roleName') }} <span class="text-red-500">*</span>
              </label>
              <input v-model="roleForm.name" type="text" required :placeholder="t('enterRoleName')"
                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px] placeholder-gray-500 dark:placeholder-gray-400" />
            </div>
            <!-- Description Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('description') }}
              </label>
              <textarea v-model="roleForm.description" rows="4" :placeholder="t('enterDescription')"
                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px] placeholder-gray-500 dark:placeholder-gray-400"></textarea>
            </div>
            <!-- Permissions Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('permissions') }} <span class="text-red-500">*</span>
              </label>
              <div
                class="max-h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-sm p-3 bg-white dark:bg-gray-700">
                <div v-for="permission in availablePermissions" :key="permission.id" class="flex items-center mb-2">
                  <input :id="`perm-${permission.id}`" type="checkbox" :value="permission.action"
                    v-model="roleForm.permissions"
                    class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500" />
                  <label :for="`perm-${permission.id}`"
                    class="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                    {{ permission.name }} ({{ permission.module }})
                  </label>
                </div>
              </div>
            </div>
            <!-- Form Actions -->
            <div class="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button type="button" @click="closeRoleDrawer"
                class="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300 transition-colors font-medium">
                {{ t('cancel') }}
              </button>
              <button type="submit"
                class="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium">
                {{ isEditRoleMode ? t('update') : t('add') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add/Edit Permission Drawer -->
    <div v-if="showPermissionDrawer" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
      @click.self="closePermissionDrawer">
      <div class="bg-white dark:bg-gray-800 w-[500px] h-full shadow-xl overflow-y-auto transition-colors duration-300">
        <!-- Drawer Header -->
        <div
          class="sticky top-0 bg-white dark:bg-gray-800 text-black dark:text-white px-6 py-5 flex items-center justify-between z-10 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-sm flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black dark:text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-black dark:text-white">{{ isEditPermissionMode ? t('editPermission') :
              t('addPermission') }}
            </h2>
          </div>
          <button @click="closePermissionDrawer"
            class="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm p-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black dark:text-white" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <!-- Drawer Content -->
        <div class="p-6">
          <form @submit.prevent="handlePermissionSubmit" class="space-y-5">
            <!-- Permission Name Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('permissionName') }} <span class="text-red-500">*</span>
              </label>
              <input v-model="permissionForm.name" type="text" required :placeholder="t('enterPermissionName')"
                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-[13px] placeholder-gray-500 dark:placeholder-gray-400" />
            </div>
            <!-- Module Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('module') }} <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select v-model="permissionForm.module" required
                  class="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">{{ t('selectModule') }}</option>
                  <option value="User">{{ t('user') }}</option>
                  <option value="Product">{{ t('product') }}</option>
                  <option value="Category">{{ t('category') }}</option>
                  <option value="Report">{{ t('report') }}</option>
                  <option value="Dashboard">{{ t('dashboard') }}</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <!-- Action Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('action') }} <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <select v-model="permissionForm.action" required
                  class="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="">{{ t('selectAction') }}</option>
                  <option value="view">{{ t('view') }}</option>
                  <option value="create">{{ t('add') }}</option>
                  <option value="update">{{ t('update') }}</option>
                  <option value="delete">{{ t('delete') }}</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <!-- Form Actions -->
            <div class="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button type="button" @click="closePermissionDrawer"
                class="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300 transition-colors font-medium">
                {{ t('cancel') }}
              </button>
              <button type="submit"
                class="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors font-medium">
                {{ isEditPermissionMode ? t('update') : t('add') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useToast } from '../composables/useToast'
import ConfirmationDialog from '../components/ConfirmationDialog.vue'
import { useUIStore } from '../stores/ui'
import { useUsersStore } from '../stores/users'

const uiStore = useUIStore()
const usersStore = useUsersStore()
const { success, error: showErrorToast } = useToast()

const isSidebarCollapsed = computed(() => uiStore.isSidebarCollapsed)
const { t } = useI18n()

// Use users from store - create local mutable copy for mutations
const users = ref([])

// Initialize stores on mount
onMounted(() => {
  usersStore.init()
  // Create local copy for mutations
  if (usersStore.users && usersStore.users.length > 0) {
    users.value = [...usersStore.users]
  }
})

// Watch for store changes and update local copy
watch(() => usersStore.users, (newUsers) => {
  if (newUsers && newUsers.length > 0) {
    users.value = [...newUsers]
  }
}, { immediate: true, deep: true })

// Tab state
const activeTab = ref('user')

// User tab state
const searchQuery = ref('')
const showDrawer = ref(false)
const isEditMode = ref(false)
const activeActionMenu = ref(null)
const showDeleteDialog = ref(false)
const userToDelete = ref(null)
const showAddUpdateDialog = ref(false)

// Role tab state
const roleSearchQuery = ref('')
const roles = ref([
  { id: 1, name: 'Admin', description: 'Full system access', permissions: ['view', 'create', 'update', 'delete'], created: '2024-01-01' },
  { id: 2, name: 'Manager', description: 'Manage products and categories', permissions: ['view', 'create', 'update'], created: '2024-01-02' },
  { id: 3, name: 'Staff', description: 'View and create only', permissions: ['view', 'create'], created: '2024-01-03' }
])
const showRoleDrawer = ref(false)
const isEditRoleMode = ref(false)
const activeRoleActionMenu = ref(null)
const roleToDelete = ref(null)
const roleForm = ref({
  id: null,
  name: '',
  description: '',
  permissions: []
})

// Permission tab state
const permissionSearchQuery = ref('')
const permissions = ref([
  { id: 1, name: 'View Users', module: 'User', action: 'view', created: '2024-01-01' },
  { id: 2, name: 'Create Users', module: 'User', action: 'create', created: '2024-01-01' },
  { id: 3, name: 'Update Users', module: 'User', action: 'update', created: '2024-01-01' },
  { id: 4, name: 'Delete Users', module: 'User', action: 'delete', created: '2024-01-01' },
  { id: 5, name: 'View Products', module: 'Product', action: 'view', created: '2024-01-01' },
  { id: 6, name: 'Create Products', module: 'Product', action: 'create', created: '2024-01-01' },
  { id: 7, name: 'Update Products', module: 'Product', action: 'update', created: '2024-01-01' },
  { id: 8, name: 'Delete Products', module: 'Product', action: 'delete', created: '2024-01-01' }
])
const showPermissionDrawer = ref(false)
const isEditPermissionMode = ref(false)
const activePermissionActionMenu = ref(null)
const permissionToDelete = ref(null)
const permissionForm = ref({
  id: null,
  name: '',
  module: '',
  action: ''
})

// Form data
const form = ref({
  id: null,
  name: '',
  email: '',
  gender: ''
})

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

const toggleActionMenu = (userId) => {
  activeActionMenu.value = activeActionMenu.value === userId ? null : userId
}

const openAddDrawer = () => {
  isEditMode.value = false
  form.value = {
    id: null,
    name: '',
    email: '',
    gender: ''
  }
  showDrawer.value = true
  activeActionMenu.value = null
}

const handleEdit = (user) => {
  isEditMode.value = true
  form.value = {
    id: user.id,
    name: user.name,
    email: user.email,
    gender: user.gender
  }
  showDrawer.value = true
  activeActionMenu.value = null
}

const handleDelete = (user) => {
  userToDelete.value = user
  showDeleteDialog.value = true
  activeActionMenu.value = null
}

const confirmDelete = () => {
  if (userToDelete.value) {
    const index = users.value.findIndex(u => u.id === userToDelete.value.id)
    if (index !== -1) {
      users.value.splice(index, 1)
      success(`${t('userDeleted')}: ${userToDelete.value.name} ${t('userDeletedSuccess')}`)
    }
  }
  showDeleteDialog.value = false
  userToDelete.value = null
}

const handleSubmit = () => {
  // Show confirmation dialog
  showAddUpdateDialog.value = true
}

const confirmSubmit = () => {
  showAddUpdateDialog.value = false

  if (isEditMode.value) {
    // Update existing user
    const index = users.value.findIndex(u => u.id === form.value.id)
    if (index !== -1) {
      users.value[index] = {
        ...users.value[index],
        name: form.value.name,
        email: form.value.email,
        gender: form.value.gender
      }
      success(`${t('userUpdated')}: ${form.value.name} ${t('userUpdatedSuccess')}`)
    }
  } else {
    // Add new user
    const newId = users.value.length > 0 ? Math.max(...users.value.map(u => u.id)) + 1 : 1
    const newUser = {
      id: newId,
      name: form.value.name,
      email: form.value.email,
      gender: form.value.gender,
      created: new Date().toISOString().split('T')[0],
      loginTime: '',
      logoutTime: ''
    }
    users.value.push(newUser)
    success(`${t('userAdded')}: ${form.value.name} ${t('userAddedSuccess')}`)
  }
  closeDrawer()
}

const closeDrawer = () => {
  showDrawer.value = false
  isEditMode.value = false
  form.value = {
    id: null,
    name: '',
    email: '',
    gender: ''
  }
}

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return users.value
  }

  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user =>
    user.name.toLowerCase().includes(query) ||
    (user.email && user.email.toLowerCase().includes(query)) ||
    user.gender.toLowerCase().includes(query)
  )
})

const totalUsers = computed(() => users.value.length)

const activeUsers = computed(() => {
  // Count users who logged in within last 24 hours
  const now = new Date()
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  return users.value.filter(user => {
    // Parse login time (format: "2024-08-20 10:30:00 AM")
    const loginDate = new Date(user.loginTime)
    return loginDate >= yesterday
  }).length
})

const maleUsers = computed(() => {
  return users.value.filter(user => user.gender === 'Male' || user.gender === t('male')).length
})

const femaleUsers = computed(() => {
  return users.value.filter(user => user.gender === 'Female' || user.gender === t('female')).length
})

const malePercentage = computed(() => {
  return totalUsers.value > 0 ? Math.round((maleUsers.value / totalUsers.value) * 100) : 0
})

const femalePercentage = computed(() => {
  return totalUsers.value > 0 ? Math.round((femaleUsers.value / totalUsers.value) * 100) : 0
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const calculateTotalTime = (loginTime, logoutTime) => {
  if (!loginTime || !logoutTime) {
    return '-'
  }

  try {
    // Parse the date strings (format: "2024-08-20 10:30:00 AM")
    const login = new Date(loginTime)
    const logout = new Date(logoutTime)

    if (isNaN(login.getTime()) || isNaN(logout.getTime())) {
      return '-'
    }

    // Calculate difference in milliseconds
    const diffMs = logout.getTime() - login.getTime()

    if (diffMs < 0) {
      return '-'
    }

    // Convert to hours, minutes, and seconds
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)

    // Format as "Xh Ym" or "Xh Ym Xs" if seconds > 0
    if (hours > 0) {
      if (minutes > 0) {
        return seconds > 0 ? `${hours}h ${minutes}m ${seconds}s` : `${hours}h ${minutes}m`
      }
      return seconds > 0 ? `${hours}h ${seconds}s` : `${hours}h`
    } else if (minutes > 0) {
      return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`
    } else {
      return `${seconds}s`
    }
  } catch (error) {
    return '-'
  }
}

// Role tab functions
const filteredRoles = computed(() => {
  if (!roleSearchQuery.value) {
    return roles.value
  }
  const query = roleSearchQuery.value.toLowerCase()
  return roles.value.filter(role =>
    role.name.toLowerCase().includes(query) ||
    (role.description && role.description.toLowerCase().includes(query))
  )
})

const availablePermissions = computed(() => permissions.value)

const getUsersCountForRole = (roleId) => {
  // In a real app, this would count users with this role
  return Math.floor(Math.random() * 10) // Placeholder
}

const toggleRoleActionMenu = (roleId) => {
  activeRoleActionMenu.value = activeRoleActionMenu.value === roleId ? null : roleId
}

const openAddRoleDrawer = () => {
  isEditRoleMode.value = false
  roleForm.value = {
    id: null,
    name: '',
    description: '',
    permissions: []
  }
  showRoleDrawer.value = true
  activeRoleActionMenu.value = null
}

const handleEditRole = (role) => {
  isEditRoleMode.value = true
  roleForm.value = {
    id: role.id,
    name: role.name,
    description: role.description,
    permissions: [...role.permissions]
  }
  showRoleDrawer.value = true
  activeRoleActionMenu.value = null
}

const handleDeleteRole = (role) => {
  roleToDelete.value = role
  if (confirm(t('areYouSure'))) {
    const index = roles.value.findIndex(r => r.id === role.id)
    if (index !== -1) {
      roles.value.splice(index, 1)
      showSuccessMessage.value = true
      successMessage.value = t('roleDeletedSuccess')
      setTimeout(() => {
        showSuccessMessage.value = false
      }, 3000)
    }
  }
  activeRoleActionMenu.value = null
}

const handleRoleSubmit = () => {
  if (isEditRoleMode.value) {
    const index = roles.value.findIndex(r => r.id === roleForm.value.id)
    if (index !== -1) {
      roles.value[index] = {
        ...roles.value[index],
        name: roleForm.value.name,
        description: roleForm.value.description,
        permissions: roleForm.value.permissions
      }
      showSuccessMessage.value = true
      successMessage.value = t('roleUpdatedSuccess')
      setTimeout(() => {
        showSuccessMessage.value = false
      }, 3000)
    }
  } else {
    const newId = roles.value.length > 0 ? Math.max(...roles.value.map(r => r.id)) + 1 : 1
    const newRole = {
      id: newId,
      name: roleForm.value.name,
      description: roleForm.value.description,
      permissions: roleForm.value.permissions,
      created: new Date().toISOString().split('T')[0]
    }
    roles.value.push(newRole)
    showSuccessMessage.value = true
    successMessage.value = t('roleAddedSuccess')
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
  }
  closeRoleDrawer()
}

const closeRoleDrawer = () => {
  showRoleDrawer.value = false
  isEditRoleMode.value = false
  roleForm.value = {
    id: null,
    name: '',
    description: '',
    permissions: []
  }
}

// Permission tab functions
const filteredPermissions = computed(() => {
  if (!permissionSearchQuery.value) {
    return permissions.value
  }
  const query = permissionSearchQuery.value.toLowerCase()
  return permissions.value.filter(permission =>
    permission.name.toLowerCase().includes(query) ||
    permission.module.toLowerCase().includes(query) ||
    permission.action.toLowerCase().includes(query)
  )
})

const getRolesCountForPermission = (permissionId) => {
  // Find permission by ID and get its action
  const permission = permissions.value.find(p => p.id === permissionId)
  if (!permission) return 0
  // Count roles that have this permission action
  return roles.value.filter(role => role.permissions.includes(permission.action)).length
}

const togglePermissionActionMenu = (permissionId) => {
  activePermissionActionMenu.value = activePermissionActionMenu.value === permissionId ? null : permissionId
}

const openAddPermissionDrawer = () => {
  isEditPermissionMode.value = false
  permissionForm.value = {
    id: null,
    name: '',
    module: '',
    action: ''
  }
  showPermissionDrawer.value = true
  activePermissionActionMenu.value = null
}

const handleEditPermission = (permission) => {
  isEditPermissionMode.value = true
  permissionForm.value = {
    id: permission.id,
    name: permission.name,
    module: permission.module,
    action: permission.action
  }
  showPermissionDrawer.value = true
  activePermissionActionMenu.value = null
}

const handleDeletePermission = (permission) => {
  permissionToDelete.value = permission
  if (confirm(t('areYouSure'))) {
    const index = permissions.value.findIndex(p => p.id === permission.id)
    if (index !== -1) {
      permissions.value.splice(index, 1)
      showSuccessMessage.value = true
      successMessage.value = t('permissionDeletedSuccess')
      setTimeout(() => {
        showSuccessMessage.value = false
      }, 3000)
    }
  }
  activePermissionActionMenu.value = null
}

const handlePermissionSubmit = () => {
  if (isEditPermissionMode.value) {
    const index = permissions.value.findIndex(p => p.id === permissionForm.value.id)
    if (index !== -1) {
      permissions.value[index] = {
        ...permissions.value[index],
        name: permissionForm.value.name,
        module: permissionForm.value.module,
        action: permissionForm.value.action
      }
      showSuccessMessage.value = true
      successMessage.value = t('permissionUpdatedSuccess')
      setTimeout(() => {
        showSuccessMessage.value = false
      }, 3000)
    }
  } else {
    const newId = permissions.value.length > 0 ? Math.max(...permissions.value.map(p => p.id)) + 1 : 1
    const newPermission = {
      id: newId,
      name: permissionForm.value.name,
      module: permissionForm.value.module,
      action: permissionForm.value.action,
      created: new Date().toISOString().split('T')[0]
    }
    permissions.value.push(newPermission)
    showSuccessMessage.value = true
    successMessage.value = t('permissionAddedSuccess')
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
  }
  closePermissionDrawer()
}

const closePermissionDrawer = () => {
  showPermissionDrawer.value = false
  isEditPermissionMode.value = false
  permissionForm.value = {
    id: null,
    name: '',
    module: '',
    action: ''
  }
}

</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.2s ease-in;
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
