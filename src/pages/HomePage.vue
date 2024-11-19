<template>
  <div class="main-container">
    <div class="header">
      <img src="@/assets/images/main.png" alt="Main" class="main-image" />
    </div>

    <div class="content">
      <div class="left-image">
        <div class="dog-background">
          <img src="@/assets/images/dog.png" alt="Dog" />
        </div>
      </div>
      <div class="text-content">
        <h2>체크메이트와 함께 일상에서 실천할 수 있는 착한 소비 습관을 길러 보세요.</h2>
        <p>
          작은 지출부터 계획적인 소비까지 의미 있는 챌린지를 통해 똑똑한 소비와 경제적 여유를 동시에 누릴 수 있습니다.
          지금 바로 체크메이트에서 챌린지를 통해 착한 소비 습관 함께 만들어 보실까요?
        </p>
      </div>
    </div>

    <div class="challenge-section">
      <h3>체크메이트에서는 이런 챌린지들을 도전할 수 있어요!</h3>
      <div class="challenge-cards">
        <button class="arrow left-arrow">&#9664;</button>
        <div class="cards" ref="cardsContainer">
          <img src="@/assets/images/saving1.png" alt="Saving 1" class="challenge-card" />
          <img src="@/assets/images/saving2.png" alt="Saving 2" class="challenge-card" />
          <img src="@/assets/images/saving3.png" alt="Saving 3" class="challenge-card" />
        </div>
        <button class="arrow right-arrow">&#9654;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const cardsContainer = ref(null);

const moveLeft = () => {
  if (cardsContainer.value) {
    cardsContainer.value.scrollBy({ left: -220, behavior: 'smooth' });
  }
};

const moveRight = () => {
  if (cardsContainer.value) {
    cardsContainer.value.scrollBy({ left: 220, behavior: 'smooth' });
  }
};
</script>

<style scoped>
.main-container {
  padding: 0;
}

.header {
  height: 100vh; /* 첫 번째 이미지 세로 길이 유지 */
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%; /* 세로 길이 가득 차게 설정 */
  object-fit: cover; /* 비율 유지하며 잘리도록 설정 */
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-image: url('@/assets/images/challenge-back5.png'); /* 두 번째 배경 이미지 변경 */
  background-size: cover; /* 배경 이미지 조정 */
  height: 90vh; /* 배경 이미지가 화면을 꽉 채우지 않도록 설정 */
  margin-top: -40px; /* 첫 번째 배경과 틈 없애기 위해 margin-top 조정 */
  position: relative; /* 카드 슬라이드를 위한 상대적 위치 설정 */
}

.left-image {
  flex: 0 0 250px; /* 왼쪽 이미지 너비 늘리기 */
}

.dog-background {
  padding: 10px;
}

.dog-background img {
  width: 100%; /* 이미지를 배경에 맞게 조정 */
  height: auto;
}

.text-content {
  flex: 1;
  margin-left: 20px;
  background-color: rgba(255, 255, 255, 0.7); /* 배경 색상 추가하여 가독성 높이기 */
  padding: 20px; /* 여백 추가 */
  border-radius: 8px; /* 모서리 둥글게 */
}

.text-content h2 {
  font-size: 32px; /* 글씨 크기 키우기 */
  margin: 0;
  font-weight: bold;
}

.text-content p {
  font-size: 18px; /* 글씨 크기 키우기 */
  line-height: 1.6;
}

.challenge-section {
  margin-top: -40px; /* 첫 번째 배경과 겹치게 하기 위한 margin */
  text-align: center;
  padding: 20px;
  background-color: transparent; /* 배경을 투명하게 설정 */
}

.challenge-cards {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.cards {
  display: flex;
  overflow-x: auto; /* 수평 스크롤 가능 */
  scroll-behavior: smooth; /* 스크롤 부드럽게 */
}

.challenge-card {
  width: 220px; /* 카드 고정 너비 */
  margin: 0 10px; /* 카드 간격 */
}

.arrow {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px; 
}
</style>
