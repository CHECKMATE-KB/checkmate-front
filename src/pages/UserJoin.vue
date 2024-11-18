<template>
    <!--  html 전체 영역 container -->
    <div id="page-container">
        <div class="left-container"> <!-- 좌측 이미지 영역 -->
            <img src="../assets/images/logo.png" width="650px" height="450px">
        </div>

        <!-- 우측 회원가입 폼 영역 -->
        <div id="right-container">
            <!-- 로그인 페이지 타이틀 -->
            <div id="loginBoxTitle">계정을 만드세요</div>
            <p style="color:#B1B3B9; padding-bottom:16px;">디지털 자산 거래를 시작합니다.</p>
            <!-- 아이디, 비번, 버튼 박스 -->
            <form @submit.prevent="handleJoin">
                <label for="userId" style="font-weight: bold;">아이디</label>
                <input id="userId" v-model="user.userId" type="text" placeholder="아이디를 입력하세요." required />
        
                <label for="userPw" style="font-weight: bold;">비밀번호</label>
                <input id="userPw" v-model="user.userPw" type="password" placeholder="비밀번호를 입력하세요." required />
        
                <label for="confirmPw" style="font-weight: bold;">비밀번호 확인</label>
                <input id="confirmPw" v-model="confirmPw" type="password" placeholder="비밀번호를 다시 입력하세요." required />
        
                <label for="email" style="font-weight: bold;">이메일</label>
                <input id="email" v-model="user.email" type="email" placeholder="이메일 주소를 입력하세요." required />
        
                <label for="birth" style="font-weight: bold;">생년월일</label>
                <input id="birth" v-model="user.birth" @input="formatBirth" maxlength="10" placeholder="생년월일을 - 없이 입력해주세요." required />
        
                <label for="userName" style="font-weight: bold;">사용자 이름</label>
                <input id="userName" v-model="user.userName" type="text" placeholder="본인의 이름을 입력해주세요." required />
        
                <label for="nickname" style="font-weight: bold;">닉네임</label>
                <input id="nickname" v-model="user.nickname" type="text" placeholder="닉네임을 입력해주세요." />
        
                <label for="userImg" style="font-weight: bold;">프로필 이미지 URL</label>
                <input id="userImg" v-model="user.userImg" type="text" placeholder="프로필 이미지 URL을 입력해주세요." />

                <button type="submit" class="signup-button">가입</button>
            </form>

            <p class="login-link">
                이미 계정이 있으신가요? <a href="/login" style="color:#FFB229;">로그인하기</a>
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
    background-color: #ffa500;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
}
  
.signup-button:hover {
    background-color: #e69500;
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
import { ref,reactive  } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
////////////////////////////// 생년월일 //////////////////////////////
// 생년월일 상태 및 에러 메시지 관리
const birth = ref('');

// 생년월일 포맷팅 함수
const formatBirth = () => {
  // 숫자만 남기기
  let rawValue = birth.value.replace(/[^0-9]/g, '');
  
  // 하이픈 추가
  if (rawValue.length >= 4 && rawValue.length <= 6) {
    rawValue = rawValue.slice(0, 4) + '-' + rawValue.slice(4);
  } else if (rawValue.length > 6) {
    rawValue = rawValue.slice(0, 4) + '-' + rawValue.slice(4, 6) + '-' + rawValue.slice(6);
  }

  // 포맷팅된 값으로 업데이트
  birth.value = rawValue;
};

////////////////////////////// 생년월일 //////////////////////////////
// 사용자 정보 초기값
const user = reactive({
  userId: '',
  userPw: '',
  userName: '',
  email: '',
  birth: '',
  userImg: '',
  nickname: '',
  accountNo: null,
});

// 가입 처리 함수
const handleJoin = async () => {
    try {
        const response = await axios.post('api/user/join', user);
        alert("가입이 완료되었습니다!");
        console.log("가입 성공 : ", response.data);
        // 가입 성공 후 로그인 페이지로 이동
        router.push('/login');
    } catch (error) {
        console.error('가입 실패:', error.response?.data || error.message);
        alert('가입에 실패했습니다. 다시 시도해주세요.');
    }
}

// Todo : 로그인 중복 체크 추가 예정

</script>
