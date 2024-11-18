<template>
  <div class="result-container">
    <div class="content">
      <div class="icon">{{ isCorrect ? '✅' : '❌' }}</div>
      <h1 class="result-text">{{ resultText }}</h1>
      <button class="next-button" @click="goToNextQuiz">다음 문제</button>
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
    const mistakes = JSON.parse(route.query.mistakes || "[]");
    const questionIndex = parseInt(route.query.questionIndex) || 0;

    const isCorrect = mistakes.length === 2; // 두 개의 틀린 부분을 찾았는지 여부
    const resultText = computed(() => (isCorrect ? '정답입니다!' : '다음 기회에..ㅠㅠ'));

    const goToNextQuiz = () => {
      router.push({ name: 'findMistake', query: { questionIndex: questionIndex + 1 } });
    };

    return { isCorrect, resultText, goToNextQuiz };
  },
};
</script>


<style scoped>
.mistakes {
  position: relative;
}

.mistake {
  position: absolute;
  width: 30px;
  height: 30px; //원 크기
  border: 2px solid black;
  border-radius: 50%;
  background-color: transparent;
}
</style>
