<template>
  <header class="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- 로고 -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 bg-charcoal-900 rounded-lg flex items-center justify-center 
                      group-hover:bg-charcoal-800 transition-colors duration-200">
            <span class="text-white font-bold text-lg">CP</span>
          </div>
          <span class="text-2xl font-bold text-charcoal-900">ClearPol</span>
        </router-link>

        <!-- 네비게이션 -->
        <nav class="hidden md:flex items-center space-x-1">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="px-4 py-2 rounded-lg text-charcoal-700 hover:bg-slate-100 
                   hover:text-charcoal-900 transition-all duration-200 font-medium"
            active-class="bg-slate-100 text-charcoal-900">
            {{ item.label }}
          </router-link>
        </nav>

        <!-- 액션 버튼 -->
        <div class="flex items-center space-x-3">
          <router-link
            to="/login"
            class="hidden sm:block px-4 py-2 text-charcoal-700 hover:text-charcoal-900 
                   font-medium transition-colors duration-200">
            로그인
          </router-link>
          <router-link
            to="/signup"
            class="btn-primary">
            회원가입
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const navItems = [
  { path: '/', label: '홈' },
  { path: '/admin', label: '관리' },
];
</script>
