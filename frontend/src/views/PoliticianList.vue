<template>
    <div class="bg-slate-50 py-12">
        <!-- 메인 컨텐츠 -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- 제목 -->
            <div class="mb-12 text-center">
                <h1 class="text-4xl font-bold text-charcoal-900 mb-4">정치인 정보</h1>
                <p class="text-lg text-slate-600">투명한 정치인 정보를 확인하세요</p>
            </div>

            <!-- 검색 및 필터 -->
            <div class="mb-10 card p-6">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input v-model="searchQuery" type="text" placeholder="정치인 이름으로 검색..."
                            class="input-field">
                    </div>
                    <div class="flex gap-3">
                        <select v-model="selectedParty"
                            class="input-field w-48">
                            <option value="">전체 정당</option>
                            <option value="더불어민주당">더불어민주당</option>
                            <option value="국민의힘">국민의힘</option>
                            <option value="정의당">정의당</option>
                            <option value="무소속">무소속</option>
                        </select>
                        <select v-model="selectedRegion"
                            class="input-field w-48">
                            <option value="">전체 지역</option>
                            <option value="서울">서울</option>
                            <option value="부산">부산</option>
                            <option value="대구">대구</option>
                            <option value="인천">인천</option>
                            <option value="광주">광주</option>
                            <option value="대전">대전</option>
                            <option value="경기">경기</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- 정치인 카드 리스트 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-for="politician in filteredPoliticians" :key="politician.id"
                    @click="goToPoliticianDetail(politician.id)"
                    class="card cursor-pointer group">
                    <div class="p-6">
                        <!-- 프로필 이미지 -->
                        <div class="w-24 h-24 mx-auto mb-4 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
                            <img v-if="politician.photo_url" :src="politician.photo_url" :alt="politician.name"
                                class="w-full h-full object-cover">
                            <span v-else class="text-slate-400 text-sm">👤</span>
                        </div>

                        <!-- 정치인 정보 -->
                        <div class="text-center">
                            <h3 class="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-charcoal-700 transition-colors">
                                {{ politician.name }}
                            </h3>
                            <p class="text-sm font-semibold text-slate-700 mb-1">{{ politician.party }}</p>
                            <p class="text-sm text-slate-500">{{ politician.region }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 로딩 상태 -->
            <div v-if="loading" class="text-center py-16">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal-900"></div>
                <p class="text-slate-600 mt-4">정치인 정보를 불러오는 중...</p>
            </div>

            <!-- 빈 상태 -->
            <div v-if="!loading && filteredPoliticians.length === 0" class="text-center py-16">
                <div class="text-6xl mb-4">📭</div>
                <p class="text-slate-600 text-lg">검색 결과가 없습니다.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";

interface Politician {
    id: number;
    name: string;
    party: string;
    region: string;
    career?: string;
    promises?: string;
    photo_url?: string;
}

const router = useRouter();
const politicians = ref<Politician[]>([]);
const loading = ref(true);
const searchQuery = ref("");
const selectedParty = ref("");
const selectedRegion = ref("");

// 필터링된 정치인 목록
const filteredPoliticians = computed(() => {
    return politicians.value.filter(politician => {
        const matchesSearch = politician.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesParty = selectedParty.value === "" || politician.party === selectedParty.value;
        const matchesRegion = selectedRegion.value === "" || politician.region === selectedRegion.value;

        return matchesSearch && matchesParty && matchesRegion;
    });
});

// 정치인 상세 페이지로 이동
const goToPoliticianDetail = (id: number) => {
    router.push(`/politician/${id}`);
};

// 정치인 데이터 로드
onMounted(async () => {
    try {
        const res = await api.get("/politicians");
        politicians.value = res.data || [];
    } catch (error) {
        console.error("정치인 데이터 로드 실패:", error);
    } finally {
        loading.value = false;
    }
});
</script>
