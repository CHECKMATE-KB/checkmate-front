<template>
  <div class="mypage-container">
    <header class="header">
      <h3>내 정보</h3>
      <div class="user-info">
        <span>안녕하세요, 정단호님</span>
      </div>
    </header>
    <main class="content">
      <div class="profile-section">
        <img src="https://via.placeholder.com/150" alt="Profile" class="profile-image" />
        <div class="contact-info">
          <div class="info-row">
            <p><strong>닉네임:</strong> {{ profile.nickname }}</p>
            <i class="edit-icon" @click="openEditPopup">✏️</i>
          </div>
          <div class="info-row">
            <p><strong>이메일:</strong> {{ profile.email }}</p>
            <i class="edit-icon" @click="openEditPopup">✏️</i>
          </div>
          <!-- <div class="info-row">
            <p><strong>연락처:</strong> {{ profile.phone }}</p>
            <i class="edit-icon" @click="openEditPopup">✏️</i>
          </div> -->
          <div class="info-row">
            <p><strong>포인트:</strong> {{ profile.points }}</p>
            <button class="convert-btn" @click="openConvertPopup">전환하기</button>
          </div>
        </div>
      </div>

      <!-- 두 개의 카드 섹션 -->
      <div class="card-row">
        <div class="card">
          <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
        </div>
        <div class="card">
          <h3>Card 2</h3>
          <p>Some content for Card 2</p>
        </div>
      </div>

      <div class="messages-section">
        <div class="calendar-section">
        <h3>지출 내역</h3>
        <div ref="calendar" id="full-calendar" class="small-calendar"></div>
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
          <div class="patient-card" v-for="(card, index) in Credit" :key="index">
            <button class="delete-card-btn" @click="removeCard(index)">X</button>
            <h3>{{ card.cardHolder }}</h3>
            <p><strong>카드 번호:</strong> {{ card.cardNumber }}</p>
            <p><strong>유효 기간:</strong> {{ card.expiration }}</p>
          </div>
        </div>

      </div>
    </main>

    <div class="popup-overlay" v-if="isConvertPopupVisible">
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
      </div>

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

/* --------------------------
   사용자 정보 관리
-------------------------- */
const profile = ref({
  nickname: "",
  email: "",
  phone: "",
  points: 0,
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


const initializeCalendar = () => {
  if (calendar.value) {
    const calendarEl = calendar.value;

    const fullCalendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      initialView: "dayGridMonth",
      height: "400px",
      contentHeight: "auto",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "",
      },
      events: events.value, // 동적으로 업데이트된 이벤트 사용
      eventClick: (info) => {
        alert(`이벤트 제목: ${info.event.title}`);
      },
    });

    fullCalendar.render();

    // 캘린더 파괴
    onBeforeUnmount(() => {
      fullCalendar.destroy();
    });
  }
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
          color: "#333",
        },
      },
      title: {
        display: true,
        text: "카테고리별 소비 내역",
        color: "#333",
        font: { size: 20 },
      },
    },
  };
};

/* --------------------------
   결제 내역 가져오기
-------------------------- */
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
      const category = parseInt(history.historyCategory, 10);
      const price = parseInt(history.price, 10);
      if (!categoryData[category]) {
        categoryData[category] = 0;
      }
      categoryData[category] += price;
    });

    setupChartData(categoryData);

    // 소비 내역을 캘린더 이벤트로 변환
    const calendarEvents = buyHistory.map((history) => ({
      title: `₩${history.price} - 카테고리 ${history.historyCategory}`,
      start: new Date(history.historyDate).toISOString().split("T")[0], // 날짜만 사용
    }));

    events.value = calendarEvents; // 이벤트 데이터 업데이트
    console.log(events.value); // fetchBuyHistory 호출 후 출력

  } catch (error) {
    console.error("Failed to fetch buy history:", error);
  }
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

</script>


<style scoped>
/* 전체 배경 설정 */
.mypage-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
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
  object-fit: cover;
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
  /* height: 260px; 삭제 */
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
  justify-content: center; /* 가운데 정렬 */
  gap: 20px;
  flex-wrap: wrap;
}
.patient-card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  background: #f7f8fa;
  width: 320px;
  height: 150px;
  box-sizing: border-box;
  text-align: center;
}
.patient-card h3 {
  font-size: 18px;
  margin-bottom: 10px;
}
.delete-card-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 14px;
  cursor: pointer;
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

/* 캘린더 배경 스타일 */
.fc .fc-toolbar-title {
  font-size: 20px !important;
  color: #4CAF50 !important;
  font-weight: bold !important;
}

.fc .fc-button {
  background-color: #4CAF50 !important;
  color: white !important;
  border: none !important;
  border-radius: 5px !important;
  padding: 5px 10px !important;
}
.fc .fc-button:hover {
  background-color: #45a049 !important;
}

/* 날짜 셀 스타일 */
.fc-daygrid-day {
  border: 1px solid #f0f0f0 !important;
  padding: 10px !important;
  transition: background-color 0.2s !important;
}
.fc-daygrid-day:hover {
  background-color: #f9f9f9 !important;
}

/* 오늘 날짜 강조 */
.fc-day-today {
  background-color: rgba(76, 175, 80, 0.1) !important;
  border: 1px solid #4CAF50 !important;
}

/* 이벤트 스타일 */
.fc-event {
  background-color: #4CAF50 !important;
  color: #fff !important;
  border-radius: 5px !important;
  padding: 5px !important;
  font-size: 12px !important;
}

.convert-btn {
  margin-left: 10px;
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom:15px;
}
.convert-btn:hover {
  background-color: #45a049;
}

/* 오류 메시지 스타일 */
.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 10px;
}

</style>
