<template>
    <!--  html 전체 영역 container -->
    <div id="page-container">
        <div class="left-container"> <!-- 좌측 이미지 영역 -->
            <img src="../assets/images/logo.png" width="550px" height="700px">
        </div>

        <!-- 우측 회원가입 폼 영역 -->
        <div id="right-container">
            <!-- 로그인 페이지 타이틀 -->
            <div id="loginBoxTitle">계정을 만드세요</div>
            <p style="color:#B1B3B9; padding-bottom:16px;">디지털 자산 거래를 시작합니다.</p>
            <!-- 아이디, 비번, 버튼 박스 -->
            <form @submit.prevent="handleJoin">
                <label for="userId" style="font-weight: bold;">아이디</label>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input id="userId" v-model="user.userId" type="text" placeholder="아이디를 입력하세요." required />
                    <button type="button" class="duplicate-check-btn" @click="checkDuplicateId">중복 확인</button>
                </div>

                <label for="userPw" style="font-weight: bold;">비밀번호</label>
                <input id="userPw" v-model="user.userPw" type="password" placeholder="비밀번호를 입력하세요." required />
        
                <label for="confirmPw" style="font-weight: bold;">비밀번호 확인</label>
                <input id="confirmPw" v-model="user.confirmPw" type="password" placeholder="비밀번호를 다시 입력하세요." required />
        
                <label for="email" style="font-weight: bold;">이메일</label>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input id="email" v-model="user.email" type="email" placeholder="이메일 주소를 입력하세요." required />
                    <button type="button" class="duplicate-check-btn" @click="checkDuplicateEmail">중복 확인</button>
                </div>

                <label for="birth" style="font-weight: bold;">생년월일</label>
                <input id="birth" v-model="user.birth" @input="formatBirth" maxlength="10" placeholder="생년월일을 - 없이 입력해주세요." required />
        
                <label for="userName" style="font-weight: bold;">사용자 이름</label>
                <input id="userName" v-model="user.userName" type="text" placeholder="본인의 이름을 입력해주세요." required />
        
                <label for="nickname" style="font-weight: bold;">닉네임</label>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input id="nickname" v-model="user.nickname" type="text" placeholder="닉네임을 입력해주세요." />
                    <button type="button" class="duplicate-check-btn" @click="checkDuplicateNickName">중복 확인</button>
                </div>
                
        
                <label for="userImg" style="font-weight: bold;">프로필 이미지 선택</label>
                <div id="profile-images" style="display: flex; gap: 10px; margin-bottom: 15px;">
                    <!-- 후보 이미지 5개를 반복 렌더링 -->
                    <img 
                        v-for="(image, index) in profileImages" 
                        :key="index" 
                        :src="image" 
                        @click="selectProfileImage(image)" 
                        :class="{'selected-image': user.userImg === image}" 
                        alt="프로필 이미지" 
                        style="width: 60px; height: 60px; border-radius: 50%; cursor: pointer; border: 2px solid transparent;" 
                    />
                </div>
                <!-- <p style="color: #777;">선택된 이미지: <strong>{{ user.userImg }}</strong></p> -->

                <button type="submit" class="signup-button" style="margin-top:20px;">가입</button>
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
    height: 40px;
    flex: 1;
    padding: 10px;
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

.duplicate-check-btn {
    background-color: blue; 
    color: white; 
    height: 40px; 
    padding: 0 15px; 
    font-size: 14px; 
    white-space: nowrap; 
    border: none; 
    border-radius: 5px;
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

.selected-image {
    border-color: blue; /* 선택된 이미지 테두리 색 */
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.5); /* 강조 효과 */
}
</style>

<script setup>
import { ref,reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
////////////////////////////// 회원가입 //////////////////////////////
// 사용자 정보 초기값
const user = reactive({
  userId: '',
  userPw: '',
  confirmPw: '',
  userName: '',
  email: '',
  birth: '',
  userImg: '',
  nickname: '',
  accountNo: null,
});
// 사용자 계정 중복 확인 유무 (모두가 true가 되어야 가입을 할 수 있도록 한다.)
let isDuplicated = reactive({
    userId: true,
    userEmail : true,
    nickname : true,
})

// 최종 가입 처리 함수
const handleJoin = async () => {
    if(isDuplicated.userId == true) { // 1) 아이디 중복 체크 확인이 안된 경우
        alert('아이디 중복 확인 버튼을 눌러 중복 확인을 해주세요.');
        return;
    }
    else if(isDuplicated.userEmail == true) { // 3) 이메일 중복 체크 확인이 안된 경우
        alert('이메일 중복 확인 버튼을 눌러 중복 확인을 해주세요.');
        return;
    }
    else if(isDuplicated.nickname == true) { // 5) 닉네임 중복 체크 확인이 안된 경우
        alert('닉네임 중복 확인 버튼을 눌러 중복 확인을 해주세요.');
        return;
    }
    
    else if(user.userPw != user.confirmPw) { // 2) 비밀번호 와 비밀번호 확인 값이 같지 않은 경우
        alert('비밀번호와 비밀번호 확인 값이 같지 않습니다. 다시 입력해주세요.');
        return;
    }


    
    else {
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


}

// Todo : 
// 1) 아이디 중복 검사 버튼 만들어서 아이디 중복 검사 체크 (1)
// 2) 비밀번호 / 비밀번호 확인이 같은지 체크 (2)
// 3) 이메일 중복 검사 버튼 만들어서 이메일 중복 검사 체크 (1)
// 4) 생년월일 형태가 "2000-12-23" 형태가 되도록 자동 완성 해주기 (3)
// 5) 닉네임 중복 검사 버튼 만들어서 닉네임 중복 검사 체크 (1)
// 6) 이미지 선택 가능하도록 만들기

// 1) 아이디 중복 검사 체크
const checkDuplicateId = async () => {
    if(user.userId == '') {
        alert("아이디를 입력해주세요.");
        return;
    }

    try {
        // console.log("요청 API 주소 : " + `api/user/checkid/${user.userId}`);
        let checkResult = await axios.get(`api/user/checkid/${user.userId}`);
        // console.log(checkResult.data);
        if(checkResult.data == true) { // 이미 가입된 아이디가 있는 경우
            isDuplicated.userId = true;
            alert("이미 중복된 아이디가 있습니다. 다시 입력해주세요.");
        }
        else { // 기존 가입된 아이디가 없는 경우
            isDuplicated.userId = false;
            alert("사용 가능한 아이디입니다.");
        }
    } catch (error) {
        console.log("뭔가 문제가 발생했음 : checkDuplicateId 함수 확인");
    }
}

// 3) 이메일 중복 검사 체크
const checkDuplicateEmail = async () => {
    if(user.email == '') {
        alert("이메일을 입력해주세요.");
        return;
    }

    try {
        let checkResult = await axios.get(`api/user/checkemail/${user.email}`);
        // console.log(checkResult.data);
        if(checkResult.data == true) { // 이미 가입된 이메일이 있는 경우
            isDuplicated.userEmail = true;
            alert("이미 중복된 이메일이 있습니다. 다시 입력해주세요.");
        }
        else { // 기존 가입된 이메일이 없는 경우
            isDuplicated.userEmail = false;
            alert("사용 가능한 이메일입니다.");
        }
    } catch(error) {
        console.log("뭔가 문제가 발생했음 : checkDuplicateEmail 함수 확인");
    }
}

// 5) 닉네임 중복 검사 체크
const checkDuplicateNickName = async () => {

    if(user.nickname == '') {
        alert("닉네임을 입력해주세요.");
        return;
    }

    try {
        let checkResult = await axios.get(`api/user/checknickname/${user.nickname}`);
        // console.log(checkResult.data);
        if(checkResult.data == true) { // 이미 가입된 닉네임이 있는 경우
            isDuplicated.nickname = true;
            alert("이미 중복된 닉네임이 있습니다. 다시 입력해주세요.");
        }
        else { // 기존 가입된 닉네임이 없는 경우
            isDuplicated.nickname = false;
            alert("사용 가능한 닉네임입니다.");
        }
    } catch(error) {
        console.log("뭔가 문제가 발생했음 : checkDuplicateNickName 함수 확인");
    }
}

////////////////////////////// 4) 생년월일 포맷팅 //////////////////////////////
// 생년월일 포맷팅 함수
const formatBirth = () => {
    console.log("formatBirth 호출됨");
    // 숫자만 남기기
    let rawValue = user.birth.replace(/[^0-9]/g, '');

    // 입력된 숫자가 4자리 이상인 경우 연도와 월-일을 분리
    if (rawValue.length >= 4) {
        let year = rawValue.slice(0, 4); // 연도
        let month = rawValue.slice(4, 6); // 월
        let day = rawValue.slice(6, 8); // 일

        // 월과 일이 존재할 경우 하이픈 추가
        if (month) {
            month = '-' + month;
        }
        if (day) {
            day = '-' + day;
        }

        // 포맷팅된 값으로 업데이트
        user.birth = year + month + day;
    } else {
        // 4자리 미만이면 숫자만 표시
        user.birth = rawValue;
    }
};

////////////////////////////// 6) 프로필 이미지 선택 //////////////////////////////
import { storeUserImg } from '../stores/userState';

// 프로필 이미지 후보 경로 배열
const profileImages = [
    '../../src/assets/images/profiles/profile1.png',
    '../../src/assets/images/profiles/profile2.png',
    '../../src/assets/images/profiles/profile3.png',
    '../../src/assets/images/profiles/profile4.png',
    '../../src/assets/images/profiles/profile5.png',
    '../../src/assets/images/profiles/profile6.png',
];

// 프로필 이미지 선택 함수
const selectProfileImage = (imagePath) => {
    user.userImg = imagePath; // 선택한 이미지 경로 저장
    storeUserImg.value = '../' + imagePath; // 전역 상태 업데이트
};

</script>
