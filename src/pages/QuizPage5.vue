<template>
  <div class="quiz-container">
    <div class="overlay"></div>
    <div class="timer-bar">
      <div class="timer-progress" :style="{ width: timerWidth + '%' }"></div>
    </div>
    <h1 class="question-text">{{ currentQuestion.text }}</h1>
    <div class="options">
      <div class="option">
        <button @click="selectAnswer('O')" :class="{ 'selected': selectedAnswer === 'O' }">
          <span class="option-number">1</span>
          <span class="option-text">O</span>
        </button>
      </div>
      <div class="option">
        <button @click="selectAnswer('X')" :class="{ 'selected': selectedAnswer === 'X' }">
          <span class="option-number">2</span>
          <span class="option-text">X</span>
        </button>
      </div>
    </div>
    <button class="next-button" @click="goToResultPage">다음</button>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    // 문제 1개로 수정
    const questions = [
      {
        text: 'Q5. 주식은 단기적으로 안정적인 수익을 제공한다.',
        answer: 'X',
      },
    ];

    const currentQuestionIndex = ref(0);
    const selectedAnswer = ref(null);
    const timerWidth = ref(100);

    watch(
        () => route.query.questionIndex,
        (newIndex) => {
          currentQuestionIndex.value = parseInt(newIndex) || 0;
        },
        {immediate: true}
    );

    const currentQuestion = computed(() => questions[currentQuestionIndex.value]);

    const selectAnswer = (answer) => {
      selectedAnswer.value = answer;
    };

    const goToResultPage = () => {
      if (selectedAnswer.value) {
        router.push({
          name: 'quizPage5Result', // 결과 페이지로 이동
          query: {answer: selectedAnswer.value, questionIndex: currentQuestionIndex.value},
        });
      } else {
        alert('답안을 선택해 주세요!');
      }
    };

    const startTimer = () => {
      const timerInterval = setInterval(() => {
        if (timerWidth.value > 0) {
          timerWidth.value -= 1;
        } else {
          clearInterval(timerInterval);
          goToResultPage();
        }
      }, 100);
    };

    onMounted(() => {
      startTimer();
    });

    return {
      currentQuestion,
      selectAnswer,
      goToResultPage,
      selectedAnswer,
      timerWidth,
    };
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
