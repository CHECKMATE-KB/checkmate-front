<template>
  <div class="result-container">
    <div class="overlay"></div>
    <div class="content">
      <div class="icon" :class="{ correct: selectedAnswer === 'O', incorrect: selectedAnswer === 'X' }">
        {{ selectedAnswer === 'O' ? '✅' : '❌' }}
      </div>
      <h1 class="result-text">{{ resultText }}</h1>
      <div class="options">
        <div class="option" :class="{ correct: selectedAnswer === 'O', incorrect: selectedAnswer === 'X' }">
          <span class="option-number">1</span>
          <span class="option-text">O</span>
        </div>
        <div class="option" :class="{ correct: selectedAnswer === 'X', incorrect: selectedAnswer === 'O' }">
          <span class="option-number">2</span>
          <span class="option-text">X</span>
        </div>
      </div>
      <button class="next-button" @click="goToFindMistake">다음</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const selectedAnswer = route.query.answer;

    const resultText = computed(() => (selectedAnswer === 'O' ? '정답입니다!' : '다음 기회에..ㅠㅠ'));

    const goToFindMistake = () => {
      console.log("Going to find mistake page...");
      router.push({ name: 'findMistake', query: { questionIndex: 0 } });
    };

    return { selectedAnswer, resultText, goToFindMistake };
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
  background-color: rgba(0, 0, 0, 0.6); /* 어두운 배경 */
}

.content {
  z-index: 2;
  text-align: center;
}

.icon {
  font-size: 107px;
  margin-bottom: 26px;
  transition: color 0.3s;
  position: relative;
  bottom: 20px;
}

/* 정답과 오답 색상 */
.correct {
  color: #007BFF; /* 파란색 */
}

.incorrect {
  color: #FF4C4C; /* 빨간색 */
}

.result-text {
  font-size: 54px;
  font-weight: bold;
  position: relative;
  right: -14px;
  position: relative;
  bottom: 15px;
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
  padding: 13px;
  width: 931px;
  border-radius: 98px;
  font-size: 48px;
  transition: background-color 0.3s;
  position: relative;
  color: white;
}

.option-number {
  background-color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 41px;
  margin-right: 45px;
  color: black;
  font-weight: bold;
  position: relative;
  right: -22px;
}
.correct.option {
  background-color: #007BFF; /* 파란색 배경 */
}

.incorrect.option {
  background-color: #FF4C4C; /* 빨간색 배경 */
}

.option-text {
  font-size: 64px;
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
  left: 366px;
}
</style>
