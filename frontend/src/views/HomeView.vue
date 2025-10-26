<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";

interface Politician {
  id: number;
  name: string;
  party: string;
  region: string;
  photo_url?: string;
}

const router = useRouter();
const featuredPoliticians = ref<Politician[]>([]);
const loading = ref(true);

// 정치인 상세 페이지로 이동
const goToPoliticianDetail = (id: number) => {
  router.push(`/politician/${id}`);
};

// 주요 정치인 데이터 로드 (최대 8명)
onMounted(async () => {
  try {
    const res = await api.get("/politicians");
    featuredPoliticians.value = (res.data || []).slice(0, 8);
  } catch (error) {
    console.error("정치인 데이터 로드 실패:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="bg-gradient-to-b from-slate-50 to-white">
    <!-- 히어로 섹션 -->
    <section class="pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center">
          <h1 class="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            투명한 정치 정보
            <span class="block text-blue-600">모두를 위한</span>
          </h1>
          <p class="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            ClearPol은 정치인 정보를 중립적이고 투명하게 제공하여<br>
            시민들이 더 나은 정치 결정을 내릴 수 있도록 돕습니다.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/politicians"
              class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg">
              정치인 둘러보기 →
            </router-link>
            <router-link to="/login"
              class="bg-white text-slate-700 px-8 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium text-lg border-2 border-slate-200">
              로그인
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 다가오는 선거 섹션 -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-slate-900 mb-3">다가오는 선거</h2>
          <p class="text-slate-600">가장 가까운 시기에 있을 선거를 확인하세요</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 전국 지방선거 카드 -->
          <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">전국 선거</span>
              <span class="text-slate-400 text-sm">24년 6월</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">제22대 국회의원 선거</h3>
            <p class="text-slate-600 mb-4">국회의원을 선출하는 전국 선거입니다. 투표권을 가진 모든 시민이 참여할 수 있습니다.</p>
            <button class="text-blue-600 hover:text-blue-700 font-medium">
              자세히 보기 →
            </button>
          </div>

          <!-- 대통령 선거 카드 -->
          <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">전국 선거</span>
              <span class="text-slate-400 text-sm">27년 예정</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">제21대 대통령 선거</h3>
            <p class="text-slate-600 mb-4">다음 대통령을 선출하는 중요한 선거입니다. 준비를 시작할 때입니다.</p>
            <button class="text-blue-600 hover:text-blue-700 font-medium">
              자세히 보기 →
            </button>
          </div>

          <!-- 지방선거 카드 -->
          <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">지방 선거</span>
              <span class="text-slate-400 text-sm">26년 예정</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">제8회 전국동시지방선거</h3>
            <p class="text-slate-600 mb-4">광역시장, 시도지사, 시장·군수·구청장 등을 선출하는 지방선거입니다.</p>
            <button class="text-blue-600 hover:text-blue-700 font-medium">
              자세히 보기 →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 정치인 카테고리 섹션 -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-slate-900 mb-3">정치인 둘러보기</h2>
          <p class="text-slate-600">정당, 지역, 분야별로 정치인을 찾아보세요</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <!-- 더불어민주당 -->
          <router-link to="/politicians?party=더불어민주당"
            class="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white hover:shadow-xl transition-all hover:scale-105">
            <div class="text-center">
              <div class="text-4xl font-bold mb-2">더불어민주당</div>
              <p class="text-blue-100 text-sm">진보 정당</p>
            </div>
          </router-link>

          <!-- 국민의힘 -->
          <router-link to="/politicians?party=국민의힘"
            class="bg-gradient-to-br from-red-500 to-red-700 rounded-xl p-6 text-white hover:shadow-xl transition-all hover:scale-105">
            <div class="text-center">
              <div class="text-4xl font-bold mb-2">국민의힘</div>
              <p class="text-red-100 text-sm">보수 정당</p>
            </div>
          </router-link>

          <!-- 정의당 -->
          <router-link to="/politicians?party=정의당"
            class="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl p-6 text-white hover:shadow-xl transition-all hover:scale-105">
            <div class="text-center">
              <div class="text-4xl font-bold mb-2">정의당</div>
              <p class="text-yellow-100 text-sm">진보 정당</p>
            </div>
          </router-link>

          <!-- 무소속 -->
          <router-link to="/politicians?party=무소속"
            class="bg-gradient-to-br from-slate-500 to-slate-700 rounded-xl p-6 text-white hover:shadow-xl transition-all hover:scale-105">
            <div class="text-center">
              <div class="text-4xl font-bold mb-2">무소속</div>
              <p class="text-slate-100 text-sm">무소속</p>
            </div>
          </router-link>
        </div>

        <div class="text-center mt-8">
          <router-link to="/politicians" class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            모든 정치인 보기 →
          </router-link>
        </div>
      </div>
    </section>

    <!-- 주요 정치인 섹션 -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-slate-900 mb-3">주요 정치인</h2>
          <p class="text-slate-600">인기 정치인들을 만나보세요</p>
        </div>

        <div v-if="loading" class="text-center py-12">
          <p class="text-slate-500">정치인 정보를 불러오는 중...</p>
        </div>

        <div v-else-if="featuredPoliticians.length > 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="politician in featuredPoliticians" :key="politician.id"
            @click="goToPoliticianDetail(politician.id)"
            class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group">
            <div class="p-6">
              <div
                class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <img v-if="politician.photo_url" :src="politician.photo_url" :alt="politician.name"
                  class="w-full h-full object-cover rounded-full">
                <span v-else class="text-slate-500 text-sm">사진</span>
              </div>

              <div class="text-center">
                <h3 class="text-lg font-semibold text-slate-900 mb-2">{{ politician.name }}</h3>
                <p class="text-sm text-blue-600 mb-1">{{ politician.party }}</p>
                <p class="text-sm text-slate-500">{{ politician.region }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <p class="text-slate-500">등록된 정치인이 없습니다.</p>
        </div>

        <div class="text-center mt-8">
          <router-link to="/politicians"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md">
            전체 정치인 보기 →
          </router-link>
        </div>
      </div>
    </section>

    <!-- 푸터 -->
    <footer class="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-xl">C</span>
              </div>
              <h3 class="text-xl font-bold">ClearPol</h3>
            </div>
            <p class="text-slate-400">
              투명하고 접근 가능한 정치 정보를 제공하여 더 나은 민주주의를 만들어갑니다.
            </p>
          </div>

          <div>
            <h4 class="font-semibold mb-4">빠른 링크</h4>
            <ul class="space-y-2 text-slate-400">
              <li><router-link to="/politicians" class="hover:text-white">정치인 보기</router-link></li>
              <li><router-link to="/about" class="hover:text-white">소개</router-link></li>
              <li><router-link to="/contact" class="hover:text-white">문의하기</router-link></li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-4">계정</h4>
            <ul class="space-y-2 text-slate-400">
              <li><router-link to="/login" class="hover:text-white">로그인</router-link></li>
              <li><router-link to="/signup" class="hover:text-white">회원가입</router-link></li>
              <li><router-link to="/admin" class="hover:text-white">관리자</router-link></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2025 ClearPol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
