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
          <div class="info-row">
            <p><strong>연락처:</strong> {{ profile.phone }}</p>
            <i class="edit-icon" @click="openEditPopup">✏️</i>
          </div>
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
        <div class="patient-list">
          <div class="patient-card" v-for="(Credit, index) in limitedCredit" :key="index">
            <button class="delete-card-btn" @click="removeCard(index)">X</button>
            <h3>{{ Credit.cardHolder }}</h3>
            <p><strong>카드 번호:</strong> {{ Credit.cardNumber }}</p>
            <p><strong>유효 기간:</strong> {{ Credit.expiration }}</p>
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


const calendar = ref(null);
// 이벤트 데이터
const events = ref([
  { title: "수입 100,000원", start: "2024-11-02" },
  { title: "지출 5,000원", start: "2024-11-13" },
  { title: "지출 10,000원", start: "2024-11-20" },
]);



// Chart.js 플러그인 등록
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);


// 차트 데이터와 옵션
const chartData = ref(null); // 초기값을 null로 설정
const chartOptions = ref(null);

const setupChartData = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient1.addColorStop(0, "#FF9A9E");
  gradient1.addColorStop(1, "#FAD0C4");

  const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient2.addColorStop(0, "#FBC2EB");
  gradient2.addColorStop(1, "#A6C1EE");

  const gradient3 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient3.addColorStop(0, "#96E6A1");
  gradient3.addColorStop(1, "#D4FC79");

  const gradient4 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient4.addColorStop(0, "#84FAB0");
  gradient4.addColorStop(1, "#8FD3F4");

  const gradient5 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient5.addColorStop(0, "#A18CD1");
  gradient5.addColorStop(1, "#FBC2EB");

  chartData.value = {
    labels: ["식비", "교통비", "엔터테인먼트", "쇼핑", "기타"],
    datasets: [
      {
        label: "카테고리별 소비",
        data: [200, 150, 100, 250, 50],
        backgroundColor: [
          gradient1,
          gradient2,
          gradient3,
          gradient4,
          gradient5,
        ],
        hoverBackgroundColor: [
          gradient1,
          gradient2,
          gradient3,
          gradient4,
          gradient5,
        ],
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
          font: {
            size: 14,
          },
          color: "#333",
        },
      },
      title: {
        display: true,
        text: "카테고리별 소비 내역",
        color: "#333",
        font: {
          size: 20,
        },
      },
    },
  };
};


// onMounted에서 차트 데이터 초기화
onMounted(() => {
  // 차트 데이터 초기화
  setupChartData();

  // 캘린더 초기화
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
      events: events.value, // events를 ref로 사용
      eventClick: (info) => {
        alert(`이벤트 제목: ${info.event.title}`);
      },
    });

    fullCalendar.render();

    // onBeforeUnmount를 통한 정리 작업
    onBeforeUnmount(() => {
      fullCalendar.destroy();
    });
  }
});

// 프로필 데이터
const profile = ref({
  nickname: "딴호호호우",
  email: "정단호@gmail.com",
  phone: "010-1234-1234",
  points: 1000,
});

const isConvertPopupVisible = ref(false);
const convertAmount = ref(0);
const convertError = ref("");

// 전환 팝업 열기
const openConvertPopup = () => {
  convertAmount.value = 0;
  convertError.value = "";
  isConvertPopupVisible.value = true;
};

// 전환 팝업 닫기
const closeConvertPopup = () => {
  isConvertPopupVisible.value = false;
};

// 포인트 전환
const convertPoints = () => {
  if (convertAmount.value <= 0) {
    convertError.value = "전환할 포인트를 1 이상 입력하세요.";
    return;
  }

  if (convertAmount.value > profile.value.points) {
    convertError.value = "보유 포인트를 초과할 수 없습니다.";
    return;
  }

  // 포인트 전환 로직
  profile.value.points -= convertAmount.value;
  alert(`${convertAmount.value} 포인트가 성공적으로 전환되었습니다.`);
  closeConvertPopup();
};

// 팝업 상태 관리
const isPopupVisible = ref(false);
const editProfile = ref({ ...profile.value });
const isCardModalVisible = ref(false);

// 팝업 열기
const openEditPopup = () => {
  editProfile.value = { ...profile.value };
  isPopupVisible.value = true;
};

// 팝업 닫기
const closePopup = () => {
  isPopupVisible.value = false;
};


// 카드 등록 모달 열기
const openCardModal = () => {
  isCardModalVisible.value = true;
};

// 카드 등록 모달 닫기
const closeCardModal = () => {
  isCardModalVisible.value = false;
};


// 프로필 저장
const saveProfile = () => {
  profile.value = { ...editProfile.value };
  closePopup();
};

// 카드(카드 정보 출력)
const Credit = ref([]);

// 제한된 카드 리스트
const limitedCredit = computed(() => Credit.value.slice(0, 3));

// 카드 삭제 함수
const removeCard = (index) => {
  Credit.value.splice(index, index + 1);
};

// 카드 추가 함수
const addCard = (card) => {
  Credit.value.push(card);
  closeCardModal();
};



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
  height:260px;
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
