<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <div class="text-center">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">ClearPol</h1>
                <h2 class="text-xl font-medium text-gray-600">로그인</h2>
            </div>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form @submit.prevent="handleLogin" class="space-y-6">
                    <!-- 이메일 -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            이메일
                        </label>
                        <div class="mt-1">
                            <input id="email" v-model="form.email" type="email" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="your@email.com">
                        </div>
                    </div>

                    <!-- 비밀번호 -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            비밀번호
                        </label>
                        <div class="mt-1">
                            <input id="password" v-model="form.password" type="password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="비밀번호를 입력하세요">
                        </div>
                    </div>

                    <!-- 기억하기 & 비밀번호 찾기 -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" v-model="form.rememberMe" type="checkbox"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                                로그인 상태 유지
                            </label>
                        </div>

                        <div class="text-sm">
                            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                                비밀번호를 잊으셨나요?
                            </a>
                        </div>
                    </div>

                    <!-- 로그인 버튼 -->
                    <div>
                        <button type="submit" :disabled="isLoading"
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ isLoading ? '로그인 중...' : '로그인' }}
                        </button>
                    </div>

                    <!-- 회원가입 링크 -->
                    <div class="text-center">
                        <p class="text-sm text-gray-600">
                            계정이 없으신가요?
                            <router-link to="/signup" class="font-medium text-blue-600 hover:text-blue-500">
                                회원가입
                            </router-link>
                        </p>
                    </div>

                    <!-- 홈으로 돌아가기 -->
                    <div class="text-center">
                        <router-link to="/" class="text-sm text-gray-500 hover:text-gray-700">
                            ← 홈으로 돌아가기
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoading = ref(false);

// 폼 데이터
const form = reactive({
    email: "",
    password: "",
    rememberMe: false,
});

// 로그인 처리
const handleLogin = async () => {
    isLoading.value = true;

    try {
        // TODO: 실제 로그인 API 호출
        // 현재는 임시로 처리
        console.log("로그인 시도:", form);

        // 임시 로그인 성공 처리
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert("로그인 성공! (임시 구현)");
        router.push("/");

    } catch (error) {
        console.error("로그인 실패:", error);
        alert("로그인에 실패했습니다.");
    } finally {
        isLoading.value = false;
    }
};
</script>
