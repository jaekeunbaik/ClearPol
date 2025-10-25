<template>
    <div class="min-h-screen bg-gray-50">
        <!-- 헤더 -->
        <header class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center space-x-4">
                        <button @click="goBack" class="text-gray-600 hover:text-gray-900">
                            ← 뒤로가기
                        </button>
                        <h1 class="text-2xl font-bold text-gray-900">ClearPol</h1>
                    </div>
                </div>
            </div>
        </header>

        <!-- 로딩 상태 -->
        <div v-if="loading" class="text-center py-12">
            <p class="text-gray-500">정치인 정보를 불러오는 중...</p>
        </div>

        <!-- 정치인 상세 정보 -->
        <main v-else-if="politician" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- 프로필 섹션 -->
            <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <!-- 프로필 이미지 -->
                    <div class="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <img v-if="politician.photo_url" :src="politician.photo_url" :alt="politician.name"
                            class="w-full h-full object-cover rounded-full">
                        <span v-else class="text-gray-500">사진</span>
                    </div>

                    <!-- 기본 정보 -->
                    <div class="flex-1 text-center md:text-left">
                        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ politician.name }}</h1>
                        <div class="space-y-2 mb-6">
                            <p class="text-lg text-blue-600">{{ politician.party }}</p>
                            <p class="text-gray-600">{{ politician.region }}</p>
                        </div>
                    </div>
                </div>

                <!-- 상세 정보 -->
                <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-4">경력</h3>
                        <p class="text-gray-700 leading-relaxed">{{ politician.career || '경력 정보가 없습니다.' }}</p>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-4">주요 공약</h3>
                        <p class="text-gray-700 leading-relaxed">{{ politician.promises || '공약 정보가 없습니다.' }}</p>
                    </div>
                </div>
            </div>

            <!-- 댓글 섹션 -->
            <div class="bg-white rounded-lg shadow-lg p-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">댓글 ({{ comments.length }})</h2>

                <!-- 댓글 작성 -->
                <div class="mb-8 p-4 bg-gray-50 rounded-lg">
                    <textarea v-model="newComment" placeholder="의견을 남겨주세요..."
                        class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows="3"></textarea>
                    <div class="flex justify-end mt-3">
                        <button @click="submitComment" :disabled="!newComment.trim() || submittingComment"
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ submittingComment ? '등록 중...' : '댓글 등록' }}
                        </button>
                    </div>
                </div>

                <!-- 댓글 목록 -->
                <div class="space-y-4">
                    <div v-for="comment in comments" :key="comment.id"
                        class="border-b border-gray-200 pb-4 last:border-b-0">
                        <div class="flex justify-between items-start mb-2">
                            <span class="font-medium text-gray-900">{{ comment.users?.username || '익명' }}</span>
                            <span class="text-sm text-gray-500">{{ formatDate(comment.created_at) }}</span>
                        </div>
                        <p class="text-gray-700">{{ comment.content }}</p>
                        <div class="flex items-center mt-2 space-x-4">
                            <button class="text-sm text-gray-500 hover:text-gray-700">
                                👍 {{ comment.likes || 0 }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 댓글이 없는 경우 -->
                <div v-if="comments.length === 0" class="text-center py-8 text-gray-500">
                    아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
                </div>
            </div>
        </main>

        <!-- 오류 상태 -->
        <div v-else class="text-center py-12">
            <p class="text-red-500">정치인 정보를 불러올 수 없습니다.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
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

interface Comment {
    id: number;
    content: string;
    likes: number;
    created_at: string;
    users?: {
        username: string;
    };
}

const route = useRoute();
const router = useRouter();

const politician = ref<Politician | null>(null);
const comments = ref<Comment[]>([]);
const loading = ref(true);
const newComment = ref("");
const submittingComment = ref(false);

// 뒤로가기
const goBack = () => {
    router.push("/");
};

// 날짜 포맷팅
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

// 댓글 제출
const submitComment = async () => {
    if (!newComment.value.trim()) return;

    submittingComment.value = true;
    try {
        // 임시 사용자 ID (실제로는 인증 시스템에서 가져와야 함)
        const tempUserId = 1;

        await api.post(`/politicians/${route.params.id}/comments`, {
            user_id: tempUserId,
            content: newComment.value,
        });

        newComment.value = "";
        loadComments(); // 댓글 목록 새로고침
    } catch (error) {
        console.error("댓글 등록 실패:", error);
        alert("댓글 등록에 실패했습니다.");
    } finally {
        submittingComment.value = false;
    }
};

// 정치인 정보 로드
const loadPolitician = async () => {
    try {
        const res = await api.get(`/politicians/${route.params.id}`);
        politician.value = res.data;
    } catch (error) {
        console.error("정치인 정보 로드 실패:", error);
    }
};

// 댓글 목록 로드
const loadComments = async () => {
    try {
        const res = await api.get(`/politicians/${route.params.id}/comments`);
        comments.value = res.data || [];
    } catch (error) {
        console.error("댓글 로드 실패:", error);
    }
};

// 컴포넌트 마운트 시 데이터 로드
onMounted(async () => {
    await Promise.all([loadPolitician(), loadComments()]);
    loading.value = false;
});
</script>
