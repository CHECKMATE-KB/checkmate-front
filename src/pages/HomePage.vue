<template>
  <div class="main-container">
    <header class="header">
      <img src="@/assets/images/main.png" alt="Main" class="main-image" />
      <div class="overlay"></div>
      <div class="header-content">
        <h1>착한소비, 똑똑한 소비</h1>
        <h1><span class="highlight">체크메이트</span>로 함께 해봐요!</h1>
        <button class="arrow-button" @click="scrollToContent">
          <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 16.5l-4.5-4.5h9z" fill="#555555" />
          </svg>
        </button>
      </div>
    </header>

    <section class="content" ref="contentSection">
      <div class="left-image">
        <div class="dog-background">
          <img src="@/assets/images/dog.png" alt="Dog" />
        </div>
      </div>
      <div class="text-content">
        <h2>체크메이트에서는 이런 챌린지들을 도전할 수 있어요!</h2>
        <p>
          작은 지출부터 계획적인 소비까지 의미 있는 챌린지를 통해 똑똑한 소비와 경제적 여유를 동시에 누릴 수 있습니다.
          지금 바로 체크메이트에서 챌린지를 통해 착한 소비 습관 함께 만들어 보실까요?
        </p>
      </div>
    </section>

    <div class="challenge-section">
      <div class="challenge-cards">
        <div class="cards" ref="cardsContainer">
          <img src="@/assets/images/saving1.png" alt="Saving 1" class="challenge-card" />
          <img src="@/assets/images/saving2.png" alt="Saving 2" class="challenge-card" />
          <img src="@/assets/images/saving3.png" alt="Saving 3" class="challenge-card" />
          <img src="@/assets/images/saving4.png" alt="Saving 4" class="challenge-card" />
        </div>
      </div>
    </div>

    <!-- 퀴즈 섹션 -->
    <section class="quiz-section">
      <div class="quiz-content">
        <div class="quiz-image">
          <img src="@/assets/images/quizmockup.png" alt="Quiz" />
        </div>
        <div class="quiz-text">
          <h3>매일 함께하는 퀴즈로 금융 상식과 포인트를 늘릴 수 있습니다</h3>
          <p>
            단순히 문제를 푸는 것이 아닌, 금융에 대한 이해도를 높이고 실생활에 적용 가능한 유익한 정보를 제공합니다.
            퀴즈를 풀고 적립한 포인트로 다양한 혜택도 받아보세요!
          </p>
          <ul>
            <li>퀴즈 완료 시 포인트 적립</li>
            <li>누적 포인트로 혜택 교환</li>
            <li>재미와 학습을 동시에!</li>
          </ul>
          <button class="start-quiz-button">체크메이트 가입하기</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const contentSection = ref(null);

const scrollToContent = () => {
  if (contentSection.value) {
    contentSection.value.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
/* 전역 스타일 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

.main-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  position: relative;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  width: 100%;
  height: 140vh;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: -50px; /* 이미지를 50px 올렸습니다 */
  left: 0;
  z-index: 1;
}

.overlay {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  z-index: 2;
}

.header-content {
  position: relative;
  z-index: 3;
}

.header-content h1 {
  font-size: 60px;
  margin: 0;
  color: #000000;
  margin-bottom: 8px;
  position: relative;
  top: 20px;
}

.arrow-button {
  margin-top: 20px;
  padding: 10px;
  background: none;
  border: none;
  font-size: 2em;
  color: #00796b;
  cursor: pointer;
}

.content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #ffffff;
  width: 100%;
  height: 500px;
}

.left-image {
  flex: 0 0 250px;
}

.dog-background img {
  width: 100%;
  height: auto;
  position: relative;
  top: 100px;
  left: 550px;
}

.text-content {
  flex: 1;
  margin-left: 20px;
  background-color: rgba(163, 198, 255, 0.8);
  padding: 30px 20px;
  border-radius: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-50px);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
  bottom: 80px;
  right: 130px;
}

.text-content h2 {
  font-size: 38px;
  margin: 0;
  color: #ffffff;
}

.text-content p {
  font-size: 17px;
  line-height: 1.6;
  color: #454545;
}

.text-content::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 20px solid rgba(163, 198, 255, 0.8);
}

.challenge-section {
  text-align: center;
  background-color: #ffffff;
  width: 100%;
}

.cards {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: calc(100% + 20px); /* 여백을 추가하여 더 넓은 너비를 설정 */
  overflow-x: hidden;
}

.challenge-card {
  width: 250px;
  flex-shrink: 0;
  border-radius: 20px;
  transition: transform 0.3s ease;
}

.challenge-card:hover {
  transform: scale(1.1); /* 카드 확대 효과 */
}


.challenge-card {
  width: 250px;
  flex-shrink: 0;
  border-radius: 20px;
}

.arrow-icon {
  width: 40px;
  height: 40px;
}

.highlight {
  color: #559aff;
}

.quiz-section {
  margin: 50px 0;
  display: flex;
  justify-content: center;
}

.quiz-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.quiz-image img {
  width: 658px;
  position: relative;
  margin-top: 250px;
}

.quiz-text {
  font-size: 20px;
  color: #333;
  max-width: 500px;
  position: relative;
  bottom: 100px;
}

.quiz-text p {
  margin-top: 10px;
  line-height: 1.6;
}

.quiz-text ul {
  margin-top: 15px;
  padding-left: 20px;
  list-style-type: disc;
  color: #555;
}

.quiz-text li {
  margin-bottom: 10px;
}

.start-quiz-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #559aff;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  position: relative;
  top: 300px;
  right: 150px;
}

.start-quiz-button:hover {
  background-color: #457dd6;
}
</style>
