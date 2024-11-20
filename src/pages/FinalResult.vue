<template>
  <div class="final-result-container">
    <div class="overlay"></div>
    <div class="content">
      <h2 class="score-text">{{ totalQuestions }} 문제 중 {{ correctAnswers }}문제를 맞췄습니다!</h2>
      
      <!-- 도넛 차트 영역 -->
      <div v-if="chartData">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>

      <button class="retry-button" @click="retryQuiz">다시 도전하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

// Chart.js 모듈 등록
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const router = useRouter();

// 총 문제 수와 맞춘 문제 수
const totalQuestions = 5;
const correctAnswers = ref(parseInt(localStorage.getItem('correctAnswers')) || 3);
const wrongAnswers = totalQuestions - correctAnswers.value;

// 차트 데이터 초기화
const chartData = ref(null);
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#ffffff", // 레이블 텍스트 색상을 흰색으로 설정
        font: {
          size: 16,
          family: "'Poppins', sans-serif",
        },
      },
    },
  },
});

// 그라디언트 색상 적용
onMounted(() => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // 맞춘 문제 그라디언트
  const correctGradient = ctx.createLinearGradient(0, 0, 0, 400);
  correctGradient.addColorStop(0, "#4facfe");
  correctGradient.addColorStop(1, "#00f2fe");

  // 틀린 문제 그라디언트
  const wrongGradient = ctx.createLinearGradient(0, 0, 0, 400);
  wrongGradient.addColorStop(0, "#ff9a9e");
  wrongGradient.addColorStop(1, "#fad0c4");

  chartData.value = {
    labels: ["맞춘 문제", "틀린 문제"],
    datasets: [
      {
        label: "퀴즈 결과",
        data: [correctAnswers.value, wrongAnswers],
        backgroundColor: [correctGradient, wrongGradient],
        hoverBackgroundColor: [correctGradient, wrongGradient],
        borderWidth: 1,
      },
    ],
  };
});

// 퀴즈 다시 도전 함수
const retryQuiz = () => {
  localStorage.removeItem("correctAnswers");
  router.push({ name: "quiz" });
};
</script>

<style scoped>
.final-result-container {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-image: url('../assets/images/resultback.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0,0);
}
.content {
  z-index: 2;
  text-align: center;
}

.result-text {
  font-size: 48px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: linear-gradient(to right, #f7971e, #ffd200);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.score-text {
  margin-top:100px;
  font-size: 24px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.retry-button {
  background: linear-gradient(135deg, #89fffd, #ef32d9);
  color: white;
  padding: 5px 24px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top:20px;
}

.retry-button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.chart {
  width: 100%;
  max-width: 400px;
  z-index: 2;
  margin-top:10px;
  margin-bottom: 220px;
  
}
</style>
