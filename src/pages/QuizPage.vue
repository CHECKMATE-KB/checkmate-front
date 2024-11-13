<template>
  <div class="quiz-container">
    <div class="overlay"></div>
    <div class="timer-bar">
      <div class="timer-progress" :style="{ width: timerWidth }"></div>
    </div>
    <h1 class="question-text">Q1. 경제심리지수는 기업과 소비자를 모두 포함한 민단의 경제상황을 종합적으로 파악하는데 사용된다.</h1>
    <div class="options">
      <div class="option">
        <button @click="selectAnswer('O')" :class="{'selected': selectedAnswer === 'O'}">
          <span class="option-number">1</span>
          <span class="option-text">O</span>
        </button>
      </div>
      <div class="option">
        <button @click="selectAnswer('X')" :class="{'selected': selectedAnswer === 'X'}">
          <span class="option-number">2</span>
          <span class="option-text">X</span>
        </button>
      </div>
    </div>
    <button class="next-button" @click="goToResultPage">다음</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      selectedAnswer: null, // 선택된 답안
      timerWidth: '20%', // 타이머 바의 진행률 (예시로 20% 설정)
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    selectAnswer(answer) {
      this.selectedAnswer = answer; // 답안 선택
    },
    goToResultPage() {
      if (this.selectedAnswer) {
        // 선택된 답안을 쿼리 파라미터로 전달하여 결과 페이지로 이동
        this.router.push({ name: 'result', query: { answer: this.selectedAnswer } });
      } else {
        alert("답안을 선택해 주세요!"); // 답안이 선택되지 않았을 때 경고 메시지
      }
    },
  },
};
</script>

<style scoped>
.quiz-container {
  position: relative;
  background-image: url('../assets/images/quizbg.png');
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.timer-bar {
  width: 1000px;
  height: 14px;
  background-color: #ccc;
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: hidden;
  z-index: 2;
}

.timer-progress {
  height: 100%;
  background-color: #007BFF;
  transition: width 0.5s;
}

.question-text {
  margin: 74px 0 72px;
  font-size: 39px;
  width: 1000px;
  text-align: center;
  z-index: 2;
}

.options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 50px;
  z-index: 2;
  width: 925px;
}

.option {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
  width: 100%;
}

button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 9px 40px;
  font-size: 48px;
  border: none;
  border-radius: 78px;
  cursor: pointer;
  background-color: rgba(220, 220, 220, 0.8);
  color: black;
  position: relative;
  width: 100%;
}

.option-number {
  background-color: white;
  border-radius: 50%;
  width: 62px;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 39px;
  color: black;
}

.option-text {
  font-size: 65px;
  font-weight: bold;
}

button.selected {
  background-color: #4A4A4A;
  color: black;
}

.next-button {
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  width: 218px;
  z-index: 2;
  display: flex;
  justify-content: center;
}
</style>
