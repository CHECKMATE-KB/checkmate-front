<template>
  <div class="find-mistake-container">
    <div class="images">
      <img :src="currentImage1" alt="Image 1" />
      <img :src="currentImage2" alt="Image 2" />
    </div>
    <div class="overlay" @click="markMistake"></div>
    <button class="next-button" @click="goToResultPage">결과 보기</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const mistakes = ref([]);
    const currentQuestionIndex = ref(0);
    const images = [
      { image1: require('../assets/images/image1.png'), image2: require('../assets/images/image2.png') },
      { image1: require('../assets/images/image3.png'), image2: require('../assets/images/image4.png') },
    ];
    const currentImage1 = ref(images[currentQuestionIndex.value].image1);
    const currentImage2 = ref(images[currentQuestionIndex.value].image2);

    const markMistake = (event) => {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mistakes.value.push({ x, y });
    };

    const goToResultPage = () => {
      router.push({
        name: 'findMistakeResult',
        query: {
          mistakes: JSON.stringify(mistakes.value),
          questionIndex: currentQuestionIndex.value,
        },
      });
    };

    onMounted(() => {
      const questionIndex = parseInt(router.currentRoute.value.query.questionIndex) || 0;
      currentQuestionIndex.value = questionIndex;
      currentImage1.value = images[currentQuestionIndex.value].image1;
      currentImage2.value = images[currentQuestionIndex.value].image2;
    });

    return { markMistake, goToResultPage, currentImage1, currentImage2 };
  },
};
</script>



<style scoped>
.find-mistake-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.images {
  display: flex;
}

.images img {
  width: 400px; /* 이미지 크기 조절 */
  height: auto;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 800px; /* 두 이미지의 너비 */
  height: 400px; /* 이미지 높이 */
  cursor: pointer;
}

.next-button {
  margin-top: 20px;
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
}
</style>
