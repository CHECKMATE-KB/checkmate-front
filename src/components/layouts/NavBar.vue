<script setup>
// 로컬스토리지에 로그인 정보가 있으면 로그인 버튼 자리에 로그아웃 + 계정 정보(userNo+님 환영합니다 뜨도록)

import { ref, watchEffect , onMounted } from 'vue';
import MenuGroup from './menu/MenuGroup.vue';
import AccountMenuGroup from './menu/AccountMenuGroup.vue';
import config from '@/config';
import { useRouter } from 'vue-router'; // useRouter 훅 추가
import { storenickName } from '@/stores/userState'; // 전역 상태 가져오기

// Vue Router 사용 설정
const router = useRouter();

// 상태 관리
// const userNo = ref(''); // 로그인한 유저 번호

// 로그인 상태 확인 함수
const checkLogin = () => {
  const localStorageGetNickName = localStorage.getItem('nickName');
  if (localStorageGetNickName) {
    storenickName.value = localStorageGetNickName; // 상태 업데이트
  } else {
    storenickName.value = ''; // 상태 초기화 (비로그인 상태)
  }
};

// 로그아웃 함수
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userNo');
  localStorage.removeItem('nickName');
  localStorage.removeItem('userImg');
  storenickName.value = ''; 
  alert('로그아웃되었습니다.');
  router.push('/'); // 메인 페이지로 이동
};

// 컴포넌트가 로드될 때 로그인 상태 확인
onMounted(() => {
  checkLogin();
});

// 상태 변화 감지 및 UI 업데이트
watchEffect(() => {
  console.log('userNo 상태 변경:', storenickName.value);
});

// 프로필 이미지 상태 가져오기
import { storeUserImg } from '../../stores/userState';
</script>

<template>
  <header class="header">
    <div class="logo">
      <!-- 로고 영역 -->
      <router-link to="/"><img src="@/assets/images/cmlogo2.png" alt="Logo" /></router-link>
    </div>
    <div class="menu-auth-container">
      <nav class="nav">
        <!-- 메뉴 항목 -->
        <router-link to="/" class="nav-item">메인</router-link>
        <router-link to="/challenge" class="nav-item">챌린지</router-link>
        <router-link to="/quiz" class="nav-item">퀴즈</router-link>
        <router-link to="/mypage" class="nav-item">마이페이지</router-link>
      </nav>
      <div class="auth-buttons">
        <!-- 로그인 상태에 따른 버튼 표시 -->
        <template v-if="storenickName">
          <span class="welcome-message"> 
            <img :src="storeUserImg" width="30px">
            {{ storenickName }}님 환영합니다.</span>
          <button class="logout-button" @click="handleLogout">로그아웃</button>
        </template>
        <template v-else>
          <button class="sign-in" @click="router.push('/login')">로그인</button>
          <button class="register" @click="router.push('/userjoin')">회원가입</button>
        </template>
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
  height: 80px;
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
.register,
.welcome-message,
.logout-button {
  padding: 8px 15px; /* 버튼 높이를 nav-item과 유사하게 조정 */
  line-height: 16px; /* 텍스트의 중앙 정렬을 위해 조정 */
  font-size: 16px;
  border-radius: 5px;
}

.sign-in,
.welcome-message {
  background-color: transparent;
  border: 1px solid #333;
  color: #333;
}

.register,
.logout-button {
  background-color: #333;
  color: white;
  border: none;
}

.sign-in:hover,
.register:hover {
  opacity: 0.8;
}

.logout-button {

}
</style>