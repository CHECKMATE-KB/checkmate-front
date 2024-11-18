<template>
  <div class="ranking-container">

    <!-- 상위 3등 카드 -->
    <div class="top-three-container">
      <div
        v-for="(user, index) in topThree"
        :key="index"
        class="profile-card"
        :style="{ background: user.background }"
      >
        <div class="rank-badge">
          <span v-if="user.rank === 1" class="medal gold">
            🥇 <!-- 금메달 -->
          </span>
          <span v-else-if="user.rank === 2" class="medal silver">
            🥈 <!-- 은메달 -->
          </span>
          <span v-else-if="user.rank === 3" class="medal bronze">
            🥉 <!-- 동메달 -->
          </span>
        </div>
        <img :src="user.profile" alt="Profile" class="profile-image" />
        <div class="user-name">{{ user.name }}</div>
        <div class="user-points">포인트: {{ user.points }}</div>
      </div>
    </div>

    <!-- 하단 가로 바 차트 -->
    <div>
      <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Chart.js 플러그인 등록
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// 유저 데이터
const users = [
  { name: "정단호", points: 30000, rank: 1, profile: "/path/to/profile1.png", background: "linear-gradient(135deg, #FFC371, #FF5F6D)" },
  { name: "홍세영", points: 20000, rank: 2, profile: "/path/to/profile2.png", background: "linear-gradient(135deg, #84fab0, #8fd3f4)" },
  { name: "황현석", points: 15000, rank: 3, profile: "/path/to/profile3.png", background: "linear-gradient(135deg, #a18cd1, #fbc2eb)" },
  { name: "정예슬", points: 10000, rank: 4, background: "#E3E3E3" },
  { name: "이조은", points: 8000, rank: 5, background: "#E8EAF6" },
];

// 상위 3등 데이터
const topThree = users.slice(0, 3);

// 4등부터 6등 데이터
const otherRanks = users.slice(3, 5);

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
      max: 20000,
    },
    y: {
      grid: { display: false },
    },
  },
  elements: {
    bar: { borderRadius: 10, borderSkipped: false },
  },
});

// 컴포넌트가 마운트되었을 때 데이터 설정
onMounted(() => {
  chartData.value = {
    labels: otherRanks.map((user) => `${user.rank}위 ${user.name}`),
    datasets: [
      {
        label: "포인트",
        data: otherRanks.map((user) => user.points),
        backgroundColor: ["#FFC1C1", "#FFECB1", "#D4F1B4"],
      },
    ],
  };
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
  width: 80px;
  height: 80px;
  border-radius: 50%;
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
