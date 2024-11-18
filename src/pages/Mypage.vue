<template>
  <div class="my-page">
    <!-- User Profile Section -->
    <div class="profile-section card">
      <div class="profile-image"></div>
      <div class="profile-info">
        <div class="profile-name">
          <span>체크메이트</span>
          <button @click="editProfile('name')">✏️</button>
        </div>
        <div class="profile-email">
          <span>{{ email }}</span>
          <button @click="editProfile('email')">✏️</button>
        </div>
      </div>
    </div>

    <!-- Main Section with Calendar and Chart -->
    <div class="main-section">
      <!-- Calendar Section -->
      <div class="calendar-section card">
        <h3>지출 내역</h3>
        <div ref="calendar" id="full-calendar" class="small-calendar"></div>
      </div>

      <!-- Pie Chart Section -->
      <div class="chart-section card">
        <h3>카테고리별 소비</h3>
        <div class="chart-container">
          <canvas ref="pieChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";

Chart.register(ArcElement, Tooltip, Legend, Title);

const email = ref("dsfjls0354634@naver.com");
const calendar = ref(null);

// 이벤트 데이터
const events = [
  { title: "수입 100,000원", start: "2024-11-02" },
  { title: "지출 5,000원", start: "2024-11-13" },
  { title: "지출 10,000원", start: "2024-11-20" },
];

// FullCalendar 초기화
onMounted(() => {
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
      events: events,
      eventClick: (info) => {
        alert(`이벤트 제목: ${info.event.title}`);
      },
    });

    fullCalendar.render();

    onBeforeUnmount(() => {
      fullCalendar.destroy();
    });
  }
});

// Chart.js 차트 데이터
const pieChart = ref(null);
onMounted(() => {
  if (pieChart.value) {
    const ctx = pieChart.value.getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["술·유흥", "식비", "의료·건강·피트니스", "미용", "그 외 15개 카테고리"],
        datasets: [
          {
            data: [25, 30, 15, 10, 20],
            backgroundColor: ["#3b82f6", "#10b981", "#f97316", "#f43f5e", "#64748b"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                size: 16,
                weight: "bold",
              },
              color: "#000",
            },
          },
          title: {
            display: true,
            text: "카테고리별 소비",
            font: {
              size: 20,
            },
          },
        },
      },
    });
  }
});

// 프로필 수정 핸들러
const editProfile = (field) => {
  if (field === "name") {
    alert("프로필 이름 수정 기능 구현 예정");
  } else if (field === "email") {
    alert("이메일 수정 기능 구현 예정");
  }
};
</script>

<style scoped>
/* 전체 페이지 스타일 */
.my-page {
  font-family: 'Arial', sans-serif;
  background-color: #f9fafb;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

/* 공통 카드 스타일 */
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px; /* 카드 최대 너비 */
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden; /* 내용이 넘치지 않게 설정 */
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

/* 프로필 섹션 스타일 */
.profile-section {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  text-align: center;
  gap: 2rem;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #3b82f6;
  background-color: #e5e7eb;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-grow: 1;
  gap: 0.5rem;
}

.profile-name span,
.profile-email span {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}

.profile-name button,
.profile-email button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #3b82f6;
  margin-left: 0.5rem;
}

.profile-name button:hover,
.profile-email button:hover {
  color: #2563eb;
}

/* 메인 섹션 */
.main-section {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap; /* 작은 화면에서 세로 정렬 */
}

/* 캘린더 섹션 */
.calendar-section {
  flex: 1;
  max-width: 800px; /* 캘린더 최대 너비 */
  text-align: center;
  background: #ffffff;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 700px; /* 캘린더 높이 키움 */
}

.calendar-section h3 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

#full-calendar {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  height: 100%; /* 카드 높이에 맞춤 */
  width: 100%; /* 가로 크기 꽉 차게 */
}

/* 차트 섹션 */
.chart-section {
  flex: 1;
  max-width: 800px; /* 차트 최대 너비 */
  text-align: center;
  background: #ffffff;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 700px; /* 차트 높이 키움 */
}

.chart-section h3 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.chart-container {
  width: 100%;
  height: 100%; /* 카드 높이에 맞춤 */
}

canvas {
  width: 100% !important;
  height: 100% !important;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .main-section {
    flex-direction: column; /* 세로 정렬 */
  }

  .calendar-section,
  .chart-section {
    max-width: 100%; /* 작은 화면에서 가로 크기 제한 해제 */
    height: 500px; /* 모바일에서 높이 조정 */
  }

  #full-calendar {
    height: 100%;
  }

  .chart-container {
    height: 100%;
  }
}

@media (max-width: 576px) {
  .calendar-section h3,
  .chart-section h3 {
    font-size: 1.8rem; /* 모바일에서 제목 크기 축소 */
  }

  .profile-name span {
    font-size: 1.4rem; /* 더 작은 화면에서 텍스트 크기 축소 */
  }

  .profile-email span {
    font-size: 1rem; /* 이메일 크기 조정 */
  }

  .calendar-section,
  .chart-section {
    height: 450px; /* 더 작은 화면에서 높이 축소 */
  }

  .chart-container {
    height: 600px;
  }

  #full-calendar {
    height: 600px;
  }
}

</style>
