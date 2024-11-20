<template>
    <div class="challenge-page">
      <div class="components-container">
        <!-- 첫 번째 컴포넌트 -->
        <ChallengeMain />
        <!-- 두 번째 컴포넌트 -->
        <div class="component-section with-background">
          <ChallengeMain2 />
        </div>
        <!-- 세 번째 컴포넌트 -->
        <div class="component-section with-background-third">
          <ChallengeMain3 />
        </div>
        <!-- 네 번째 컴포넌트 -->
        <div class="component-section with-background-fourth">
          <ChallengeMain4 />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import ChallengeMain from "@/pages/challenge/ChallengeMain.vue";
  import ChallengeMain2 from "@/pages/challenge/ChallengeMain2.vue";
  import ChallengeMain3 from "@/pages/challenge/ChallengeMain3.vue";
  import ChallengeMain4 from "@/pages/challenge/ChallengeMain4.vue";
  </script>
  
  <style>
  .challenge-page {
    width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
  background-size: cover; /* 배경 이미지 크기 */
  background-position: center; /* 배경 이미지 위치 */
  background-repeat: no-repeat; /* 배경 이미지 반복 금지 */
  color: #fff; /* 텍스트 색상 */
  }
  
  .components-container {
    width: 100%; /* 전체 가로 크기 */
    /* max-width: 1200px; 최대 크기 제한 */
    display: flex;
    flex-direction: column; /* 세로 배치 */
    gap: 20px; /* 컴포넌트 간 간격 */
  }
  
  .component-section {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px; /* 내부 여백 */
    display: flex;
    justify-content: center; /* 컴포넌트 내용을 가운데 정렬 */
    align-items: center;
    width: 100%;
    min-height: 100px; /* 컴포넌트 최소 높이 */
  }
  
  .component-section.with-background {
    background-image: url("@/assets/images/week-challenge.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .component-section.with-background-third {
    background-image: url("@/assets/images/rankback5.png"); /* 세 번째 컴포넌트 배경 이미지 경로 */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .component-section.with-background-fourth {
    background-image: url("@/assets/images/fourth-back.png"); /* 네 번째 컴포넌트 배경 이미지 경로 */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 500px; /* 네 번째 컴포넌트의 높이 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  h2 {
    margin-bottom: 10px;
    color: #333;
    text-align: center;
  }
  </style>
  