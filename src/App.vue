<template>
  <div class="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden transition-colors duration-300">
    <!-- Show Sidebar and Navbar only when not on login page -->
    <template v-if="!isLoginPage">
      <!-- Left Sidebar - Fixed -->
      <Sidebar />

      <!-- Main Content Area -->
      <div :class="[
        'flex-1 flex flex-col overflow-hidden transition-all duration-300',
        uiStore.isSidebarCollapsed ? 'ml-16' : 'ml-64'
      ]">
        <!-- Top Navbar - Fixed -->
        <Navbar />

        <!-- Router View for Main Content - Scrollable -->
        <main :class="[
          'flex-1 overflow-y-auto transition-all duration-300',
          uiStore.isSidebarCollapsed ? 'pt-2' : 'pt-2 px-2'
        ]">
          <router-view v-slot="{ Component, route: routeData }">
            <Transition :name="routeData.path === '/login' || routeData.path === '/forgot-password' ? 'login' : 'page'" mode="out-in">
              <component v-if="Component" :is="Component" :key="routeData.path" />
              <LoadingSpinner v-else />
            </Transition>
          </router-view>
        </main>
      </div>
    </template>

    <!-- Show only router view on login page -->
    <template v-else>
      <div class="w-full h-screen">
        <router-view v-slot="{ Component, route: routeData }">
          <Transition :name="routeData.path === '/login' || routeData.path === '/forgot-password' ? 'login' : 'page'" mode="out-in">
            <component v-if="Component" :is="Component" :key="routeData.path" />
            <LoadingSpinner v-else />
          </Transition>
        </router-view>
      </div>
    </template>

    <!-- Toast Container -->
    <ToastContainer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import ToastContainer from './components/ToastContainer.vue'
import { useUIStore } from './stores/ui'

const route = useRoute()
const uiStore = useUIStore()

// Check if current route is login or forgot password page
const isLoginPage = computed(() => route.path === '/login' || route.path === '/forgot-password')
</script>
