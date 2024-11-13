<template>
  <div class="result-container">
    <div class="overlay"></div>
    <div class="content">
      <div class="icon">{{ selectedAnswer === 'O' ? '✅' : '❌' }}</div>
      <h1 class="result-text">{{ resultText }}</h1>
      <div class="options">
        <div class="option" :class="{'correct': selectedAnswer === 'O', 'incorrect': selectedAnswer === 'X'}">
          <span class="option-number">1</span>
          <span class="option-text">O</span>
        </div>
        <div class="option" :class="{'correct': selectedAnswer === 'X', 'incorrect': selectedAnswer === 'O'}">
          <span class="option-number">2</span>
          <span class="option-text">X</span>
        </div>
      </div>
      <button class="next-button" @click="goBack">다음</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const selectedAnswer = route.query.answer; // 쿼리 파라미터로 선택된 답안 가져오기

    const resultText = computed(() => {
      return selectedAnswer === 'O' ? '정답입니다!' : '다음 기회에..ㅠㅠ';
    });

    const goBack = () => {
      // 이전 페이지로 이동
      window.history.back();
    };

    return { selectedAnswer, resultText, goBack };
  },
};
</script>

<style scoped>
.result-container {
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
  background-color: rgba(0, 0, 0, 0.6);
}

.content {
  z-index: 2;
  text-align: center;
}

.icon {
  font-size: 99px;
  margin-bottom: 26px;
}

.result-text {
  font-size: 37px;
  margin-bottom: 26px;/* 텍스트와 옵션 간격 */
}

.options {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.option {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
  padding: 20px;
  width: 1016px;
  border-radius: 78px;
  font-size: 24px;
  transition: background-color 0.3s;
  position: relative;
}

.option-number {
  background-color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin-right: 16px;
  color: black;
  font-weight: bold;
}

.correct {
  background-color: #007BFF;
  color: white;
}

.incorrect {
  background-color: #FF4C4C;
  color: white;
}

.option-text {
  font-size: 48px;
  font-weight: bold;
}

.next-button {
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  width: 200px;
  z-index: 2;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  position: relative;
  left: 406px;
}
</style>
