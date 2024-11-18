<template>
  <div class="final-result-container">
    <div class="overlay"></div>
    <div class="content">
      <h1 class="result-text">결과</h1>
      <h2 class="score-text">{{ correctAnswers }} / {{ totalQuestions }} 문제를 맞췄습니다!</h2>
      <button class="retry-button" @click="retryQuiz">다시 도전하기</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    // 총 문제 수와 맞춘 문제 수를 받아오기
    const totalQuestions = 5; // 총 문제 수
    const correctAnswers = parseInt(localStorage.getItem('correctAnswers')) || 0; // 맞춘 문제 수

    const retryQuiz = () => {
      // 퀴즈를 처음부터 다시 시작
      localStorage.removeItem('correctAnswers'); // 맞춘 문제 수 초기화
      router.push({ name: 'quiz' }); // 퀴즈 페이지로 이동
    };

    return {
      totalQuestions,
      correctAnswers,
      retryQuiz,
    };
  },
};
</script>

<style scoped>
.final-result-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-image: url('../assets/images/quizbg.png');
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
  background-color: rgba(0, 0, 0, 0.6); /* 어두운 배경 */
}

.content {
  z-index: 2;
  text-align: center;
}

.result-text {
  font-size: 54px;
  font-weight: bold;
  margin-bottom: 20px;
}

.score-text {
  font-size: 36px;
  margin-bottom: 40px;
}

.retry-button {
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}
</style>
