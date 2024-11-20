<template>
  <div class="find-mistake-container">
    <div class="dark-overlay"></div>
    <div class="timer-bar">
      <div class="timer-progress" :style="{ width: timerWidth + '%' }"></div>
    </div>
    <h1 class="question-text">Q2. 왼쪽 사진과 다른 곳을 3곳 클릭해주세요.</h1>

    <div class="images">
      <img :src="currentImage1" alt="Image1.png" />
      <img :src="currentImage2" alt="Image2.png" />
    </div>

    <div class="overlay" @click="markMistake"></div>

    <div class="mistakes">
      <div
          v-for="(mistake, index) in mistakes"
          :key="index"
          class="circle"
          :style="{ left: mistake.x + 'px', top: mistake.y + 'px' }"
      ></div>
    </div>

    <button class="next-button" @click="goToResultPage" :disabled="mistakes.length !== 3">다음</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import image1 from '@/assets/images/Image1.png';
import image2 from '@/assets/images/Image2.png';

export default {
  setup() {
    const router = useRouter();
    const mistakes = ref([]);  // 사용자가 클릭한 틀린 부분 저장
    const currentQuestionIndex = ref(0);
    const images = [{ image1: image1, image2: image2 }];
    const currentImage1 = ref(images[currentQuestionIndex.value].image1);
    const currentImage2 = ref(images[currentQuestionIndex.value].image2);

    const timerWidth = ref(100);
    let timer;
    let timerFinished = false;  // 타이머가 끝났는지 체크하는 변수

    const markMistake = (event) => {
      if (mistakes.value.length >= 3 || timerFinished) return;  // 3번 이상 클릭하거나 타이머가 끝나면 클릭 방지

      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mistakes.value.push({ x, y });
      if (mistakes.value.length === 3) {
        goToResultPage(); // 3번 클릭하면 바로 결과 페이지로 이동
      }
    };

    const goToResultPage = () => {
      clearInterval(timer); // 타이머 중지
      router.push({
        name: 'findMistakeResult',
        query: {
          mistakes: JSON.stringify(mistakes.value),
          questionIndex: currentQuestionIndex.value,
        },
      });
    };

    // 페이지 로드 시 타이머 시작
    onMounted(() => {
      const questionIndex = parseInt(router.currentRoute.value.query.questionIndex) || 0;
      currentQuestionIndex.value = questionIndex;
      currentImage1.value = images[currentQuestionIndex.value].image1;
      currentImage2.value = images[currentQuestionIndex.value].image2;

      // 타이머 시작
      timer = setInterval(() => {
        if (timerWidth.value > 0 && mistakes.value.length < 3 && !timerFinished) {
          timerWidth.value -= 1; // 타이머 줄이기
        } else if (mistakes.value.length === 3 || timerWidth.value <= 0) {
          clearInterval(timer);
          timerFinished = true; // 타이머 종료 처리
          if (mistakes.value.length < 3) {
            goToResultPage(); // 10초 후 자동으로 결과 페이지로 이동
          }
        }
      }, 100); // 100ms마다 호출 (10초 후 1000ms * 10 = 10000ms)
    });

    return { markMistake, goToResultPage, currentImage1, currentImage2, mistakes, timerWidth };
  },
};
</script>

<style scoped>
.find-mistake-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('../assets/images/quizbg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  height: 750px;
  color: white;
}

.dark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;  /* 배경 위 */
}

.timer-bar {
  width: 1000px;
  height: 14px;
  background-color: #ccc;
  margin-top: 40px;
  margin-bottom: 40px;
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;
}

.timer-progress {
  height: 100%;
  background-color: #007BFF;
  transition: width 0.5s;
}

.question-text {
  margin: 20px 0;
  font-size: 32px;
  z-index: 1;
  position: relative;
  bottom: 20px;
}

.images {
  display: flex;
  z-index: 1;
}

.images img {
  width: 350px;
  height: auto;
  margin: 0 10px;
  position: relative;
  bottom: 25px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 2;  /* 이미지 위로 설정 */
  background-color: transparent; /* 배경이 투명하도록 설정 */
}

.mistakes {
  position: absolute;
  top: 0;
  left: 0;
  width: 800px;
  height: 400px;
  pointer-events: none; /* 클릭 방지 */
  z-index: 1;
}

.circle {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 8px solid black;
  border-radius: 50%;
  pointer-events: none; /* 클릭 방지 */
}

.next-button {
  margin-top: 10px;
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 78px;
  width: 218px;
  cursor: pointer;
  z-index: 2; /* 버튼이 가장 위로 */
}
</style>