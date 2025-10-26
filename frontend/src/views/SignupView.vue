<template>
    <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <div class="text-center">
                <div class="flex items-center justify-center space-x-3 mb-4">
                    <div class="w-12 h-12 bg-charcoal-900 rounded-xl flex items-center justify-center">
                        <span class="text-white font-bold text-xl">CP</span>
                    </div>
                    <h1 class="text-3xl font-bold text-charcoal-900">ClearPol</h1>
                </div>
                <h2 class="text-xl font-medium text-slate-600">회원가입</h2>
            </div>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="card py-8 px-4 sm:px-10">
                <form @submit.prevent="handleSignup" class="space-y-6">
                    <!-- 사용자명 -->
                    <div>
                        <label for="username" class="block text-sm font-medium text-charcoal-900 mb-2">
                            사용자명
                        </label>
                        <div class="mt-1">
                            <input id="username" v-model="form.username" type="text" required
                                class="input-field"
                                placeholder="사용자명을 입력하세요">
                        </div>
                    </div>

                    <!-- 이메일 -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-charcoal-900 mb-2">
                            이메일
                        </label>
                        <div class="mt-1">
                            <input id="email" v-model="form.email" type="email" required
                                class="input-field"
                                placeholder="your@email.com">
                        </div>
                    </div>

                    <!-- 비밀번호 -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-charcoal-900 mb-2">
                            비밀번호
                        </label>
                        <div class="mt-1">
                            <input id="password" v-model="form.password" type="password" required
                                class="input-field"
                                placeholder="비밀번호를 입력하세요">
                        </div>
                        <p class="text-sm text-slate-500 mt-1">최소 8자 이상 입력해주세요.</p>
                    </div>

                    <!-- 비밀번호 확인 -->
                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-charcoal-900 mb-2">
                            비밀번호 확인
                        </label>
                        <div class="mt-1">
                            <input id="confirmPassword" v-model="form.confirmPassword" type="password" required
                                class="input-field"
                                :class="{ 'border-red-500': form.confirmPassword && form.password !== form.confirmPassword }"
                                placeholder="비밀번호를 다시 입력하세요">
                        </div>
                        <p v-if="form.confirmPassword && form.password !== form.confirmPassword"
                            class="text-sm text-red-500 mt-1">
                            비밀번호가 일치하지 않습니다.
                        </p>
                    </div>

                    <!-- 약관 동의 -->
                    <div class="space-y-2">
                        <div class="flex items-center">
                            <input id="agree-terms" v-model="form.agreeTerms" type="checkbox" required
                                class="h-4 w-4 text-charcoal-900 focus:ring-charcoal-500 border-slate-300 rounded">
                            <label for="agree-terms" class="ml-2 block text-sm text-charcoal-900">
                                <span class="font-medium text-charcoal-900">이용약관</span>에 동의합니다. *
                            </label>
                        </div>
                        <div class="flex items-center">
                            <input id="agree-privacy" v-model="form.agreePrivacy" type="checkbox" required
                                class="h-4 w-4 text-charcoal-900 focus:ring-charcoal-500 border-slate-300 rounded">
                            <label for="agree-privacy" class="ml-2 block text-sm text-charcoal-900">
                                <span class="font-medium text-charcoal-900">개인정보 처리방침</span>에 동의합니다. *
                            </label>
                        </div>
                    </div>

                    <!-- 회원가입 버튼 -->
                    <div>
                        <button type="submit" :disabled="isLoading || !isFormValid"
                            class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ isLoading ? '가입 중...' : '회원가입' }}
                        </button>
                    </div>

                    <!-- 로그인 링크 -->
                    <div class="text-center">
                        <p class="text-sm text-slate-600">
                            이미 계정이 있으신가요?
                            <router-link to="/login" class="font-medium text-charcoal-900 hover:text-charcoal-700">
                                로그인
                            </router-link>
                        </p>
                    </div>

                    <!-- 홈으로 돌아가기 -->
                    <div class="text-center">
                        <router-link to="/" class="text-sm text-slate-500 hover:text-charcoal-900">
                            ← 홈으로 돌아가기
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoading = ref(false);

// 폼 데이터
const form = reactive({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreePrivacy: false,
});

// 폼 유효성 검사
const isFormValid = computed(() => {
    return (
        form.username &&
        form.email &&
        form.password.length >= 8 &&
        form.password === form.confirmPassword &&
        form.agreeTerms &&
        form.agreePrivacy
    );
});

// 회원가입 처리
const handleSignup = async () => {
    if (!isFormValid.value) return;

    isLoading.value = true;

    try {
        // TODO: 실제 회원가입 API 호출
        // 현재는 임시로 처리
        console.log("회원가입 시도:", {
            username: form.username,
            email: form.email,
            // 비밀번호는 로그에 남기지 않음
        });

        // 임시 회원가입 성공 처리
        await new Promise(resolve => setTimeout(resolve, 1500));

        alert("회원가입이 완료되었습니다! (임시 구현)");
        router.push("/login");

    } catch (error) {
        console.error("회원가입 실패:", error);
        alert("회원가입에 실패했습니다.");
    } finally {
        isLoading.value = false;
    }
};
</script>
