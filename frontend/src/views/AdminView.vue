<template>
    <div class="min-h-screen bg-gray-50">
        <!-- 헤더 -->
        <header class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center space-x-4">
                        <router-link to="/" class="text-gray-600 hover:text-gray-900">
                            ← 홈으로
                        </router-link>
                        <h1 class="text-2xl font-bold text-gray-900">관리자 페이지</h1>
                    </div>
                    <nav class="flex space-x-4">
                        <router-link to="/add-politician"
                            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            정치인 추가
                        </router-link>
                    </nav>
                </div>
            </div>
        </header>

        <!-- 메인 컨텐츠 -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- 통계 카드 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                <span class="text-white text-sm font-bold">👥</span>
                            </div>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-lg font-medium text-gray-900">총 정치인</h3>
                            <p class="text-2xl font-bold text-blue-600">{{ politicians.length }}명</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                <span class="text-white text-sm font-bold">💬</span>
                            </div>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-lg font-medium text-gray-900">총 댓글</h3>
                            <p class="text-2xl font-bold text-green-600">{{ totalComments }}개</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                <span class="text-white text-sm font-bold">🏛️</span>
                            </div>
                        </div>
                        <div class="ml-4">
                            <h3 class="text-lg font-medium text-gray-900">정당 수</h3>
                            <p class="text-2xl font-bold text-purple-600">{{ uniqueParties.length }}개</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 정치인 관리 테이블 -->
            <div class="bg-white rounded-lg shadow">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-xl font-semibold text-gray-900">정치인 관리</h2>
                </div>

                <!-- 검색 및 필터 -->
                <div class="px-6 py-4 border-b border-gray-200">
                    <div class="flex flex-col sm:flex-row gap-4">
                        <div class="flex-1">
                            <input v-model="searchQuery" type="text" placeholder="정치인 이름으로 검색..."
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                        </div>
                        <select v-model="selectedParty"
                            class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                            <option value="">전체 정당</option>
                            <option v-for="party in uniqueParties" :key="party" :value="party">
                                {{ party }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- 테이블 -->
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    정치인
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    소속 정당
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    지역구
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    등록일
                                </th>
                                <th
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    작업
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="politician in filteredPoliticians" :key="politician.id">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div
                                            class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                            <img v-if="politician.photo_url" :src="politician.photo_url"
                                                :alt="politician.name" class="w-full h-full object-cover rounded-full">
                                            <span v-else class="text-gray-500 text-xs">사진</span>
                                        </div>
                                        <div>
                                            <div class="text-sm font-medium text-gray-900">{{ politician.name }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {{ politician.party }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ politician.region }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ formatDate(politician.created_at) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button @click="viewPolitician(politician.id)"
                                        class="text-blue-600 hover:text-blue-900 mr-3">
                                        상세보기
                                    </button>
                                    <button @click="editPolitician(politician)"
                                        class="text-green-600 hover:text-green-900 mr-3">
                                        수정
                                    </button>
                                    <button @click="deletePolitician(politician.id, politician.name)"
                                        class="text-red-600 hover:text-red-900">
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 빈 상태 -->
                <div v-if="filteredPoliticians.length === 0" class="text-center py-12">
                    <p class="text-gray-500">{{ searchQuery || selectedParty ? '검색 결과가 없습니다.' : '등록된 정치인이 없습니다.' }}</p>
                </div>
            </div>
        </main>
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
    created_at: string;
}

const router = useRouter();
const politicians = ref<Politician[]>([]);
const searchQuery = ref("");
const selectedParty = ref("");
const totalComments = ref(0);

// 필터링된 정치인 목록
const filteredPoliticians = computed(() => {
    return politicians.value.filter(politician => {
        const matchesSearch = politician.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesParty = selectedParty.value === "" || politician.party === selectedParty.value;
        return matchesSearch && matchesParty;
    });
});

// 고유 정당 목록
const uniqueParties = computed(() => {
    const parties = [...new Set(politicians.value.map(p => p.party))];
    return parties.sort();
});

// 날짜 포맷팅
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
};

// 정치인 상세 보기
const viewPolitician = (id: number) => {
    router.push(`/politician/${id}`);
};

// 정치인 수정 (임시)
const editPolitician = (politician: Politician) => {
    alert(`${politician.name} 수정 기능은 아직 구현되지 않았습니다.`);
};

// 정치인 삭제
const deletePolitician = async (id: number, name: string) => {
    if (!confirm(`정말로 ${name} 정치인을 삭제하시겠습니까?`)) return;

    try {
        await api.delete(`/politicians/${id}`);
        politicians.value = politicians.value.filter(p => p.id !== id);
        alert("정치인이 삭제되었습니다.");
    } catch (error) {
        console.error("정치인 삭제 실패:", error);
        alert("정치인 삭제에 실패했습니다.");
    }
};

// 데이터 로드
const loadData = async () => {
    try {
        const [politiciansRes] = await Promise.all([
            api.get("/politicians"),
        ]);

        politicians.value = politiciansRes.data || [];

        // 총 댓글 수 계산 (각 정치인의 댓글 수를 합산)
        let commentsCount = 0;
        for (const politician of politicians.value) {
            try {
                const commentsRes = await api.get(`/politicians/${politician.id}/comments`);
                commentsCount += commentsRes.data?.length || 0;
            } catch (error) {
                console.error(`댓글 로드 실패 (정치인 ID: ${politician.id}):`, error);
            }
        }
        totalComments.value = commentsCount;

    } catch (error) {
        console.error("데이터 로드 실패:", error);
    }
};

onMounted(() => {
    loadData();
});
</script>
