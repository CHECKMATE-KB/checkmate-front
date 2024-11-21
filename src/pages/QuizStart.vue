<template>
  <div class="final-result-container">
    <div class="overlay"></div>
    <div class="content">
      
      <button class="start-quiz-button" @click="startQuiz">퀴즈 시작하기</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// 라우터 초기화
const router = useRouter();

// 퀴즈 시작하기 버튼 클릭 시 퀴즈 페이지로 이동
const startQuiz = () => {
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
  background-image: url('../assets/images/quizstart.png');
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
  background-color: rgba(0, 0, 0, 0.0);
}

.content {
  z-index: 2;
  text-align: center;
}

.score-text {
  margin-top: 100px;
  font-size: 24px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.instruction-text {
  font-size: 18px;
  color: #d3d3d3;
  margin: 10px 0;
}

.start-quiz-button {
  background: linear-gradient(135deg, #89fffd, #ef32d9);
  color: white;
  padding: 10px 24px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 500px;
}

.start-quiz-button:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}
</style>
