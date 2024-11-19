<template>
  <div>
    <!-- 이미지와 폼을 포함하는 통합 섹션 -->
    <div class="content-section">
      <!-- 좌측 이미지 -->
      <div class="image-container">
        <img src="@/assets/images/createImg3.png" alt="챌린지 이미지" />
      </div>
      <!-- 우측 폼 -->
      <div class="form-container">
        <h1>챌린지 생성</h1>
        <!-- 챌린지명 -->
        <div class="form-group">
          <label for="challengeName">챌린지명</label>
          <input type="text" id="challengeName" v-model="challenge.name" placeholder="챌린지명을 입력하세요" />
        </div>
        <!-- 챌린지 선택 -->
        <div class="form-group">
          <label for="challengeType">챌린지 선택</label>
          <select id="challengeType" v-model="selectedChallenge" @change="updateTargetOptions">
            <option value="" disabled>챌린지를 선택하세요</option>
            <option
              v-for="challenge in availableChallenges"
              :key="challenge.id"
              :value="challenge"
            >
              {{ challenge.name }}
            </option>
          </select>
        </div>
        <!-- 목표 금액 -->
        <div class="form-group">
          <label for="targetAmount">목표 금액</label>
          <select id="targetAmount" v-model="selectedTargetAmount">
            <option value="" disabled>목표 금액을 선택하세요</option>
            <option v-for="option in targetOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <button class="submit-btn" @click="addSelectedChallenge"  style="margin-top: 0; margin-bottom: 15px;">챌린지 추가</button>
        <!-- 선택한 챌린지 확인 -->
        <div v-if="selectedChallenges.length > 0" class="selected-challenges">
          <h3>선택한 챌린지</h3>
          <div class="challenge-cards">
            <div
              v-for="(challenge, index) in selectedChallenges"
              :key="index"
              class="challenge-card"
            >
              <h4>{{ challenge.name }}</h4>
              <p>목표 금액: {{ challenge.targetAmount }}</p>
              <button @click="removeSelectedChallenge(index)">제거</button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="startDate">시작 기간</label>
          <input type="date" id="startDate" v-model="challenge.startDate" disabled />
        </div>
        <div class="form-group">
          <label for="endDate">종료 기간</label>
          <input type="date" id="endDate" v-model="challenge.endDate" />
        </div>
        <!-- 초대할 유저 -->
        <div class="form-group">
          <label for="inviteUser">초대할 유저 아이디</label>
          <input type="text" id="inviteUser" v-model="inviteUser" placeholder="유저 아이디를 입력하세요" />
          <button @click="addInvite">추가</button>
        </div>
        <!-- 초대 리스트 -->
        <div class="invite-list">
          <h3>초대 리스트 (본인 포함 {{ challenge.invitedUsers.length + 1 }}/5명)</h3>
          <ul>
            <li v-for="(user, index) in challenge.invitedUsers" :key="index">
              {{ user }}
              <button @click="removeInvite(index)">제거</button>
            </li>
          </ul>
        </div>
        <button class="submit-btn" @click="createChallenge">챌린지 생성</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 챌린지 데이터
const challengeOptions = ref([
  { id: 1, name: "커피값 절약", targets: ["10,000 원", "35,000 원"] },
  { id: 2, name: "체크카드 이용하기", targets: ["100,000 원", "200,000 원"] },
  { id: 3, name: "점심값 절약", targets: ["30,000 원", "50,000 원"] },
  { id: 4, name: "교통비 절약하기", targets: ["40,000 원", "100,000 원"] },
  { id: 5, name: "주말 유흥 절약하기", targets: ["20,000 원", "50,000 원"] },
]);

const selectedChallenge = ref(null);
const selectedTargetAmount = ref("");
const selectedChallenges = ref([]);

const challenge = ref({
  name: "",
  startDate: "",
  endDate: "",
  targetAmount: "",
  invitedUsers: [],
});

const inviteUser = ref("");
const targetOptions = ref([]);

// 계산된 값: 선택 가능한 챌린지 필터링
const availableChallenges = computed(() => {
  return challengeOptions.value.filter(
    (challenge) => !selectedChallenges.value.some((selected) => selected.id === challenge.id)
  );
});

// 기본 날짜 설정
const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const getOneWeekLater = () => {
  const today = new Date();
  return new Date(today.setDate(today.getDate() + 7)).toISOString().split("T")[0];
};

challenge.value.startDate = getToday();
challenge.value.endDate = getOneWeekLater();

// 챌린지 선택 시 목표 금액 업데이트
const updateTargetOptions = () => {
  if (selectedChallenge.value) {
    targetOptions.value = selectedChallenge.value.targets;
  } else {
    targetOptions.value = [];
  }
};

// 선택한 챌린지 추가
const addSelectedChallenge = () => {
  if (selectedChallenge.value && selectedTargetAmount.value) {
    selectedChallenges.value.push({
      id: selectedChallenge.value.id,
      name: selectedChallenge.value.name,
      targetAmount: selectedTargetAmount.value,
    });
    selectedChallenge.value = null;
    selectedTargetAmount.value = "";
    targetOptions.value = [];
  } else {
    alert("챌린지와 목표 금액을 선택해주세요.");
  }
};

// 선택한 챌린지 제거
const removeSelectedChallenge = (index) => {
  selectedChallenges.value.splice(index, 1);
};

// 초대 관련 로직
const addInvite = () => {
  if (challenge.value.invitedUsers.length >= 4) {
    alert("참여 인원은 본인 포함 최대 5명까지만 가능합니다.");
    return;
  }
  if (inviteUser.value && !challenge.value.invitedUsers.includes(inviteUser.value)) {
    challenge.value.invitedUsers.push(inviteUser.value);
    inviteUser.value = "";
  }
};

const removeInvite = (index) => {
  challenge.value.invitedUsers.splice(index, 1);
};

// 챌린지 생성
const createChallenge = () => {
  if (challenge.value.name && selectedChallenges.value.length > 0) {
    console.log("생성된 챌린지:", challenge.value);
    console.log("선택된 챌린지 리스트:", selectedChallenges.value);
    alert("챌린지가 생성되었습니다!");
  } else {
    alert("모든 필드를 입력하고 챌린지를 선택하세요.");
  }
};
</script>

<style scoped>
/* 기존 스타일 유지 */
</style>


<style scoped>
/* 메인 컨테이너 */
.challenge-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: auto;
  overflow: hidden;
}

/* 이미지와 폼을 포함하는 섹션 */
.content-section {
  display: flex;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex: 1;
  height: 800px;
}

/* 이미지 스타일 */
.image-container {
  flex: 1.2;
  background: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* 폼 스타일 */
.form-container {
  flex: 1.8;
  padding: 2rem;
  overflow-y: auto; /* 스크롤 추가 */
  max-height: 100%; /* 폼이 컨테이너를 넘지 않도록 제한 */
}

h1 {
  font-size: 1.8rem;
  color: #333333;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555555;
}

input,
select {
  width: 100%;
  padding: 0.4rem;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 8px;
}

button {
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 15px;
}

button:hover {
  background-color: #45a049;
}

/* 초대 리스트 */
.invite-list {
  margin-top: 1rem;
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 1rem;
  background: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 150px; /* 리스트 크기 제한 */
  overflow-y: auto; /* 스크롤 추가 */
}

.invite-list h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #444;
}

.invite-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.invite-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 1rem;
  margin-bottom: 0.8rem;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.invite-list li:last-child {
  margin-bottom: 0;
}

.invite-list li button {
  padding: 0.2rem 0.8rem;
  background-color: #e74c3c;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}

.invite-list li button:hover {
  background-color: #c0392b;
}

.selected-challenges {
  margin-top: 1.5rem;
}

.challenge-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* 카드 간격 */
}

.challenge-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: calc(50% - 15px); /* 두 열로 나열 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.challenge-card h4 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.challenge-card p {
  margin: 0;
  font-size: 1rem;
  color: #555;
}

.challenge-card button {
  align-self: flex-end; /* 버튼 오른쪽 정렬 */
  padding: 0.4rem 0.8rem;
  background-color: #e74c3c;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}

.challenge-card button:hover {
  background-color: #c0392b;
}
</style>
