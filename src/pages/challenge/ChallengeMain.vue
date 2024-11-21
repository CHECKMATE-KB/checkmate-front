<template>
  <div class="outer-card" :style="{ backgroundImage: `url(${outerBackground})` }">
    <div class="card-container">
      <div 
        v-for="participant in participants" 
        :key="participant.id" 
        class="card" 
        :style="{ backgroundImage: `url(${backgroundImage})` }">
        <div class="overlay">
          <img v-if="participant.userImg" :src="participant.userImg" alt="Participant" class="participant-image" />
          
          <h3 class="participant-name">{{ participant.userName }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 로컬 이미지 파일 경로를 import
import backgroundImage from "@/assets/images/background.png";
import outerBackground from "@/assets/images/challenge-back5.png";
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';


const participants = ref([]);
const teamNo=ref(0);
const props= defineProps(['teamNo']);


const fetchTeamMembers = async () => {
  try {
    teamNo.value=props.teamNo;
    const response = await axios.get(`http://localhost:8080/api/team/member/${teamNo.value}`);
    participants.value = response.data; // API에서 받아온 데이터를 저장

    for(let i=0;i<participants.value.length;i++) {
      participants.value[i].userImg=new URL(participants.value[i].userImg, import.meta.url).href;
    }
    console.log("Fetched team members:", participants.value);
  } catch (error) {
    console.error("Failed to fetch team members:", error);
  }
};

onMounted(() => {
  
  fetchTeamMembers();
});
</script>



<style>
.outer-card {
  width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-size: cover; /* 배경 이미지 크기 */
  background-position: center; /* 배경 이미지 위치 */
  background-repeat: no-repeat; /* 배경 이미지 반복 금지 */
  color: #fff; /* 텍스트 색상 */
}

.title {
  font-size: 1.8em;
  font-weight: bold;
  color: #fff;
  text-align: left;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}


.card-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  padding-top:80px !important;
}

.card {
  width: 200px;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  position: relative;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5); /* 투명한 어두운 배경 */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.participant-image {
  width: 180px;
  height: 180px;
  margin-bottom: 10px;
}

.participant-name {
  margin: 0;
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}
</style>
