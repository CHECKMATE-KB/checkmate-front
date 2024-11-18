<script setup>
import { reactive, computed } from 'vue';
import MenuGroup from './menu/MenuGroup.vue';
import AccountMenuGroup from './menu/AccountMenuGroup.vue';
import config from '@/config';
import { useRouter } from 'vue-router'; // useRouter 훅 추가

let state = reactive({ isNavShow: false });

let navClass = computed(() => (state.isNavShow ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'));

const toggleNavShow = () => (state.isNavShow = !state.isNavShow);

// Vue Router 사용 설정
const router = useRouter();
const goToLogin = () => {
  router.push('/login'); // 로그인 페이지로 이동
}
const goToUserJoin = () => {
  router.push('./userjoin'); // 회원가입 페이지로 이동
}

</script>

<template>
  <header class="header">
    <div class="logo">
      <!-- 로고 영역 -->
      <img src="@/assets/images/logo.png" alt="Logo" />
    </div>
    <div class="menu-auth-container">
      <nav class="nav">
        <!-- 메뉴 항목 -->
        <router-link to="/" class="nav-item">메인</router-link>
        <router-link to="/challenge" class="nav-item">챌린지</router-link>
        <router-link to="/quiz" class="nav-item">퀴즈</router-link>
        <router-link to="/assets" class="nav-item">나의자산</router-link>
        <router-link to="/spending" class="nav-item">소비내역</router-link>
        <router-link to="/spending" class="nav-item">마이페이지</router-link>
      </nav>
      <div class="auth-buttons">
        <!-- 로그인 및 등록 버튼 -->
        <button class="sign-in" @click="goToLogin">로그인</button>
        <button class="register" @click="goToUserJoin">회원가입</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 헤더 스타일 */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* 화면에 가득 차게 설정 */
  padding: 10px 40px; /* 양쪽 여백을 조정하여 좌우 끝에 맞춤 */
  background-color: white;
  box-sizing: border-box; /* padding 포함하여 width 계산 */
  position: relative;
}

/* 로고 스타일 */
.logo img {
  height: 50px;
}

/* 메뉴와 인증 버튼을 하나의 컨테이너로 묶음 */
.menu-auth-container {
  display: flex;
  align-items: center;
  gap: 20px; /* 메뉴와 인증 버튼 사이 간격 조정 */
}

/* 네비게이션 스타일 */
.nav {
  display: flex;
  gap: 15px;
}

.nav-item {
  text-decoration: none;
  color: #333;
  font-size: 16px;
}

.nav-item:hover {
  color: #000;
  background-color: #E3E3E3;
  border-radius: 5px;
}

/* 인증 버튼 스타일 */
.auth-buttons {
  display: flex;
  gap: 10px;
}

.sign-in,
.register {
  padding: 8px 15px; /* 버튼 높이를 nav-item과 유사하게 조정 */
  line-height: 16px; /* 텍스트의 중앙 정렬을 위해 조정 */
  font-size: 16px;
  border-radius: 5px;
}

.sign-in {
  background-color: transparent;
  border: 1px solid #333;
  color: #333;
}

.register {
  background-color: #333;
  color: white;
  border: none;
}

.sign-in:hover,
.register:hover {
  opacity: 0.8;
}
</style>
