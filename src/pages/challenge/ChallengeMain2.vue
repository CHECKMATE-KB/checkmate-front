<template>
  <div class="slider-container">
    <div
      class="slider"
      :style="{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`}"
    >

  
      <div class="slide active">
        <img :src="saving1"/>
      </div>
      
      <div
        class="slide"
        v-for="(challenge, index) in challenges"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="selectImage(challenge.imgUrl)"
      >
        <!-- <img src="../../assets/images/saving1.png"> -->
        <img :src="challenge.imgUrl" alt="Challenges" />
      </div>
    </div>
    <button class="slider-button left" @click="prevSlide">‹</button>
    <button class="slider-button right" @click="nextSlide">›</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';
import saving1 from "@/assets/images/saving6.png";



// 1: 커피값 절약 2: 체크카드 이용하기 3: 점심값 절약 4: 교통비 절약 5: 주말 유흥 금지
const currentIndex = ref(0);


const router = useRouter();
// 여기 수정해주기
const teamNo=ref(0);
const props= defineProps(['teamNo']);
const challenges=ref([]);
const visibleSlides = 3;
const fetchTeamChallenges = async () => {
  try {
    teamNo.value=props.teamNo;
    const response = await axios.get(`http://localhost:8080/api/team/challenge/${teamNo.value}`);
    challenges.value = response.data; // 서버에서 받은 데이터를 challenges에 저장
    for(let i=0;i<challenges.value.length;i++) {
      challenges.value[i].imgUrl=new URL(challenges.value[i].imgUrl, import.meta.url).href;
    }
    
  } catch (error) {
    console.error("Failed to fetch team challenges:", error);
  }
};


// 이미지 클릭 시 ChallengeInfo.vue로 이동, saving1 클릭 시 이동하지 않음
const selectImage = (image) => {
  if (image === saving1) {
    // saving1 이미지일 경우 아무 동작도 하지 않음
    return;
  }
  router.push({ name: "ChallengeInfo",  params: { teamNo: teamNo.value } });
};

const prevSlide = () => {
  currentIndex.value =  (currentIndex.value - 1+ challenges.value.length) % challenges.value.length;
  
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % challenges.value.length;
  
};


onMounted(() => {
  fetchTeamChallenges();
});
</script>

<style>
.slider-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  background-image:none !important;
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

.slider-button {
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

.slider-button.left {
  left: 10px;
}

.slider-button.right {
  right: 10px;
}

.slider-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
