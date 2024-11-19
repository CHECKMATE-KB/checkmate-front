<template>
    <div class="credit-card-container">
      <!-- 카드 -->
      <div class="credit-card" @mouseenter="flipCard(true)" @mouseleave="flipCard(false)">
        <div class="card-front" :class="{ flip: isFlipped }">
          <div class="card-chip"></div>
          <div class="card-logo">VISA</div>
          <div class="card-number">{{ formattedCardNumber }}</div>
          <div class="card-details">
            <div class="card-holder">
              <p>{{ cardHolder || "Your Name" }}</p>
            </div>
            <div class="card-expiration">
              <p>{{ cardExpiration || "MM/YY" }}</p>
            </div>
          </div>
        </div>
        <div class="card-back" :class="{ flip: isFlipped }">
          <div class="card-strip"></div>
          <div class="card-ccv">
            <span>CCV</span>
            <p>{{ cardCCV || "***" }}</p>
          </div>
          <div class="card-logo-back">VISA</div>
        </div>
      </div>
  
      <!-- 카드 입력 폼 -->
      <form class="card-form" @submit.prevent="submitCard">
        <div class="form-group">
          <label for="card-number">카드 번호</label><br />
          <input
            v-for="(input, index) in 4"
            :key="index"
            type="text"
            maxlength="4"
            v-model="cardNumber[index]"
            class="card-input"
            @input="validateCardInput(index)"
          />
        </div>
        <div class="form-group">
          <label for="card-holder">카드 소유자</label>
          <input type="text" v-model="cardHolder" placeholder="Your Name" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="expiration">카드 만료일</label><br />
            <select v-model="cardMonth">
              <option value="" disabled>월</option>
              <option v-for="month in 12" :key="month" :value="month">
                {{ month < 10 ? "0" + month : month }}
              </option>
            </select>
            <select v-model="cardYear">
              <option value="" disabled>년</option>
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>
        <button type="submit" class="submit-btn">카드 등록</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { defineEmits } from "vue";
  
  // 부모 컴포넌트에 데이터 전달
  const emit = defineEmits(["add-card"]);
  
  // 상태 관리
  const cardNumber = ref(["", "", "", ""]);
  const cardHolder = ref("");
  const cardMonth = ref("");
  const cardYear = ref("");
  const cardCCV = ref("");
  
  // 카드 뒤집기 상태
  const isFlipped = ref(false);
  
  // 포맷된 카드 번호
  const formattedCardNumber = computed(() =>
    cardNumber.value.map((num) => num.padEnd(4, "*")).join(" ")
  );
  
  // 만료 날짜
  const cardExpiration = computed(() =>
    cardMonth.value && cardYear.value
      ? `${cardMonth.value < 10 ? "0" + cardMonth.value : cardMonth.value}/${
          cardYear.value.toString().slice(-2)
        }`
      : ""
  );
  
  // 연도 목록
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  
  // 카드 입력 값 검증 함수
  const validateCardInput = (index) => {
    cardNumber.value[index] = cardNumber.value[index].replace(/[^0-9]/g, "");
  };
  
  // 카드 회전 함수
  const flipCard = (flip) => {
    isFlipped.value = flip;
  };
  
  // 카드 등록 함수
  const submitCard = () => {
    // 필수 입력값 확인
    const isCardNumberComplete = cardNumber.value.every((num) => num.length === 4);
    const isFormValid =
      isCardNumberComplete && cardHolder.value && cardMonth.value && cardYear.value;
  
    if (!isFormValid) {
      alert("모든 필수 정보를 입력해주세요!");
      return;
    }
  
    const card = {
      cardNumber: formattedCardNumber.value,
      cardHolder: cardHolder.value,
      expiration: cardExpiration.value,
    };
    emit("add-card", card);
    alert("카드가 성공적으로 등록되었습니다!");
  };
  </script>
  
  
  <style scoped>
  /* 전체 컨테이너 */
  .credit-card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  
  /* 카드 스타일 */
  .credit-card {
    width: 300px;
    height: 180px;
    perspective: 1000px;
    margin-bottom: 20px;
    position: relative;
  }
  
  .card-front,
  .card-back {
    width: 100%;
    height: 110%;
    border-radius: 10px;
    backface-visibility: hidden;
    position: absolute;
    transition: transform 0.6s;
    color: white;
    font-family: "Arial", sans-serif;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  .card-front {
    background: linear-gradient(135deg, #bd6772, #53223f);
  }
  
  .card-back {
    background: linear-gradient(135deg, #bd6772, #53223f);
    transform: rotateY(180deg);
  }
  
  .card-front.flip {
    transform: rotateY(180deg);
  }
  
  .card-back.flip {
    transform: rotateY(0deg);
  }
  
  .card-chip {
    width: 50px;
    height: 30px;
    background: #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .card-logo {
    text-align: right;
    font-size: 18px;
  }
  
  .card-logo-back {
    position: absolute;
    bottom: 10px;
    right: 20px;
    font-size: 16px;
    opacity: 0.8;
  }
  .card-input{
    width:90px;
    margin-right:10px;
  }
  
  .card-number {
    font-size: 18px;
    margin: 20px 0;
    letter-spacing: 2px;
  }
  
  .card-details {
    display: flex;
    justify-content: space-between;
    gap:10px;
  }
  
  .card-holder,
  .card-expiration {
    font-size: 12px;
    margin-bottom:5px;
  }
  
  /* 카드 뒷면 스타일 */
  .card-strip {
    width: 100%;
    height: 40px;
    background: #000;
    margin-bottom: 20px;
  }
  
  .card-ccv {
    background: #fff;
    width: 90%;
    padding: 10px;
    border-radius: 5px;
    margin: 0 auto;
    text-align: right;
    color: #000;
    height:50px;
  }
  
  .card-ccv span {
    display: block;
    font-size: 12px;
    color: #666;
    margin-bottom: 5px;
  }
  
  /* 입력 폼 스타일 */
  .card-form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  
  input,
  select {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 14px;
  }

  select{
    width:180px !important;
    margin-right:20px;
  }
  
  input:focus,
  select:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .submit-btn {
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background: #0056b3;
  }
  </style>
  