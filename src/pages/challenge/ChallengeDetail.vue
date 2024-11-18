<template>
    <div class="challenge-main">
      <!-- 상단 카드 컴포넌트 -->
      <div class="outer-card" :style="{ backgroundImage: `url(${outerBackground})` }">
        <div class="card-container">
          <div
            v-for="participant in participants"
            :key="participant.id"
            class="card"
            :style="{ backgroundImage: `url(${backgroundImage})` }"
            @click="selectParticipant(participant.id)"
          >
            <div class="overlay">
              <img :src="participant.image" alt="Participant" class="participant-image" />
              <h3 class="participant-name">{{ participant.name }}</h3>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 소비 내역 출력 -->
      <div class="spending-details">
        <div class="spending-header">
          <h2 v-if="selectedParticipant">소비 내역 - {{ selectedParticipant.name }}</h2>
          <h2 v-else>전체 소비 내역</h2>
          <div class="button-group">
            <button @click="showAllRecords" class="view-all-button">전체 보기</button>
            <button @click="toggleSortOrder" class="toggle-sort-button">
              {{ isDescending ? "오름차순으로 보기" : "내림차순으로 보기" }}
            </button>
          </div>
        </div>
        <ul>
          <li v-for="record in paginatedRecords" :key="record.id">
            <div class="record-details">
              <span class="record-date">{{ record.date }}</span>
              <span class="record-description">{{ record.description }} </span>
              <span class="record-amount">{{ record.amount.toLocaleString() }}원</span>
            </div>
          </li>
        </ul>
    
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, computed } from "vue";
  
  // 배경 이미지
  import backgroundImage from "@/assets/images/background.png";
  import outerBackground from "@/assets/images/challenge-back5.png";
  
  // 유저 데이터
  const participants = [
    { id: 1, name: "정단호", image: "https://via.placeholder.com/100" },
    { id: 2, name: "홍세영", image: "https://via.placeholder.com/100" },
    { id: 3, name: "황현석", image: "https://via.placeholder.com/100" },
    { id: 4, name: "정예슬", image: "https://via.placeholder.com/100" },
    { id: 5, name: "이조은", image: "https://via.placeholder.com/100" },
  ];
  
  // 소비 내역 데이터
  const spendingRecords = [
  { id: 1, userId: 1, date: "2024-11-05", description: "그랑한우", amount: 625000 },
  { id: 2, userId: 2, date: "2024-11-04", description: "주식회사 식당컴퍼니", amount: 24000 },
  { id: 3, userId: 3, date: "2024-11-01", description: "올리브존립피씨카페공", amount: 5000 },
  { id: 4, userId: 1, date: "2024-11-01", description: "스타벅스커피", amount: 12000 },
  { id: 5, userId: 4, date: "2024-11-02", description: "GS25 편의점", amount: 8000 },
  { id: 6, userId: 2, date: "2024-11-03", description: "파리바게뜨", amount: 15000 },
  { id: 7, userId: 1, date: "2024-11-06", description: "맥도날드", amount: 10000 },
  { id: 8, userId: 3, date: "2024-11-07", description: "이마트", amount: 70000 },
  { id: 9, userId: 5, date: "2024-11-08", description: "CU 편의점", amount: 5000 },
  { id: 10, userId: 4, date: "2024-11-09", description: "BBQ 치킨", amount: 22000 },
  { id: 11, userId: 1, date: "2024-11-12", description: "던킨도너츠", amount: 7000 },
  { id: 12, userId: 1, date: "2024-11-13", description: "페리카나", amount: 25000 },
  { id: 13, userId: 1, date: "2024-11-14", description: "파리바게뜨", amount: 9000 },
  { id: 14, userId: 1, date: "2024-11-15", description: "이마트24", amount: 6000 },
  { id: 15, userId: 1, date: "2024-11-16", description: "투썸플레이스", amount: 11000 },
  { id: 16, userId: 2, date: "2024-11-05", description: "주식회사 식당컴퍼니", amount: 24000 },
  { id: 17, userId: 2, date: "2024-11-06", description: "던킨도너츠", amount: 7000 },
  { id: 18, userId: 2, date: "2024-11-07", description: "파리바게뜨", amount: 15000 },
  { id: 19, userId: 2, date: "2024-11-08", description: "스타벅스", amount: 13000 },
  { id: 20, userId: 2, date: "2024-11-09", description: "투썸플레이스", amount: 11000 },
  { id: 21, userId: 2, date: "2024-11-10", description: "이마트24", amount: 5000 },
  { id: 22, userId: 2, date: "2024-11-11", description: "배스킨라빈스", amount: 15000 },
  { id: 23, userId: 2, date: "2024-11-12", description: "카페베네", amount: 12000 },
  { id: 24, userId: 2, date: "2024-11-13", description: "BBQ 치킨", amount: 22000 },
  { id: 25, userId: 2, date: "2024-11-14", description: "CU 편의점", amount: 5000 },
  { id: 26, userId: 2, date: "2024-11-15", description: "이마트", amount: 70000 },
  { id: 27, userId: 2, date: "2024-11-16", description: "맥도날드", amount: 10000 },
  { id: 28, userId: 2, date: "2024-11-17", description: "GS25 편의점", amount: 8000 },
  { id: 29, userId: 2, date: "2024-11-18", description: "롯데리아", amount: 22000 },
  { id: 30, userId: 2, date: "2024-11-19", description: "스타벅스커피", amount: 12000 },
  { id: 31, userId: 3, date: "2024-11-01", description: "올리브존립피씨카페공", amount: 5000 },
  { id: 32, userId: 3, date: "2024-11-02", description: "파리바게뜨", amount: 9000 },
  { id: 33, userId: 3, date: "2024-11-03", description: "던킨도너츠", amount: 7000 },
  { id: 34, userId: 3, date: "2024-11-04", description: "CU 편의점", amount: 5000 },
  { id: 35, userId: 3, date: "2024-11-05", description: "GS25 편의점", amount: 8000 },
  { id: 36, userId: 3, date: "2024-11-06", description: "배스킨라빈스", amount: 15000 },
  { id: 37, userId: 3, date: "2024-11-07", description: "카페베네", amount: 12000 },
  { id: 38, userId: 3, date: "2024-11-08", description: "BBQ 치킨", amount: 22000 },
  { id: 39, userId: 3, date: "2024-11-09", description: "맥도날드", amount: 10000 },
  { id: 40, userId: 3, date: "2024-11-10", description: "투썸플레이스", amount: 11000 },
  { id: 41, userId: 3, date: "2024-11-11", description: "이마트", amount: 70000 },
  { id: 42, userId: 3, date: "2024-11-12", description: "롯데리아", amount: 22000 },
  { id: 43, userId: 3, date: "2024-11-13", description: "스타벅스커피", amount: 12000 },
  { id: 44, userId: 3, date: "2024-11-14", description: "페리카나", amount: 25000 },
  { id: 45, userId: 3, date: "2024-11-15", description: "배스킨라빈스", amount: 15000 },
];

  
const selectedParticipant = ref(null); // 선택된 유저
const displayedRecords = ref([]); // 표시할 소비 내역
const currentPage = ref(1); // 현재 페이지
const recordsPerPage = 10; // 페이지당 데이터 수
const isDescending = ref(true); // 정렬 순서

// 총 페이지 수 계산
const totalPages = computed(() =>
  Math.ceil(displayedRecords.value.length / recordsPerPage)
);

// 현재 페이지 데이터 계산
const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * recordsPerPage;
  const end = start + recordsPerPage;
  return displayedRecords.value.slice(start, end);
});

// 페이지 변경
const changePage = (page) => {
  currentPage.value = page;
};

// 유저 선택
const selectParticipant = (userId) => {
  selectedParticipant.value = participants.find((p) => p.id === userId);
  updateRecords(userId);
};

// 전체 소비 내역 보기
const showAllRecords = () => {
  selectedParticipant.value = null;
  updateRecords(null);
};

// 정렬 순서 토글
const toggleSortOrder = () => {
  isDescending.value = !isDescending.value;
  updateRecords(selectedParticipant.value ? selectedParticipant.value.id : null);
};

// 데이터 업데이트 (필터링 및 정렬)
const updateRecords = (userId) => {
  displayedRecords.value = spendingRecords
    .filter((record) => (userId ? record.userId === userId : true))
    .sort((a, b) =>
      isDescending.value
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
  currentPage.value = 1; // 페이지 초기화
};

// 초기 데이터 설정
showAllRecords();
  </script>
  
  <style>

.spending-header {
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  align-items: center;
  margin-bottom: 10px;
}
  /* 소비 내역 스타일 */
  .spending-details ul {
  list-style: none;
  padding: 0;
  overflow-y: auto; /* 스크롤 가능 */
  max-height: 320px; /* 최대 높이 고정 */
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  margin: 10px 0;
}

.spending-details li {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e6e6e6;
  transition: background-color 0.2s ease-in-out;
}

.spending-details li:hover {
  background-color: #f0f8ff; /* 연한 하늘색 배경 */
}

.record-date {
  font-size: 0.9rem;
  font-weight: bold;
  color: #555;
  white-space: nowrap; /* 한 줄로 출력 */
  margin-right: 10px;
}

.record-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-left: 10px;
}

.record-description {
  font-size: 1rem;
  font-weight: normal;
  color: #333;
  flex: 1; /* 내용 부분은 유연하게 넓어짐 */
  text-align: left;
  margin-right: 15px;
}

.record-amount {
  font-size: 1rem;
  font-weight: bold;
  color: #007bff;
  text-align: right;
}
  
  /* 페이지네이션 스타일 */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  .pagination-button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .pagination-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

.button-group {
  display: flex;
  gap: 10px;
}

.view-all-button,
.toggle-sort-button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.view-all-button:hover,
.toggle-sort-button:hover {
  background-color: #0056b3;
}

.view-all-button:focus,
.toggle-sort-button:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
  </style>
  