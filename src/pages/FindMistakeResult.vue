<template>
  <div class="find-mistake-container">
    <!-- 이미지들 -->
    <div class="images" @click="handleImageClick">
      <img :src="currentImage1" alt="Image1.png" />
      <img :src="currentImage2" alt="Image2.png" />
    </div>

    <!-- 결과 페이지에서의 틀린 부분 동그라미 표시 -->
    <div class="mistakes">
      <div
          v-for="(mistake, index) in mistakes"
          :key="index"
          class="circle"
          :style="{ left: mistake.x + 'px', top: mistake.y + 'px' }"
      ></div>
      <div
          v-for="(correctMistake, index) in correctMistakes"
          :key="'correct-' + index"
          class="circle"
          :style="{ left: correctMistake.x + 'px', top: correctMistake.y + 'px', border: '8px solid green' }"
      ></div>
    </div>

    <!-- 결과 확인 -->
    <div v-if="isCorrect">
      <div class="icon">✅</div>
      <h1 class="result-text">정답입니다!</h1>
    </div>
    <div v-else>
      <div class="icon">❌</div>
      <h1 class="result-text">다음 기회에..ㅠㅠ</h1>
    </div>

    <!-- 다음 문제로 가기 버튼 -->
    <button class="next-button" @click="goToQuizPage3">다음 문제</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import image1 from '@/assets/images/Image1.png';
import image2 from '@/assets/images/Image2.png';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    // 현재 퀴즈와 틀린 부분 데이터
    const mistakes = ref([]);
    const correctMistakes = [
      {x: 775, y: 300},  // 사람 얼굴 부분
      {x: 715, y: 380},  // "부자 되기 쿠폰" 텍스트
      {x: 870, y: 530}   // "모두 부" 텍스트
    ];

    const questionIndex = parseInt(route.query.questionIndex) || 0;
    const images = [
      {image1: image1, image2: image2},
    ];
    const currentImage1 = ref(images[questionIndex].image1);
    const currentImage2 = ref(images[questionIndex].image2);

    // 정답 여부 체크
    const isCorrect = computed(() => {
      return checkCorrectness(mistakes.value, correctMistakes);
    });

    // 정답 비교 함수: 클릭된 위치가 정답 좌표와 일정 범위 내에 있는지 확인
    const checkCorrectness = (userMistakes, correctMistakes) => {
      const tolerance = 50;  // 허용 오차 범위 (픽셀)
      return userMistakes.every((mistake) =>
          correctMistakes.some(
              (correct) =>
                  Math.abs(mistake.x - correct.x) <= tolerance &&
                  Math.abs(mistake.y - correct.y) <= tolerance
          )
      );
    };

    // 클릭한 위치를 mistakes 배열에 추가
    const handleImageClick = (event) => {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mistakes.value.push({x, y});
    };

    // 다음 문제로 가기 버튼 클릭 시 QuizPage3로 이동
    const goToQuizPage3 = () => {
      router.push({name: 'quizPage3'}); // QuizPage3로 이동
    };

    // 페이지 로딩 시 이미지 설정 및 틀린 부분 데이터 가져오기
    onMounted(() => {
      mistakes.value = JSON.parse(route.query.mistakes || '[]');
      currentImage1.value = images[questionIndex].image1;
      currentImage2.value = images[questionIndex].image2;
    });

    return {
      currentImage1,
      currentImage2,
      mistakes,
      correctMistakes,
      isCorrect,
      goToQuizPage3, // QuizPage3로 가는 메서드 반환
      handleImageClick,
    };
  },
};
</script>

<style scoped>
.find-mistake-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('../assets/images/quizbg.png'); /* 배경 이미지 추가 */
  background-size: cover; /* 배경 이미지 크기 조절 */
  background-repeat: no-repeat; /* 반복 방지 */
  background-position: top; /* 위쪽에 맞춰 배경 정렬 */
  height: 750px; /* 세로 길이를 1200px로 설정 */
  color: white; /* 텍스트 색상 */
}

.find-mistake-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 어두운 오버레이 추가 */
  z-index: 1; /* 배경 이미지 위로 오버레이 표시 */
}

.images {
  display: flex;
  z-index: 2; /* 이미지가 어두운 오버레이 위로 오도록 설정 */
  position: relative;
  top: 150px;
}

.images img {
  width: 350px; /* 이미지 크기 조절 */
  height: auto;
  margin: 0 10px;
}

.mistakes {
  position: absolute;
  top: 0;
  left: 0;
  width: 800px; /* 두 이미지의 너비 */
  height: 400px; /* 이미지 높이 */
  pointer-events: none; /* 동그라미 클릭 방지 */
  z-index: 3; /* 동그라미가 이미지 위로 표시되도록 설정 */
}

.circle {
  position: absolute;
  width: 80px; /* 동그라미 크기 조절 */
  height: 80px; /* 동그라미 크기 조절 */
  border: 8px solid black; /* 동그라미 두께 증가 */
  border-radius: 50%; /* 동그라미 형태 유지 */
  pointer-events: none; /* 동그라미 클릭 방지 */
}

.icon {
  font-size: 70px;
  margin-top: -20px;
  position: absolute;
  top: 20px; /* 아이콘을 상단에 배치 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 4; /* 아이콘이 다른 요소 위로 오도록 설정 */
}

.result-text {
  font-size: 24px;
  margin-top: 20px;
  position: absolute;
  top: 80px; /* 텍스트를 아이콘 아래로 배치 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 4; /* 텍스트가 다른 요소 위로 오도록 설정 */
}

.next-button {
  margin-top: 180px;
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  width: 218px;
  border-radius: 78px;
  margin-bottom: 30px; /* 버튼 아래 여백 추가 */
  z-index: 4; /* 버튼이 다른 요소 위로 오도록 설정 */
}
</style>
