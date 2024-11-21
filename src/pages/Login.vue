<template>
    <!--  html 전체 영역 container -->
    <div id="page-container">
        <div class="left-container"> <!-- 좌측 이미지 영역 -->
            <img src="../assets/images/logo.png" width="650px" height="450px">
            
        </div>

        <!-- 우측 회원가입 폼 영역 -->
        <div id="right-container">
            <!-- 로그인 페이지 타이틀 -->
            <div id="loginBoxTitle">로그인</div>
            <p style="color:#B1B3B9; padding-bottom:16px;">디지털 자산 거래를 시작합니다.</p>
            <!-- 아이디, 비번, 버튼 박스 -->
            <form @submit.prevent="handleLogin">
                <label for="id" style="font-weight : bold;">아이디</label>
                <input id="id" v-model="user.userId" type="text" placeholder="아이디를 입력하세요." />

                <label for="password" style="font-weight : bold;">비밀번호</label>
                <input id="password" v-model="user.userPw" type="password" placeholder="비밀번호를 입력하세요." />
        
                <button type="submit" class="signup-button">로그인</button>
            </form>

            <p class="login-link">
                계정이 없나요? <a href="/userjoin" style="color:#FAB809;">회원가입하기</a>
              </p>
        </div>
    </div>
</template>

<style scoped>
/* 전체 페이지 레이아웃 */
#page-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
}
/* 왼쪽 이미지 영역 */
.left-container {
    position: relative;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

  
#right-container {
    margin : 40px;
    width: 300px;
    text-align: left;
    background-color: #ffffff;
}

#loginBoxTitle {
    color:#000000;
    font-weight: bold;
    font-size: 32px;
    text-transform: uppercase;
    margin-bottom: 20px;
    background: linear-gradient(to right, #270a09, #8ca6ce);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
  
label {
    display: block;
    margin: 15px 0 5px;
    font-size: 1rem;
}
  
input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
}
  
.signup-button {
    width: 100%;
    padding: 10px;
    background-color: #FAB809;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
}
  
.signup-button:hover {
    background-color: #faa609;
}
  
.login-link {
    margin-top: 20px;
    text-align: center;
    font-size: 0.9rem;
}
/* 반응형 디자인 적용 */
@media (max-width: 1300px) {
    #page-container {
        flex-direction: column; /* 세로로 정렬 */
        height: auto; /* 높이를 자동으로 조정 */
    }

    .left-container {
        width: 100%; /* 너비를 100%로 설정 */
        margin-bottom: 20px; /* 이미지 아래 여백 추가 */
    }

    #right-container {
        width: 100%; /* 너비를 100%로 설정 */
        max-width: 400px; /* 폼의 최대 너비 제한 */
    }
}
</style>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { storenickName } from '@/stores/userState'; // 전역 상태 가져오기

// Vue Router 사용
const router = useRouter();

// 사용자 로그인 데이터
const user = reactive({
    userId: '',
    userPw: '',
});

// 로그인 처리 함수
const handleLogin = async () => {
    // 사용자 입력값 검증
    if (!user.userId.trim()) {
        alert('아이디를 입력해주세요.');
        return;
    }
    if (!user.userPw.trim()) {
        alert('비밀번호를 입력해주세요.');
        return;
    }

    try {
        const response = await axios.post('api/user/login', user);
        const { token, userNo, nickName, userImg, userId } = response.data; // 서버로부터 받은 토큰과 userNo
        
        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('token', token);
        localStorage.setItem('userNo', userNo);
        localStorage.setItem('nickName', nickName);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userImg', userImg); // 프로필 사진 저장
        storenickName.value = nickName; // 전역 상태 업데이트
        
        alert('로그인에 성공했습니다!');

        // 로그인 성공 후 메인 페이지로 이동
        router.push('/');

    } catch (error) {
            console.error('로그인 실패:', error.response?.data || error.message);
            alert('로그인에 실패했습니다. 아이디나 비밀번호가 다릅니다.');
    }
};
</script>

