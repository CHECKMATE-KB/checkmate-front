<template>
  <div class="quiz-container">
    <div class="overlay"></div>
    <div class="timer-bar">
      <div class="timer-progress" :style="{ width: timerWidth + '%' }"></div>
    </div>
    <h1 class="question-text">{{ currentQuestion.text }}</h1>
    <div class="options">
      <template v-if="currentQuestion.type === 'OX'">
        <div class="option">
          <button
            @click="selectAnswer('O')"
            :class="{
              'correct': showResult && isCorrect('O'),
              'incorrect': showResult && !isCorrect('O'),
              'selected': !showResult && selectedAnswer === 'O'
            }"
            :disabled="showResult"
          >
            <span class="option-number">1</span>
            <span class="option-text">O</span>
          </button>
        </div>
        <div class="option">
          <button
            @click="selectAnswer('X')"
            :class="{
              'correct': showResult && isCorrect('X'),
              'incorrect': showResult && !isCorrect('X'),
              'selected': !showResult && selectedAnswer === 'X'
            }"
            :disabled="showResult"
          >
            <span class="option-number">2</span>
            <span class="option-text">X</span>
          </button>
        </div>
      </template>

      <!-- 4지선다 문제 -->
      <template v-else-if="currentQuestion.type === 'MCQ'">
        <div class="option" v-for="(option, index) in currentQuestion.options" :key="index">
          <button
            @click="selectAnswer(option)"
            :class="{
              'correct': showResult && isCorrect(option),
              'incorrect': showResult && !isCorrect(option),
              'selected': !showResult && selectedAnswer === option
            }"
            :disabled="showResult"
          >
            <span class="option-number">{{ index + 1 }}</span>
            <span class="option-text">{{ option }}</span>
          </button>
        </div>
      </template>
      <!-- <div class="option">
        <button
          @click="selectAnswer('O')"
          :class="{
            'correct': showResult && isCorrect('O'),
            'incorrect': showResult && !isCorrect('O'),
            'selected': !showResult && selectedAnswer === 'O'
          }"
          :disabled="showResult"
        >
          <span class="option-number">1</span>
          <span class="option-text">O</span>
        </button>
      </div> -->
      <!-- <div class="option">
        <button
          @click="selectAnswer('X')"
          :class="{
            'correct': showResult && isCorrect('X'),
            'incorrect': showResult && !isCorrect('X'),
            'selected': !showResult && selectedAnswer === 'X'
          }"
          :disabled="showResult"
        >
          <span class="option-number">2</span>
          <span class="option-text">X</span>
        </button>
      </div> -->
    </div>
    <button class="next-button" @click="handleNext">{{ buttonText }}</button>
  </div>

   <!-- 팝업 메시지 -->
   <div v-if="popupVisible" class="popup-overlay">
      <div class="popup">
        <p>{{ popupMessage }}</p>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// const questions = [
//   { text: "Q1. 경제심리지수는 기업과 소비자를 모두 포함한 민단의 경제상황을 종합적으로 파악하는데 사용된다.", answer: "O" },
//   { text: "Q2. 틀린 그림 찾기 게임은 재미있다.", answer: "X" },
//   { text: "Q3. 금융상품 가입 시 예금자 보호가 가능한 상품은 보통 5천만 원까지 보호된다.", answer: "O" },
//   { text: "Q4. 금융상품 가입 시 예금자 보호가 가능한 상품은 보통 5천만 원까지 보호된다.", answer: "O" }
// ];
// 수정된 질문 데이터
const questions = [
  { type: "OX", text: "Q1. 경제심리지수는 기업과 소비자를 모두 포함한 민단의 경제상황을 종합적으로 파악하는데 사용된다.", answer: "O" },
  { type: "OX", text: "Q2. 금융상품 가입 시 예금자 보호가 가능한 상품은 보통 5천만 원까지 보호된다.", answer: "O" },
  {
    type: "MCQ",
    text: "Q3. 다음 중 1년 뒤 받을 금액이 가장 큰 금융상품은?",
    options: ["예금 이율 3%", "예금 이율 2.5%", "예금 이율 2%", "예금 이율 1.5%"],
    answer: "예금 이율 3%",
  },
  {
    type: "MCQ",
    text: "Q4. 다음 중 주식 투자의 기본 원칙에 해당하지 않는 것은?",
    options: ["분산 투자", "장기 투자", "시장 예측", "감정적 투자"],
    answer: "감정적 투자",
  },
];


const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const timerWidth = ref(100);
const showResult = ref(false);
const popupVisible = ref(false);
const popupMessage = ref("");

const currentQuestion = computed(() => questions[currentQuestionIndex.value]);

const buttonText = computed(() => {
  return showResult.value
    ? currentQuestionIndex.value < questions.length - 1
      ? "다음 문제"
      : "결과 보기"
    : "다음";
});
const correctAnswers = ref(0); // 맞춘 정답 개수 저장

const selectAnswer = (answer) => {
  selectedAnswer.value = answer;
  showResult.value = true;

  // 정답 여부 확인 후 업데이트
  if (isCorrect(answer)) {
    correctAnswers.value += 1; // 맞춘 정답 개수 업데이트
    popupMessage.value = "정답입니다!";
  } else {
    popupMessage.value = "오답입니다!";
  }
  popupVisible.value = true;

  // 1초 뒤에 다음 문제로 이동
  setTimeout(() => {
    popupVisible.value = false;
    handleNext();
  }, 1000);
};

const isCorrect = (answer) => {
  return currentQuestion.value.answer === answer;
};


const handleNext = () => {
  if (showResult.value) {
    if (currentQuestionIndex.value < questions.length - 1) {
      // 다음 질문으로 이동
      currentQuestionIndex.value += 1;
      resetState();
    } else {
      // 모든 질문이 끝난 경우
      localStorage.setItem("correctAnswers", correctAnswers.value); // 정답 개수 저장
      router.push({ name: "findMistake" }); // 다음 페이지로 이동
    }
  } else {
    alert("답안을 선택해주세요!");
  }
};

const resetState = () => {
  selectedAnswer.value = null;
  showResult.value = false;
  timerWidth.value = 100;
};

const startTimer = () => {
  let timerInterval = setInterval(() => {
    if (timerWidth.value > 0) {
      timerWidth.value -= 1;
    } else {
      clearInterval(timerInterval);
      showResult.value = true;
    }
  }, 100);
};


onMounted(() => {
  startTimer();
});
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
  transition: background-color 0.3s;
}

button.correct {
  background-color: #4CAF50; /* 파란색 */
}

button.incorrect {
  background-color: #F44336; /* 빨간색 */
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

/* 팝업 스타일 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.popup {
  background: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
</style>
