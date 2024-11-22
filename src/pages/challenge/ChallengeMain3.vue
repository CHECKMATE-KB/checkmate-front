<template>
  <div class="ranking-container">

    <!-- 상위 3등 카드 -->
    <div class="top-three-container">
      <div
        v-for="(user, index) in users.slice(0,3)"
        :key="index"
        class="profile-card"
        :style="{ background: getBackgroundStyle(index)}"
      >
        <div class="rank-badge">
          <span v-if="index === 0" class="medal gold" >
            🥇 <!-- 금메달 -->
          </span>
          <span v-else-if="index === 1" class="medal silver">
            🥈 <!-- 은메달 -->
          </span>
          <span v-else-if="index === 2" class="medal bronze">
            🥉 <!-- 동메달 -->
          </span>
        </div>
        <img :src="user.userImg" alt="Profile" class="profile-image" />
        <div class="user-name">{{ user.userName }}</div>
        <div class="user-points">포인트: {{ user.totalPoint }}</div>
      </div>
    </div>

    <!-- 하단 가로 바 차트 -->
    <div>
      <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import axios from 'axios';

// Chart.js 플러그인 등록
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


// 유저 데이터
const teamNo=ref(0);
const props= defineProps(['teamNo']); 
const users=ref([]);

const getBackgroundStyle = (index) => {
  if (index === 0) return "linear-gradient(135deg, #FFC371, #FF5F6D)";
  if (index === 1) return "linear-gradient(135deg, #84fab0, #8fd3f4)";
  if (index === 2) return "linear-gradient(135deg, #a18cd1, #fbc2eb)";
  return "linear-gradient(135deg, #ffffff, #eeeeee)"; // 기본 배경
};


// 4등부터 6등 데이터
const otherRanks = computed(() => users.value.slice(3, 5));


// 차트 데이터 초기화
const chartData = ref(null);

// 차트 옵션 설정
const chartOptions = ref({
  responsive: true,
  indexAxis: "y",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      max: 500,
    },
    y: {
      grid: { display: false },
    },
  },
  elements: {
    bar: { borderRadius: 10, borderSkipped: false },
  },
});


const fetchTeamScore = async () => {
  try {
    teamNo.value = props.teamNo;
    const response = await axios.get(`http://localhost:8080/api/team/score/${teamNo.value}`);
    users.value = response.data; // API 응답 데이터를 teamScore에 저장
    console.log("Fetched team score:", users.value);

    // 이미지 URL 변환
    for (let i = 0; i < users.value.length; i++) {
      users.value[i].userImg = new URL(users.value[i].userImg, import.meta.url).href;
    }

    // otherRanks는 computed로 이미 계산됨
    console.log("otherRanks:", otherRanks.value);

    // 차트 데이터 설정
    chartData.value = {
      labels: otherRanks.value.map((user) => `${user.userName}`),
      datasets: [
        {
          label: "포인트",
          data: otherRanks.value.map((user) => user.totalPoint),
          backgroundColor: ["#FFC1C1", "#FFECB1", "#D4F1B4"],
        },
      ],
    };
  } catch (error) {
    console.error("Failed to fetch team score:", error);
  }
};


// 컴포넌트가 마운트되었을 때 데이터 설정
onMounted(() => {
  fetchTeamScore();
  
});
</script>

<style>
.ranking-container {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 20px;

}

.title {
  font-size: 2em;
  margin-bottom: 20px;
  font-weight: bold;
}

.top-three-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-top:80px;
}

.profile-card {
  width: 30%;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 호버 시 부드러운 확대 효과 */
}

/* 호버 효과 */
.profile-card:hover {
  transform: scale(1.05); /* 확대 효과 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); /* 그림자 강조 */
}

.rank-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.2em;
  font-weight: bold;
  color: black;
  border-radius: 10px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.medal {
  font-size: 1.5em;
}

.gold {
  color: gold;
}

.silver {
  color: silver;
}

.bronze {
  color: #cd7f32;
}

.profile-image {
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
}

.user-name {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 5px;
}

.user-points {
  font-size: 1em;
}

.chart-container {
  margin-top: 30px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
