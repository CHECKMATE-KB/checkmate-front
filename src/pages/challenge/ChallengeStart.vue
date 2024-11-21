<template>
  <div class="image-selector-result">
    <!-- 이미지 선택 -->
    <div class="image-selector">
      <figure class="text-center">
        <blockquote class="blockquote">
          <p class="text-muted">팀원을 구성하고, 금융 챌린지에 도전해보세요!</p>
        </blockquote>
        <figcaption class="blockquote-footer">
          다양한 미션을 클리어하고 <cite title="Source Title">리워드를 얻어보세요!</cite>
        </figcaption>
      </figure>
      <div class="carousel">
        <div
          v-for="(image, index) in images"
          :key="index"
          :class="['image-layer', { active: selectedImage === index }]"
          :style="getLayerStyle(index)"
          @click="selectImage(index)"
        >
          <img :src="image.src" :alt="image.alt" />
        </div>
      </div>
      <div class="button-container">
        <button
          class="challenge-button"
          @click="navigateToChallengeCreate"
        >
          챌린지 시작하기
          <span class="button-icon">→</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

import image1 from "@/assets/images/saving1.png";
import image2 from "@/assets/images/saving2.png";
import image3 from "@/assets/images/saving3.png";
import image4 from "@/assets/images/saving4.png";
import image5 from "@/assets/images/saving5.png";

const images = ref([
  { src: image1, alt: "Option 1", title: "교통비 절약" },
  { src: image2, alt: "Option 2", title: "커피값 SAVING" },
  { src: image3, alt: "Option 3", title: "금융 퀴즈 OX" },
  { src: image4, alt: "Option 4", title: "주말 유흥 금지" },
  { src: image5, alt: "Option 5", title: "점심값 절약" },
]);

const selectedImage = ref(0);

const selectImage = (index) => {
  selectedImage.value = index;
};

const navigateToChallengeCreate = () => {
  router.push({ name: "ChallengeCreate" });
};

// 스타일 계산
const getLayerStyle = (index) => {
  const isSelected = selectedImage.value === index;
  const offset = index - selectedImage.value;
  return {
    zIndex: isSelected ? 10 : 5 - Math.abs(offset),
    transform: `translateX(${offset * 220}px) scale(${isSelected ? 1.1 : 0.9})`,
    opacity: isSelected ? 1 : 0.7,
    cursor: "pointer",
  };
};
</script>

<style>
.image-selector-result {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

/* 스타일링된 제목 */
.styled-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #007bff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
}

/* 이미지 선택 스타일 */
.carousel {
  display: flex;
  justify-content: center;
  position: relative;
  padding-bottom: 200px;
  height: 600px;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 15px;
}

.image-layer {
  position: absolute;
  top: 0;
  transition: transform 0.5s ease, opacity 0.5s ease;
  text-align: center;
}

.image-layer img {
  width: 540px;
  height: 540px;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

/* 버튼 컨테이너 */
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* 챌린지 버튼 스타일 */
.challenge-button {
  padding: 5px 50px;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.challenge-button:hover {
  background-color: #e65c00;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.challenge-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.button-icon {
  font-size: 1.8rem;
  display: inline-flex;
}

/* 다시 선택하기 버튼 */
.back-button {
  margin-top: 20px;
  padding: 15px 30px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.back-button:hover {
  background-color: #218838;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
</style>
