<template>
  <footer class="bg-charcoal-900 text-white mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 브랜드 -->
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span class="text-charcoal-900 font-bold text-lg">CP</span>
            </div>
            <span class="text-2xl font-bold">ClearPol</span>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed">
            정치인 정보와 의견을 공유하는 투명한 플랫폼
          </p>
        </div>

        <!-- 링크 -->
        <div>
          <h3 class="font-semibold mb-4">빠른 링크</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-slate-400 hover:text-white transition-colors">
                홈
              </router-link>
            </li>
            <li>
              <router-link to="/login" class="text-slate-400 hover:text-white transition-colors">
                로그인
              </router-link>
            </li>
            <li>
              <router-link to="/signup" class="text-slate-400 hover:text-white transition-colors">
                회원가입
              </router-link>
            </li>
            <li>
              <router-link to="/admin" class="text-slate-400 hover:text-white transition-colors">
                관리자 페이지
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 연락처 -->
        <div>
          <h3 class="font-semibold mb-4">문의</h3>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li>이메일: info@clearpol.com</li>
            <li>전화: 02-1234-5678</li>
          </ul>
        </div>
      </div>

      <!-- 저작권 -->
      <div class="border-t border-charcoal-800 mt-8 pt-8 text-center text-slate-400 text-sm">
        <p>&copy; 2024 ClearPol. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
