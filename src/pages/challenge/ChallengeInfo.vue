<template>
  <div class="challenge-info">
    <div class="slider-header">
      <h2>챌린지 상세 내역</h2>
      <p>진행 중인 챌린지의 정보를 한 눈에 확인해보세요!</p>
    </div>
    <div class="slider-container2">
      <button class="slider-button left" @click="prevSlide">‹</button>
      <div
        class="slider"
        :style="{ transform: `translateX(-${currentIndex * (100 / (visibleSlides+4))}%)` }"
      >
        <div
          class="slide"
          v-for="(image, index) in images"
          :key="index"
          :class="{ active: index === currentIndex }"
          @click="selectImage(index)"
        >
          <img :src="image.src" alt="test" />
        </div>
      </div>
      <button class="slider-button right" @click="nextSlide">›</button>
    </div>

    <!-- 선택된 이미지와 차트 -->
    <div v-if="selectedImage && selectedImage.src !== saving1" class="selected-content">
      <div class="selected-image-container">
        <button class="selected-image-button left" @click="prevSlide">‹</button>
        <img :src="selectedImage.src" alt="test" class="selected-image" />
        <button class="selected-image-button right" @click="nextSlide">›</button>
      </div>
      <div class="chart-container2">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Bar } from "vue-chartjs";
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from "chart.js";
  
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  
  import saving1 from "@/assets/images/saving6.png";
  import saving2 from "@/assets/images/saving2.png";
  import saving3 from "@/assets/images/saving3.png";
  import saving4 from "@/assets/images/saving4.png";
  import saving5 from "@/assets/images/saving5.png";
  import saving6 from "@/assets/images/saving1.png";
  

  const route = useRoute();
  const teamNo = ref(null); // 라우트에서 teamNo 가져오기
  const challengeInfo = ref(null); // API 응답 데이터 저장
  const errorMessage = ref(null); // 에러 메시지 저장

  const challenge_category= [
    saving1,
    saving6,
    saving2,
    saving3,
    saving4,
    saving5
  ]


  const images= ref([
    {src: saving1, alt: "Challenge 1", data: {challenge: []}},
  ]);


  
  const currentIndex = ref(0);
  const visibleSlides = ref(3);
  const selectedImage = ref(images[0]);
  

  

  const fetchChallengeInfo = async () => {
  try {
    
    teamNo.value=route.params.teamNo;
    const response = await axios.get(`http://localhost:8080/api/team/challenge/${teamNo.value}`);
    challengeInfo.value = response.data; // API 응답 데이터를 저장
    
    for(let i =0;i<challengeInfo.value.length;i++) {
      images.value.push({src: challenge_category[challengeInfo.value[i].ccNo], data : {challenge:[1000, 800, 700, 600, 500]} });
    }
    visibleSlides.value=challengeInfo.value.length;
    
    console.log("Fetched challenge info:", images.value);
  } catch (error) {
    errorMessage.value = "Failed to fetch challenge info.";
    console.error("Error fetching challenge info:", error);
  }
}; 

  const memberPoints = [
    { src: saving1, alt: "Challenge 1", data: { quiz: [], challenge: [] } },
    { src: saving2, alt: "Challenge 2", data: { quiz: [200, 400, 600, 2000, 1000], challenge: [1000, 800, 700, 600, 500] } },
    { src: saving3, alt: "Challenge 3", data: { quiz: [300, 500, 700, 900, 1100], challenge: [1200, 900, 800, 700, 600] } },
    { src: saving4, alt: "Challenge 4", data: { quiz: [400, 600, 800, 1000, 1200], challenge: [1500, 1200, 1000, 900, 800] } },
    { src: saving5, alt: "Challenge 5", data: { quiz: [500, 700, 900, 1100, 1300], challenge: [1700, 1400, 1200, 1100, 1000] } },
    { src: saving6, alt: "Challenge 6", data: { quiz: [600, 800, 1000, 1200, 1400], challenge: [1900, 1600, 1400, 1300, 1200] } },
  ];

  // 차트 데이터 및 옵션
  const chartData = ref({
    labels: [],
    datasets: [],
  });
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
          },
          color: "#4A4A4A",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        borderColor: "rgba(255, 255, 255, 0.9)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 10,
      },
    },
    indexAxis: "y",
    scales: {
      x: {
        grid: { color: "#e6e6e6" },
        ticks: { color: "#4A4A4A", font: { size: 12 } },
        beginAtZero: true,
      },
    },
    elements: {
      bar: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "rgba(0, 0, 0, 0.1)",
      },
    },
  };
  
  // 이미지 클릭 시 처리
  const selectImage = (index) => {
    currentIndex.value = index;
    selectedImage.value = images.value[index];
    updateChart();
  };
  
  const createGradient = (color1, color2) => {
  const gradient = ctx.createLinearGradient(0, 0, 400, 0);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
};

  const updateChart = () => {
    const selectedMember = memberPoints.find(
      (member) => member.src === selectedImage.value.src
    );

    if (!selectedMember) {
      chartData.value = { labels: [], datasets: [] };
      return;
    }

    const { quiz, challenge } = selectedMember.data;
    const totalPoints = quiz.map((q, i) => q + challenge[i]);

    // 포인트별 정렬
    const sortedIndices = totalPoints
      .map((value, index) => ({ value, index }))
      .sort((a, b) => b.value - a.value)
      .map((item) => item.index);

    chartData.value = {
      labels: sortedIndices.map((i) => ["정단호", "홍세영", "황현석", "정예슬", "이조은"][i]),
      datasets: [
        {
          label: "퀴즈 포인트",
          data: sortedIndices.map((i) => quiz[i]),
          backgroundColor: "rgba(54, 162, 235, 0.7)", // 파란색
        },
        {
          label: "챌린지 포인트",
          data: sortedIndices.map((i) => challenge[i]),
          backgroundColor: "rgba(75, 192, 192, 0.7)", // 초록색
        },
        {
          label: "통합 포인트",
          data: sortedIndices.map((i) => totalPoints[i]),
          backgroundColor: "rgba(255, 206, 86, 0.7)", // 노란색
        },
      ],
    };
  };

  
  // 이전 슬라이드
  const prevSlide = () => {
    currentIndex.value = currentIndex.value - 1 + images.value.length % images.value.length;
    console.log("prev slide : "+currentIndex.value);
    selectImage(currentIndex.value);
  };
  
  // 다음 슬라이드
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length;
    console.log("next slide : "+currentIndex.value);
    selectImage(currentIndex.value);
  };


    
  onMounted(() => {
    
    fetchChallengeInfo();
  
  });

  </script>
  
  <style>
  .challenge-info {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .slider-container2 {
    position: relative;
    width: 80%;
    margin: 20px auto;
    overflow: hidden;
    background-image: url("@/assets/images/week-challenge.png"); /* 배경 이미지 경로 설정 */
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    padding: 20px;
  }

  .slider-header {
  text-align: center;
  margin-bottom: 20px;
}

.slider-header h2 {
  font-size: 2em;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.slider-header p {
  font-size: 1em;
  margin: 5px 0 0;
  color: #666;
}
  
  .slider {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  
  .slide {
    flex: 0 0 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
    transform: scale(0.8);
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  }
  
  .slide.active {
    opacity: 1;
    transform: scale(1);
  }
  
  .slide img {
    width: 80%;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .slider-button,
  .selected-image-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 1.5em;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  
  .slider-button.left,
  .selected-image-button.left {
    left: 10px;
  }
  
  .slider-button.right,
  .selected-image-button.right {
    right: 10px;
  }
  
  .slider-button:hover,
  .selected-image-button:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  .selected-content {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }
  
  .selected-image-container {
    margin: 20px 0;
    position: relative;
    margin-bottom:50px;
  }
  
  .selected-image {
    max-width: 40%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out;
  }
  
  .selected-image:hover {
    transform: scale(1.05);
  }
  
  .chart-container2 {
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  background-image: url("@/assets/images/chInfo.png"); /* 차트 컨테이너 배경 이미지 경로 */
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding-top:80px;
}
  </style>
  