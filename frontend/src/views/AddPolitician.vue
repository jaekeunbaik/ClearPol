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
                        <h1 class="text-2xl font-bold text-gray-900">정치인 등록</h1>
                    </div>
                    <nav class="flex space-x-4">
                        <router-link to="/admin" class="text-gray-600 hover:text-gray-900">관리자 페이지</router-link>
                    </nav>
                </div>
            </div>
        </header>

        <!-- 메인 컨텐츠 -->
        <main class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="bg-white rounded-lg shadow-lg p-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">새 정치인 정보 등록</h2>

                <form @submit.prevent="submitPolitician" class="space-y-6">
                    <!-- 이름 -->
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                            이름 *
                        </label>
                        <input id="name" v-model="form.name" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="정치인 이름을 입력하세요">
                    </div>

                    <!-- 소속 정당 -->
                    <div>
                        <label for="party" class="block text-sm font-medium text-gray-700 mb-2">
                            소속 정당 *
                        </label>
                        <select id="party" v-model="form.party" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="">정당을 선택하세요</option>
                            <option value="더불어민주당">더불어민주당</option>
                            <option value="국민의힘">국민의힘</option>
                            <option value="정의당">정의당</option>
                            <option value="국민의당">국민의당</option>
                            <option value="진보당">진보당</option>
                            <option value="무소속">무소속</option>
                        </select>
                    </div>

                    <!-- 지역구 -->
                    <div>
                        <label for="region" class="block text-sm font-medium text-gray-700 mb-2">
                            지역구 *
                        </label>
                        <select id="region" v-model="form.region" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="">지역을 선택하세요</option>
                            <option value="서울">서울</option>
                            <option value="부산">부산</option>
                            <option value="대구">대구</option>
                            <option value="인천">인천</option>
                            <option value="광주">광주</option>
                            <option value="대전">대전</option>
                            <option value="울산">울산</option>
                            <option value="세종">세종</option>
                            <option value="경기">경기</option>
                            <option value="강원">강원</option>
                            <option value="충북">충북</option>
                            <option value="충남">충남</option>
                            <option value="전북">전북</option>
                            <option value="전남">전남</option>
                            <option value="경북">경북</option>
                            <option value="경남">경남</option>
                            <option value="제주">제주</option>
                        </select>
                    </div>

                    <!-- 사진 URL -->
                    <div>
                        <label for="photo_url" class="block text-sm font-medium text-gray-700 mb-2">
                            사진 URL
                        </label>
                        <input id="photo_url" v-model="form.photo_url" type="url"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://example.com/photo.jpg">
                        <p class="text-sm text-gray-500 mt-1">정치인 프로필 사진의 URL을 입력하세요 (선택사항)</p>
                    </div>

                    <!-- 경력 -->
                    <div>
                        <label for="career" class="block text-sm font-medium text-gray-700 mb-2">
                            경력
                        </label>
                        <textarea id="career" v-model="form.career" rows="4"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="주요 경력을 입력하세요&#10;예: 2020-현재 국회의원&#10;2018-2020 서울시의원&#10;2010-2018 변호사"></textarea>
                    </div>

                    <!-- 주요 공약 -->
                    <div>
                        <label for="promises" class="block text-sm font-medium text-gray-700 mb-2">
                            주요 공약
                        </label>
                        <textarea id="promises" v-model="form.promises" rows="4"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="주요 공약을 입력하세요&#10;예: 1. 청년 일자리 창출&#10;2. 주거비 부담 완화&#10;3. 교육격차 해소"></textarea>
                    </div>

                    <!-- 제출 버튼 -->
                    <div class="flex justify-end space-x-4 pt-6">
                        <button type="button" @click="resetForm"
                            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                            초기화
                        </button>
                        <button type="submit" :disabled="submitting"
                            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ submitting ? '등록 중...' : '정치인 등록' }}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";

const router = useRouter();
const submitting = ref(false);

// 폼 데이터
const form = reactive({
    name: "",
    party: "",
    region: "",
    photo_url: "",
    career: "",
    promises: "",
});

// 뒤로가기
const goBack = () => {
    router.push("/");
};

// 폼 초기화
const resetForm = () => {
    Object.keys(form).forEach(key => {
        form[key as keyof typeof form] = "";
    });
};

// 정치인 등록
const submitPolitician = async () => {
    submitting.value = true;

    try {
        const response = await api.post("/politicians", form);

        if (response.status === 201) {
            alert("정치인이 성공적으로 등록되었습니다!");
            router.push("/");
        }
    } catch (error) {
        console.error("정치인 등록 실패:", error);
        alert("정치인 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
        submitting.value = false;
    }
};
</script>
