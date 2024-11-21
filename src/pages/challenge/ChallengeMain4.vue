<template>
  <div class="consumption-container">
    <h2 class="title">이번주 소비내역을 확인해보세요!</h2>

    <!-- 상단 카테고리 아이콘 -->
    <div class="category-container">
      <div
        v-for="category in categories_imgs"
        :key="category.name"
        class="category-item"
        :class="{ active: selectedCategory === category.name }"
        @click="selectCategory(category.name)"
      >
        <img :src="category.icon" :alt="category.name" />
        <p style="color:black;">{{ category.name }}</p>
      </div>
    </div>

    <!-- 차트 영역 -->
    <div class="chart-container">
      <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const categories_imgs = [
  { name: "전체", icon: "/images/savico.gif" },
  { name: "음료", icon: "/images/cafeico2.gif" },
  { name: "교통", icon: "/images/bus.gif" },
  { name: "식비", icon: "/images/food.gif" },
  { name: "유흥", icon: "/images/party.gif" },
];
const raw = ref([]);
// 1. 음료, 2. 교통, 3. 식비, 4. 유흥, 5. 미용 6. 전체
const userData = ref({
  전체: [],
  음료: [],
  교통: [],
  식비: [],
  유흥: [],
  미용: [],
});
const categories = {
  1: "음료",
  2: "교통",
  3: "식비",
  4: "유흥",
  5: "미용",
};

// 사용자별 데이터를 누적
const selectedCategory = ref("전체");
const chartData = ref(null);
const teamNo=ref(0);
const props= defineProps(['teamNo']);
const chartOptions = ref({
  responsive: true,
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
      ticks: { font: { size: 14 } },
    },
    y: {
      beginAtZero: true,
      grid: { display: true },
    },
  },
  elements: {
    bar: {
      borderRadius: 15,
      borderSkipped: false,
      barThickness: 20,
    },
  },
});



// 데이터 변환 함수
const transformData = (data) => {
  const result = {
    "전체": [],
    "음료": [],
    "교통": [],
    "식비": [],
    "유흥": [],
    "미용": [],
  };

  // 사용자별 데이터를 누적
  const userTotals = {};

  data.forEach((item) => {
    const { userName, spendTotal, category } = item;
    const categoryName = categories[category] || "전체";

    // 전체 카테고리 업데이트
    if (!userTotals[userName]) {
      userTotals[userName] = 0;
    }
    userTotals[userName] += spendTotal;

    // 각 카테고리별 데이터 추가
    if (categoryName !== "전체") {
      result[categoryName].push({ name: userName, amount: spendTotal });
    }
  });

  // 전체 카테고리 데이터 생성
  for (const [name, total] of Object.entries(userTotals)) {
    result["전체"].push({ name, total });
  }

  return result;
};


const fetchTeamSpendData = async () => {
  try {
    teamNo.value=props.teamNo;
    const response = await axios.get(`http://localhost:8080/api/team/spend/category/${teamNo.value}`);
    raw.value = response.data; // API 응답 데이터를 teamSpendData에 저장
    userData.value=transformData(raw.value);
    updateChartData(selectedCategory.value);
    console.log(userData.value);
    console.log("Fetched team spend data:", raw.value);
  } catch (error) {
    console.error("Failed to fetch team spend data:", error);
  }
};


const createGradient = (ctx, index) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  const colors = [
    ["#FF9A9E", "#FAD0C4"],
    ["#A18CD1", "#FBC2EB"],
    ["#84FAB0", "#8FD3F4"],
    ["#FCCB90", "#D57EEB"],
    ["#FFDEE9", "#B5FFFC"],
  ];
  gradient.addColorStop(0, colors[index][0]);
  gradient.addColorStop(1, colors[index][1]);
  return gradient;
};

const selectCategory = (category_name) => {
  selectedCategory.value = category_name;
  updateChartData(category_name);
};

const updateChartData = (category_name) => {
  const categoryData = userData.value[category_name];
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  chartData.value = {
    labels: categoryData.map((user) => user.name),
    datasets: [
      {
        label: "소비 금액",
        data: category_name === "전체" ? categoryData.map((user) => user.total) : categoryData.map((user) => user.amount),
        backgroundColor: categoryData.map((_, index) => createGradient(ctx, index)),
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        hoverBorderWidth: 2,
      },
    ],
  };
};
onMounted(() => {
  fetchTeamSpendData();
  
});

</script>

<style>
.consumption-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.8em;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
  color:#2a8ee4;
}

.category-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-bottom: 20px;
}

.category-item {
  width: 100px;
  cursor: pointer;
  text-align: center;
  padding: 10px;
}

.category-item img {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.category-item p {
  font-size: 1em;
}

.category-item.active {
  border-radius: 10px;
}

.chart-container {
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: none !important; /* 배경 이미지 제거 */
}
</style>
