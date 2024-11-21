<template>
  <div class="mypage-container">
    <header class="header">
      <h3>내 정보</h3>
      <div class="user-info">
        <span>안녕하세요, {{ profile.nickname }}님</span>
      </div>
    </header>
    <main class="content">
      <div class="profile-section">
        <img :src="profile.userImg" alt="Profile" class="profile-image" />
        <!-- <img src="../assets/images/character5_temp.jpg" alt="Profile" class="profile-image" /> -->
        <div class="contact-info">
          <div class="info-row">
            <p><strong>닉네임:</strong> {{ profile.nickname }}</p>
            <i class="edit-icon" @click="openEditPopup">✏️</i>
          </div>
          <div class="info-row">
            <p><strong>이메일:</strong> {{ profile.email }}</p>
            <i class="edit-icon" @click="openEditPopup">✏️</i>
          </div>
          <div class="info-row">
            <p><strong>포인트:</strong> {{ profile.points }}</p>
            <button class="convert-btn" @click="openConvertPopup">포인트리로 전환하기</button>
          </div>
        </div>
      </div>

      <!-- 포인트 전환 팝업 -->
      <div class="popup-overlay" v-if="isConvertPopupVisible">
        <div class="popup">
          <h3>포인트 전환</h3>
          <p>현재 모든 포인트를 전환하시겠습니까?</p>
          <div class="popup-buttons">
            <button @click="convertPoints">확인</button>
            <button @click="closeConvertPopup">취소</button>
          </div>
          <p class="error-message" v-if="convertError">{{ convertError }}</p>
        </div>
      </div>

      <!-- 전환 성공 애니메이션 -->
      <div class="success-animation" v-if="isAnimationVisible">
        🎉 모든 포인트를 포인트리로 전환했습니다! 🎉
      </div>

      <!-- 두 개의 카드 섹션 -->
      <div class="card-row">
        <div class="card" id="chartCard">
          <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
        </div>
        <div class="card" id="tipcard">
          <div class="tip-card">
          <h3>💡 체크메이트와 함께하는 챌린지 꿀팁</h3>
          <div class="tip-content">
            <p>{{ currentTip }}</p>
          </div>
          <div class="tip-actions">
            <button @click="refreshTip">새로운 팁 보기</button>
          </div>
        </div>
        </div>
      </div>

      <div class="messages-section">
        <div class="calendar-section">
        <h3>지출 내역</h3>
        <div ref="calendar" id="full-calendar" class="small-calendar"></div>
      </div>
      <div v-if="isModalVisible" class="modal-overlay">
        <div class="modal trendy-modal">
          <div class="modal-header">
            <h3>
              <i class="fa fa-info-circle"></i> 지출 상세 정보
            </h3>
            <button class="close-button" @click="closeModal">
              <i class="fa fa-times"></i>
            </button>
          </div>
          <ul class="modal-content">
            <li>
              <strong>💵 금액:</strong> ₩{{ modalData.price || 'N/A' }}
            </li>
            <li>
              <strong>📂 카테고리:</strong> {{ modalData.historyCategory || 'N/A' }}
            </li>
            <li>
              <strong>💳 카드 번호:</strong> {{ modalData.cardNumber || 'N/A' }}
            </li>
            <li>
              <strong>📅 날짜:</strong>
              {{ modalData.historyDate ? formatDate(modalData.historyDate) : 'N/A' }}
            </li>
          </ul>
        </div>
      </div>
      
      </div>
      
    

      <div class="patients-section">
        <div class="section-header">
          <h2>등록된 카드목록</h2>
          <button class="add-card-btn" @click="openCardModal">카드 등록</button>
        </div>
        <!-- <div class="patient-list">
          <div class="patient-card" v-for="(Credit, index) in limitedCredit" :key="index">
            <button class="delete-card-btn" @click="removeCard(index)">X</button>
            <h3>{{ Credit.cardHolder }}</h3>
            <p><strong>카드 번호:</strong> {{ Credit.cardNumber }}</p>
            <p><strong>유효 기간:</strong> {{ Credit.expiration }}</p>
          </div>
        </div> -->
        <div class="patient-list">
        <div
          class="credit-card"
          v-for="(card, index) in Credit"
          :key="index"
        >
          <div class="card-header">
            <span class="card-title">KB국민카드</span>
          </div>
          <div class="card-body">
            <div class="chip"></div>
            <p class="card-number">{{ card.cardNumber }}</p>
            <p class="card-expiration">
              <strong>유효기간:</strong> {{ card.expiration }}
            </p>
          </div>
          <div class="card-hover-info">
            <p><strong>카드 별명:</strong> {{ card.cardHolder }}</p>
            <p><strong>소유자:</strong> {{ profile.nickname }}</p>
            <p><strong>유효기간:</strong> {{ card.expiration }}</p>
          </div>
          <button class="delete-card-btn" @click="removeCard(index)">삭제</button>
        </div>
      </div>
      </div>
    </main>
    
    

    <!-- <div class="popup-overlay" v-if="isConvertPopupVisible">
        <div class="popup">
          <h3>포인트 전환</h3>
          <label>
            전환할 포인트 입력:
            <input type="number" v-model.number="convertAmount" />
          </label>
          <div class="popup-buttons">
            <button @click="convertPoints">전환</button>
            <button @click="closeConvertPopup">취소</button>
          </div>
          <p class="error-message" v-if="convertError">{{ convertError }}</p>
        </div>
      </div> -->

    <!-- 수정 팝업 -->
    <div class="popup-overlay" v-if="isPopupVisible">
      <div class="popup">
        <h3>정보 수정</h3>
        <label>
          닉네임:
          <input type="text" v-model="editProfile.nickname" />
        </label>
        <label>
          이메일:
          <input type="email" v-model="editProfile.email" />
        </label>
        <label>
          연락처:
          <input type="text" v-model="editProfile.phone" />
        </label>
        <div class="popup-buttons">
          <button @click="saveProfile">저장</button>
          <button @click="closePopup">취소</button>
        </div>
      </div>
    </div>
  </div>
 
 

  <!-- 카드 등록 모달 -->
<div class="popup-overlay" v-if="isCardModalVisible">
  <div class="popup">
    <div class="popup-header">
      <h3>카드 등록</h3>
      <button class="close-card-btn" @click="closeCardModal">X</button>
    </div>
    <CreditCard @add-card="addCard" />
  </div>
</div>

</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import CreditCard from "./CreditCard.vue";
import { Doughnut } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

// Chart.js 플러그인 등록
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

// 맞춤형 금융 팁 데이터
const tips = [
  "이번 달 교통비를 절약하기 위해 대중교통을 적극 활용해보세요.",
  "주 1회 외식을 줄이면 약 5만 원을 절약할 수 있습니다.",
  "쇼핑 전에 꼭 장바구니를 작성하고 계획적으로 소비하세요.",
  "저축 계좌에 자동 이체를 설정하여 꾸준히 저축하세요.",
  "불필요한 구독 서비스를 점검하고 해지하세요.",
  "매달 고정 지출을 분석해 불필요한 항목을 줄여보세요.",
];

const currentTip = ref(tips[0]); // 기본적으로 첫 번째 팁을 표시

// 팁 새로고침 함수
const refreshTip = () => {
  const randomIndex = Math.floor(Math.random() * tips.length);
  currentTip.value = tips[randomIndex];
};

/* --------------------------
   사용자 정보 관리
-------------------------- */
const profile = ref({
  nickname: "",
  email: "",
  phone: "",
  points: 0,
  userImg:""
});

const fetchUserProfile = async () => {
  const userNo = localStorage.getItem("userNo");
  if (!userNo) {
    console.error("User number not found in localStorage.");
    return;
  }

  try {
    const response = await axios.get(`/api/user/info/${userNo}`);
    const userData = response.data;

    profile.value = {
      nickname: userData.nickname || "닉네임 없음",
      email: userData.email || "이메일 없음",
      phone: userData.phone || "연락처 없음",
      points: userData.point || 0,
      userImg: userData.userImg || "default.png",
    };
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
};

/* --------------------------
   수정 팝업 관련 상태 관리
-------------------------- */
const isPopupVisible = ref(false);
const editProfile = ref({ ...profile.value });

const openEditPopup = () => {
  editProfile.value = { ...profile.value };
  isPopupVisible.value = true;
};

const closePopup = () => {
  isPopupVisible.value = false;
};

/* --------------------------
   캘린더 초기화
-------------------------- */
const calendar = ref(null);
const events = ref([]); // 초기값은 빈 배열
const isModalVisible = ref(false);
const modalData = ref({});
// 날짜 포맷 함수
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0];
};

// 캘린더 초기화
// const initializeCalendar = () => {
//   if (calendar.value) {
//     const calendarEl = calendar.value;

//     const fullCalendar = new Calendar(calendarEl, {
//       plugins: [dayGridPlugin],
//       initialView: "dayGridMonth",
//       height: "auto",
//       contentHeight: "auto",
//       headerToolbar: {
//         left: "prev,next today",
//         center: "title",
//         right: "",
//       },
//       events: events.value,
//       eventClick: (info) => {
//         modalData.value = info.event.extendedProps; // 상세 정보 가져오기
//         isModalVisible.value = true; // 모달 열기
//       },
//     });

//     fullCalendar.render();
//   }
// };

const initializeCalendar = () => {
  if (calendar.value) {
    const calendarEl = calendar.value;

    const fullCalendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      initialView: "dayGridMonth",
      height: "auto",
      contentHeight: "auto",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "",
      },
      events: events.value,
      eventClick: (info) => {
        console.log("Clicked event data:", info.event.extendedProps);

        // 모달 데이터 업데이트
        openModal(info.event.extendedProps);
      },
    });

    fullCalendar.render();
  }
};

// 모달 닫기 함수
const closeModal = () => {
  isModalVisible.value = false;
};


/* --------------------------
   차트 데이터 초기화
-------------------------- */
const chartData = ref(null);
const chartOptions = ref(null);

const setupChartData = (categoryData) => {
  chartData.value = {
    labels: ["식비", "교통비", "엔터테인먼트", "쇼핑", "기타"],
    datasets: [
      {
        label: "카테고리별 소비",
        data: [
          categoryData[1] || 0,
          categoryData[2] || 0,
          categoryData[3] || 0,
          categoryData[4] || 0,
          categoryData[5] || 0,
        ],
        backgroundColor: ["#FF9A9E", "#FBC2EB", "#96E6A1", "#84FAB0", "#A18CD1"],
        hoverBackgroundColor: ["#FF9A9E", "#FBC2EB", "#96E6A1", "#84FAB0", "#A18CD1"],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  chartOptions.value = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14 },
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: " ",
        color: "#333",
        font: { size: 20 },
      },
    },
  };
};

/* --------------------------
   결제 내역 가져오기
-------------------------- */
// const fetchBuyHistory = async () => {
//   const userNo = localStorage.getItem("userNo");
//   if (!userNo) {
//     console.error("User number not found in localStorage.");
//     return;
//   }

//   try {
//     const response = await axios.get(`/api/buy/${userNo}`);
//     const buyHistory = response.data;

//     // 카테고리별 소비 금액 집계
//     const categoryData = {};
//     buyHistory.forEach((history) => {
//       const category = parseInt(history.historyCategory, 10);
//       const price = parseInt(history.price, 10);
//       if (!categoryData[category]) {
//         categoryData[category] = 0;
//       }
//       categoryData[category] += price;
//     });

//     setupChartData(categoryData);

//     // 소비 내역을 캘린더 이벤트로 변환
//     const calendarEvents = buyHistory.map((history) => ({
//       title: `₩${history.price} - 카테고리 ${history.historyCategory}`,
//       start: new Date(history.historyDate).toISOString().split("T")[0], // 날짜만 사용
//     }));

//     events.value = calendarEvents; // 이벤트 데이터 업데이트
//     console.log(events.value); // fetchBuyHistory 호출 후 출력

//   } catch (error) {
//     console.error("Failed to fetch buy history:", error);
//   }
// };
const fetchBuyHistory = async () => {
  const userNo = localStorage.getItem("userNo");
  if (!userNo) {
    console.error("User number not found in localStorage.");
    return;
  }

  try {
    const response = await axios.get(`/api/buy/${userNo}`);
    const buyHistory = response.data;

    // 카테고리별 소비 금액 집계
    const categoryData = {};
    buyHistory.forEach((history) => {
      const category = parseInt(history.historyCategory, 10); // 카테고리 번호
      const price = parseInt(history.price, 10); // 금액
      if (!categoryData[category]) {
        categoryData[category] = 0;
      }
      categoryData[category] += price; // 카테고리별 금액 합산
    });

    // 차트 데이터 초기화
    setupChartData(categoryData);

    // 소비 내역을 캘린더 이벤트로 변환
    const calendarEvents = buyHistory.map((history) => {
      // historyDate가 밀리초 단위인지 확인
      const date = new Date(history.historyDate);
      if (isNaN(date.getTime())) {
        // 밀리초 단위가 아닌 경우, 초 단위로 간주하여 변환
        history.historyDate = history.historyDate * 1000;
      }
      return {
        title: `₩${history.price}`, // 금액만 표시
        start: new Date(history.historyDate).toISOString().split("T")[0], // 날짜만 사용
        extendedProps: history, // 상세 정보 포함
      };
    });

    events.value = calendarEvents; // 이벤트 데이터 업데이트
    initializeCalendar(); // 캘린더 초기화
  } catch (error) {
    console.error("Failed to fetch buy history:", error);
  }
};



/* --------------------------
   포인트 전환하기
-------------------------- */

const isConvertPopupVisible = ref(false);
const convertAmount = ref(0);
const convertError = ref("");
const isAnimationVisible = ref(false); // 애니메이션 표시 여부

const closeConvertPopup = () => {
  isConvertPopupVisible.value = false; // 팝업 닫기
};


const openConvertPopup = () => {
  isConvertPopupVisible.value = true;
};

const convertPoints = async () => {
  const userNo = localStorage.getItem("userNo");
  if (!userNo) {
    convertError.value = "User ID not found.";
    return;
  }

  try {
    await axios.get(`/api/user/point/${userNo}`); // 백엔드 호출
    profile.value.points = 0; // 프론트에서 포인트 업데이트

    // 애니메이션 표시
    isConvertPopupVisible.value = false;
    showSuccessAnimation();
  } catch (error) {
    convertError.value = "포인트 전환 중 오류가 발생했습니다.";
    console.error("Failed to convert points:", error);
  }
};

// 애니메이션 표시 함수
const showSuccessAnimation = () => {
  isAnimationVisible.value = true;
  setTimeout(() => {
    isAnimationVisible.value = false;
  }, 3000); // 3초 동안 애니메이션 표시
};


/* --------------------------
   카드 목록 가져오기
-------------------------- */
const isCardModalVisible = ref(false);
const Credit = ref([]);
const fetchCards = async () => {
  const userNo = localStorage.getItem("userNo");
  if (!userNo) {
    console.error("User number not found in localStorage.");
    return;
  }

  try {
    const response = await axios.get(`/api/card/list/${userNo}`);
    Credit.value = response.data.map((card) => ({
      cardHolder: card.cardName,
      cardNumber: card.cardNumber,
      expiration: card.expiryDate,
    }));
  } catch (error) {
    console.error("Failed to fetch cards:", error);
  }
};


const removeCard = (index) => {
  Credit.value.splice(index, 1);
};

const addCard = (card) => {
  Credit.value.push(card);
  isCardModalVisible.value = false;
};

const openCardModal = () => {
  isCardModalVisible.value = true;
};

const closeCardModal = () => {
  isCardModalVisible.value = false;
};

/* --------------------------
   컴포넌트 초기화
-------------------------- */
onMounted(async () => {
  await fetchUserProfile(); // 사용자 프로필 로드
  await fetchBuyHistory(); // 소비 내역 로드
  initializeCalendar(); // 캘린더 초기화
  await fetchCards(); 
});
const categoryMap = {
  1: "식비",
  2: "유흥",
  3: "엔터테인먼트",
  4: "쇼핑",
  5: "기타",
};
// const openModal = (data) => {
//   modalData.value = {
//     price: data.price || 0,
//     historyCategory: categoryMap[data.historyCategory] || "미분류", // 매핑된 텍스트 사용
//     cardNo: data.cardNo || "N/A",
//     historyDate: data.historyDate || new Date(),
//   };
//   isModalVisible.value = true; // 모달 열기
// };
const openModal = async (data) => {
  // 기본 모달 데이터를 설정
  modalData.value = {
    price: data.price || 0,
    historyCategory: categoryMap[data.historyCategory] || "미분류",
    cardNo: data.cardNo || "N/A",
    historyDate: data.historyDate || new Date(),
    cardNumber: "로딩 중...", // 로딩 표시
  };

  // 모달 열기
  isModalVisible.value = true;

  // 카드 번호를 가져오기 위한 API 호출
  if (data.cardNo) {
    try {
      const response = await axios.get(`/api/card/cardNumber/${data.cardNo}`);
      modalData.value.cardNumber = response.data.cardNumber || "N/A";
    } catch (error) {
      console.error("Failed to fetch card number:", error);
      modalData.value.cardNumber = "N/A";
    }
  }
};


</script>


<style scoped>
/* 전체 배경 설정 */
.mypage-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #fff;
  min-height: 100vh;
  color: #333;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 프로필 섹션 */
.profile-section {
  display: flex;
  gap: 20px;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #f7f8fa;
  object-fit: cover; /* 이미지 비율 유지하며 영역 채우기 */
  transform: scale(1.0); /* 이미지를 20% 확대 */
  transition: transform 0.3s ease-in-out; /* 효과 부드럽게 */
}
.contact-info {
  flex: 1;
  font-size: 16px;
  color: #555;
}
.contact-info h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}
.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.edit-icon {
  margin-left: 10px;
  cursor: pointer;
  color: #4caf50;
}

/* 메세지 섹션 */
.messages-section {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


/* 카드 섹션 */
.patients-section {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height:550px;
  overflow: hidden; /* 추가: 콘텐츠가 잘리지 않도록 */
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.add-card-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.add-card-btn:hover {
  background-color: #45a049;
}
.patient-list {
  display: flex;
  flex-wrap: wrap; /* 카드가 화면 크기에 따라 줄바꿈 되도록 */
  gap: 20px; /* 카드 간 간격 */
  justify-content: center;
}

.credit-card {
  position: relative;
  background-color: #a5a58d; /* 카드 배경 색상 */
  width: 320px;
  height: 200px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden; /* 내용이 카드 영역을 벗어나지 않도록 설정 */
  transition: transform 0.3s ease;
}

.credit-card:hover {
  transform: scale(1.05); /* 카드 확대 효과 */
}

.card-hover-info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* 반투명 검정 배경 */
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease; /* 부드러운 등장/사라짐 효과 */
  z-index: 10; /* 다른 요소 위에 표시되도록 설정 */
}

.credit-card:hover .card-hover-info {
  opacity: 1; /* hover 시 보이도록 설정 */
}

.card-hover-info p {
  margin: 5px 0;
}

.card-header {
  font-size: 18px;
  color: #fff;
  font-weight: bold;
}

.card-title {
  display: block;
  margin-bottom: 10px;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
}

.chip {
  width: 50px;
  height: 35px;
  background: linear-gradient(135deg, #c0c0c0, #e0e0e0);
  border-radius: 5px;
  margin-bottom: 15px;
}

.card-number {
  font-size: 20px;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.card-expiration {
  font-size: 14px;
  margin-top: 5px;
}

.delete-card-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  z-index: 20; /* 버튼이 항상 hover-info 위에 있도록 설정 */
}

.delete-card-btn:hover {
  background: #ff1a1a;
}


.info-text {
  margin-top: 10px;
  font-size: 14px;
  color: #888;
}

/* 팝업 스타일 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
.popup h3 {
  margin-bottom: 20px;
  font-size: 18px;
}
.popup label {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
}
.popup input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.popup-buttons {
  display: flex;
  justify-content: space-between;
}
.popup-buttons button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.popup-buttons button:first-child {
  background-color: #4caf50;
  color: #fff;
}
.popup-buttons button:last-child {
  background-color: #f44336;
  color: #fff;
}


/* 카드 등록 모달 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
/* 모달 헤더 스타일 */
.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.popup-header h3 {
  font-size: 18px;
  margin: 0;
}

.close-card-btn {
  background-color: transparent;
  color: #333;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.close-card-btn:hover {
  color: #ff4d4d;
}


/* 카드 행 섹션 */
.card-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 20px 0;
}
.card {
  flex: 1; /* 카드가 동일한 크기를 갖도록 설정 */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  height: 600px;;
  background: linear-gradient(135deg, #ffffff, #f7f8fa);
}
.card h3 {
  font-size: 18px;
}
.card p {
  font-size: 24px;
  color: #555;
  margin-top:20px;
}

/* 캘린더 제목 스타일 */
.fc .fc-toolbar-title {
  font-size: 20px !important;
  color: #555 !important; /* 회색으로 변경 */
  font-weight: bold !important;
}

/* 캘린더 버튼 스타일 */
.fc .fc-button {
  background-color: #ccc !important; /* 회색 배경 */
  color: #333 !important; /* 회색 글씨 */
  border: none !important;
  border-radius: 5px !important;
  padding: 5px 10px !important;
}
.fc .fc-button:hover {
  background-color: #bbb !important; /* 더 어두운 회색 */
}

/* 날짜 셀 스타일 */
.fc-daygrid-day {
  border: 1px solid #e0e0e0 !important;
  padding: 10px !important;
  transition: background-color 0.2s !important;
}
.fc-daygrid-day:hover {
  background-color: #f0f0f0 !important;
}

/* 오늘 날짜 강조 */
.fc-day-today {
  background-color: rgba(128, 128, 128, 0.1) !important; /* 연한 회색 */
  border: 1px solid #888 !important; /* 진한 회색 테두리 */
}

/* 이벤트 스타일 */
.fc-event {
  background-color: #888 !important; /* 진한 회색 */
  color: #fff !important;
  border-radius: 5px !important;
  padding: 5px !important;
  font-size: 12px !important;
}

.convert-btn {
  margin-left: 10px;
  background-color: #F8A70C;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom:15px;
}
.convert-btn:hover {
  background-color: #FAB809;
}

/* 오류 메시지 스타일 */
.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 10px;
}

#tipcard {
  background: url('@/assets/images/tipback3.png') no-repeat center center;
  background-size: cover;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, sans-serif;
  color: #fff;
  position: relative;
  overflow: hidden;
}

#chartCard {
  background: url('@/assets/images/tipback2.png') no-repeat center center;
  background-size: cover;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, sans-serif;
  color: #fff;
  position: relative;
  overflow: hidden;
}


/* 카드 제목 */
.tip-card h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #4caf50;
}

/* 내용 */
.tip-content p {
  font-size: 16px;
  line-height: 1.5;
  color: #555;
  margin-bottom: 20px;
}

/* 버튼 스타일 */
.tip-actions button {
  background-color: #F8A70C;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.tip-actions button:hover {
  background-color: #F8A70C;
}

/* 카드 스타일 */
.tip-card {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, sans-serif;
  color: #333;
  width:500px;
}

.success-animation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #d1d127;
  color: white;
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeInOut 3s ease-in-out; /* 애니메이션 효과 */
  font-size: 20px;
  z-index: 1000;
  text-align: center;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  10% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  90% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex !important; /* 항상 flex로 표시 */
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 1 !important; /* 투명도 강제 */
  visibility: visible !important; /* 가시성 강제 */
}

.modal {
  position: relative; /* 부모 안에서 정렬 */
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 400px;
  text-align: left;
  animation: fadeIn 0.3s ease-in-out; /* 부드러운 등장 효과 */
  display: block !important; /* 강제 표시 */
  visibility: visible !important; /* 가시성 강제 */
  height: 285px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}


.close-button {
  background-color: #f44336;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.close-button:hover {
  background-color: #d32f2f;
}


</style>
