<template>
  <div class="slider-container">
    <div
      class="slider"
      :style="{ transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)` }"
    >
      <div
        class="slide"
        v-for="(image, index) in images"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="selectImage(image)"
      >
        <img :src="image.src" :alt="image.alt" />
      </div>
    </div>
    <button class="slider-button left" @click="prevSlide">‹</button>
    <button class="slider-button right" @click="nextSlide">›</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import saving1 from "@/assets/images/saving6.png";
import saving2 from "@/assets/images/saving2.png";
import saving3 from "@/assets/images/saving3.png";
import saving4 from "@/assets/images/saving4.png";
import saving5 from "@/assets/images/saving5.png";
import saving6 from "@/assets/images/saving1.png";

const images = [
  { src: saving1, alt: "Saving 1" },
  { src: saving2, alt: "Saving 2" },
  { src: saving3, alt: "Saving 3" },
  { src: saving4, alt: "Saving 4" },
  { src: saving5, alt: "Saving 5" },
  { src: saving6, alt: "Saving 6" },
];

const currentIndex = ref(0);
const visibleSlides = 3;

const router = useRouter();

// 이미지 클릭 시 ChallengeInfo.vue로 이동, saving1 클릭 시 이동하지 않음
const selectImage = (image) => {
  if (image.src === saving1) {
    // saving1 이미지일 경우 아무 동작도 하지 않음
    return;
  }
  router.push({ name: "ChallengeInfo", query: { src: image.src, alt: image.alt } });
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.length) % images.length;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};
</script>

<style>
.slider-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  background-image:none !important;
}

.slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slide {
  flex: 0 0 33.33%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  transform: scale(0.8);
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.slide.active {
  opacity: 1;
  transform: scale(1);
}

.slide img {
  width: 80%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.slider-button.left {
  left: 10px;
}

.slider-button.right {
  right: 10px;
}

.slider-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
