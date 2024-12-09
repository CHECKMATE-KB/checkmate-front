<template>
  <div class="main-container">
    <header class="header">
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
          <br>지금 바로 체크메이트에서 챌린지를 통해 착한 소비 습관 함께 만들어 보실까요?
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

    <div class="quiz-section">
      <div class="quiz-content">
        <div class="quiz-image">
          <img src="@/assets/images/quizmockup.png" alt="Quiz 1" class="fade-wrap" />
          <img src="@/assets/images/quizmockup2.png" alt="Quiz 2" class="fade-wrap secondary-image" />
        </div>
        <div class="quiz-text fade-wrap">
          <h3>매일 함께하는 퀴즈로 금융 상식과<br> 포인트를 늘릴 수 있습니다</h3>
          <p>
            단순히 문제를 푸는 것이 아닌, 금융에 대한 이해도를 높이고 실생활에 적용 가능한 유익한 정보를 제공합니다.
            퀴즈를 풀고 적립한 포인트로 다양한 혜택도 받아보세요!
          </p>
          <ul>
            <li>퀴즈 완료 시 포인트 적립</li>
            <li>누적 포인트로 혜택 교환</li>
            <li>재미와 학습을 동시에!</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Card Section -->
    <div class="card-section">
      <!-- 첫 번째 카드 -->
      <div class="card-row fade-wrap">
        <div class="card-image card1-adjust">
          <img src="@/assets/images/card.png" alt="Card Image 1" />
        </div>
        <div class="card-text text1-adjust">
          <h4>편리한 카드등록</h4>
          <p>편리하게 카드등록 후 챌린지에 참여해보세요</p>
          <p>적립한 포인트로 다양한 혜택을 경험하세요!</p>
        </div>
      </div>

      <!-- 두 번째 카드 -->
      <div class="card-row fade-wrap">
        <div class="card-text text2-adjust">
          <h4>재밌는 챌린지 참여</h4>
          <p>즐겁게 도전하며 똑똑한 소비 습관을 만들어보세요!</p>
          <p>포인트를 쌓아 다양한 혜택까지 누릴 수 있어요!</p>
        </div>
        <div class="card-image card2-adjust">
          <img src="@/assets/images/card2.png" alt="Card Image 2" />
        </div>
      </div>
    </div>





    <div class="additional-section">
      <img src="@/assets/images/profiles/profile3_temp.png" alt="Main Icon" class="main-icon" />
      <button class="start-quiz-button" @click="goTouserJoin">체크메이트 가입하기</button>
      <p class="join-text">체크메이트에 가입하고 다양한 소비 챌린지를 통해 착한 소비 습관을 만들어 보세요! <br>함께 도전하며 경제적 여유를 찾고, 똑똑한 소비의 즐거움을 느껴보세요!</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import router from "@/router";

// 다음 섹션을 참조하기 위한 ref 설정
const contentSection = ref(null);

// 스크롤 이벤트 메서드 추가
const scrollToContent = () => {
  if (contentSection.value) {
    contentSection.value.scrollIntoView({
      behavior: "smooth", // 부드럽게 이동
      block: "start", // 섹션 시작 지점으로 이동
    });
  }
};

// 기존 fade-in 애니메이션 유지
onMounted(() => {
  const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          } else {
            entry.target.classList.remove("fade-in");
          }
        });
      },
      { threshold: 0.1 }
  );

  const fadeElements = document.querySelectorAll(".fade-wrap");
  fadeElements.forEach((element) => observer.observe(element));
});

const goTouserJoin = () => {
  router.push('/userJoin');
}
</script>


<style scoped>
/* 초기 상태 - 아래로 숨김 */
.fade-wrap {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 1s ease, transform 1s ease;
}

/* 스크롤 시 보이는 상태 */
.fade-wrap.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.card-section {
  margin: 50px 0;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.card-row.reverse {
  flex-direction: row-reverse;
}

.card-text {
  flex: 1;
  padding: 20px;
}

.card-text h4 {
  margin-bottom: 10px;
  font-size: 60px;
  color: #559aff;
  width: 481px;
}

.card-text p {
  font-size: 22px;
  color: #333;
  line-height: 1.5;
  width: 490px;
}

.card-image {
  flex: 1;
  text-align: center;
}

.card-image img {
  max-width: 910px;
  height: auto;
  border-radius: 10px;
  position: relative;
  top: 110px;
}
/* 기존 카드 위치 조정 */
.card1-adjust {
  margin-left: -102px;
  position: relative;
  top: 50px;
}

.card2-adjust {
  margin-right: -44px;
  position: relative;
  right: 100px;
  bottom:-30px;

}

/* 텍스트 위치 조정 */
.text1-adjust {
  margin-right: 51px;
  position: relative;
  bottom: 200px;
  left: -95px;
}

.text2-adjust {
  margin-right: 51px;
  position: relative;
  bottom: 250px;
  left: 60px;
}



.quiz-image img,
.quiz-image .secondary-image,
.quiz-text {
  opacity: 0;
  transform: translateY(50px);
  transition: all 2s ease-in-out;
}

.quiz-image img.fade-in,
.quiz-image .secondary-image.fade-in,
.quiz-text.fade-in {
  opacity: 1;
  transform: translateY(0);
}
.main-container {
  width: 150%; /* 기본 100%보다 더 넓게 설정 */
  min-height: 100vh; /* 화면 높이는 그대로 유지 */
  margin: 0 auto; /* 가운데 정렬 */
  overflow: hidden; /* 필요에 따라 스크롤 제거 */
  position: relative;
  bottom: 100px;
}

* {
  box-sizing: border-box;
}

.main-container {
  width: 100%;
  min-height: 100vh; /* 최소 높이를 화면 높이로 설정 */
  margin: 0;
  padding: 0;
  overflow: hidden; /* 가로 스크롤 제거 */
  position: relative;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  width: 100%;
  height: 70vh;
  overflow: hidden;
  background: url(/src/assets/images/main.png) no-repeat center center;
  background-size: cover;
  top: 54px;
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
  position: relative;
  top: 125px;

}

.content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #ffffff;
  width: 100%;
  height: 500px;
  animation: fade_up-2d1117dc 1s;
  position: relative;
  top: 149px;
}
@keyframes fade_up {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  text-align: center;
}

.text-content h2 {
  font-size: 38px;
  margin: 0;
  color: #ffffff;
  margin-bottom: 20px;
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
  gap: 20px;
  overflow-y: hidden;
  position: relative;
  top: 110px;
}

.challenge-card {
  width: 250px;
  flex-shrink: 0;
  border-radius: 20px;
  transition: transform 0.3s ease;
  margin:20px 0px;
}

.challenge-card:hover {
  transform: scale(1.1); /* 카드 확대 효과 */
}

.challenge-card {
  width: 250px;
  flex-shrink: 0;
  border-radius: 20px;
}
.card-section {
  margin: 50px 0;
  padding: 20px; /* 내용과 경계 사이의 여백 */
  background: linear-gradient(to bottom, rgba(255, 255, 255, 1), #dddddd, rgba(255, 255, 255, 1));
  border-radius: 10px; /* 코너를 부드럽게 만듦 */
}
.arrow-icon {
  width: 40px;
  height: 40px;
  position: relative;
  right: 15px;
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
  align-items: center; /* 수직 정렬 */
  justify-content: center;
  gap: 20px;
  flex-direction: row-reverse; /* 텍스트가 이미지의 오른쪽에 오도록 */
}

.quiz-image img {
  width: 850px;
  position: relative;
  margin-top: 0; /* 이미지 위치 조정 */
  left: 100px;
  top:117px;
}

.quiz-image .primary-image {
  width: 800px; /* 기존 크기 유지 */
  position: relative;
  margin-top: 0;
  left: 100px;
}

.quiz-image .secondary-image {
  width: 900px; /* 기존보다 크기 증가 */
  position: relative;
  /*margin-top: 20px;*/
  left: 90px;
  bottom: 150px;
}


.quiz-text {
  font-size: 22px; /* 본문 글자 크기 */
  color: #333; /* 기본 글자 색 */
  max-width: 800px; /* 가로 길이 확장 */
  position: relative;
  top: 67px;
  left: 80px; /* 왼쪽으로 더 이동 */
  line-height: 1.8; /* 가독성을 위해 줄 간격 확대 */
}

.quiz-text h3 {
  font-size: 30px; /* 제목 글자 크기 확대 */
  color: #559aff; /* 제목 글자 파란색 적용 */
  margin-bottom: 20px;
  width: 420px;
}

.quiz-text p {
  font-size: 20px; /* 본문 글자 크기 */
  color: #333; /* 본문 색상 */
}

.quiz-text ul {
  padding-left: 20px;
  list-style: disc;
}

.quiz-text li {
  font-size: 20px; /* 리스트 글자 크기 확대 */
  color: #333; /* 리스트 색상 */
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
}
/*
.additional-section {
  text-align: center;
  margin: 20px 0;
  background: url("@/assets/images/mainbg.png") no-repeat center center / cover;
  padding: 20px;
  position: relative;
  top: -360px;
}
*/

.additional-section {
  text-align: center;
  margin: 0; /* 추가 간격 제거 */
  padding: 20px; /* 내부 여백만 유지 */
  background: url("@/assets/images/mainbg.png") no-repeat center center / cover;
  position: relative;
}

.additional-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%; /* 그라데이션 높이 설정 */
  background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  z-index: 1;
  pointer-events: none; /* 클릭 이벤트 방지 */
}
.main-icon {
  width: 473px;
  height: auto;
  display: block;
  margin: 0 auto;
  position: relative;
  bottom: -119px;
  right: 459px;
  z-index: 10;
}

.start-quiz-button {
  position: relative;
  bottom: -36px;
  margin-top: 10px; /* 버튼과 이미지 간의 여백 */
  padding: 10px 20px;
  background-color: #fff;
  color: #559aff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 25px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.start-quiz-button:hover {
  background-color: #4477cc; /* 어두운 블루 색상 */
  color: #fff;
}

.join-text {
  font-size: 26px;
  font-weight: bold;
  margin-top: 10px;
  position: relative;
  bottom: 224px;
  left: 102px;
  z-index: 10;
  color: #5a5a5a;
}
</style>
