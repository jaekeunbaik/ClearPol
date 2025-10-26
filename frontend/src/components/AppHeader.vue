<template>
  <header class="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- 로고 -->
        <router-link to="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div
            class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">C</span>
          </div>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            ClearPol
          </h1>
        </router-link>

        <!-- 네비게이션 -->
        <nav class="hidden md:flex items-center space-x-1">
          <router-link to="/" class="px-4 py-2 rounded-lg transition-colors"
            :class="$route.path === '/' ? 'text-blue-600 font-medium bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'">
            홈
          </router-link>
          <router-link to="/politicians" class="px-4 py-2 rounded-lg transition-colors"
            :class="$route.path === '/politicians' ? 'text-blue-600 font-medium bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'">
            정치인 보기
          </router-link>
          <router-link to="/admin" class="px-4 py-2 rounded-lg transition-colors"
            :class="$route.path === '/admin' ? 'text-blue-600 font-medium bg-blue-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'">
            관리자
          </router-link>
          <div class="h-6 w-px bg-slate-300 mx-2"></div>
          <router-link to="/login"
            class="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
            로그인
          </router-link>
          <router-link to="/signup"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            회원가입
          </router-link>
        </nav>

        <!-- 모바일 메뉴 버튼 -->
        <button @click="toggleMobileMenu" class="md:hidden text-slate-600 hover:text-slate-900 p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
            </path>
          </svg>
        </button>
      </div>

      <!-- 모바일 메뉴 -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-slate-200">
        <nav class="flex flex-col space-y-2">
          <router-link to="/" @click="closeMobileMenu" class="px-4 py-2 rounded-lg transition-colors"
            :class="$route.path === '/' ? 'text-blue-600 font-medium bg-blue-50' : 'text-slate-600 hover:bg-slate-100'">
            홈
          </router-link>
          <router-link to="/politicians" @click="closeMobileMenu" class="px-4 py-2 rounded-lg transition-colors"
            :class="$route.path === '/politicians' ? 'text-blue-600 font-medium bg-blue-50' : 'text-slate-600 hover:bg-slate-100'">
            정치인 보기
          </router-link>
          <router-link to="/admin" @click="closeMobileMenu" class="px-4 py-2 rounded-lg transition-colors"
            :class="$route.path === '/admin' ? 'text-blue-600 font-medium bg-blue-50' : 'text-slate-600 hover:bg-slate-100'">
            관리자
          </router-link>
          <div class="h-px bg-slate-200 my-2"></div>
          <router-link to="/login" @click="closeMobileMenu"
            class="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
            로그인
          </router-link>
          <router-link to="/signup" @click="closeMobileMenu"
            class="mx-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-center hover:bg-blue-700 transition-colors">
            회원가입
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};
</script>
