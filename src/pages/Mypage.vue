<template>
    <div class="my-page">
      <!-- User Profile Section -->
      <div class="profile-section">
        <div class="profile-image"></div>
        <div class="profile-info">
          <div class="profile-name">
            <span>체크메이트</span>
            <button @click="editProfile('name')">✏️</button>
          </div>
          <div class="profile-email">
            <span>{{ email }}</span>
            <button @click="editProfile('email')">✏️</button>
          </div>
        </div>
      </div>
  
      <!-- Calendar Section -->
      <div class="calendar-section">
        <table>
          <thead>
            <tr>
              <th>SUN</th>
              <th>MON</th>
              <th>TUE</th>
              <th>WED</th>
              <th>THU</th>
              <th>FRI</th>
              <th>SAT</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, index) in calendarData" :key="index">
              <td v-for="day in week" :key="day.date" :class="day.type">
                <div>{{ day.date }}</div>
                <div>{{ day.record }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Pie Chart Section -->
      <div class="chart-section">
        <h3>카테고리별 소비</h3>
        <canvas ref="pieChart"></canvas>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { Chart } from "chart.js";
  
  const email = ref("dsfjls0354634@naver.com");
  
  const calendarData = [
    [
      { date: 1, record: "수입/지출", type: "income" },
      { date: 2, record: "수입/지출", type: "income" },
      // ... Add other days
    ],
    // Add more weeks
  ];
  
  const editProfile = (field) => {
    if (field === "name") {
      alert("프로필 이름 수정 기능 구현 예정");
    } else if (field === "email") {
      alert("이메일 수정 기능 구현 예정");
    }
  };
  
  onMounted(() => {
    const ctx = document.querySelector("canvas").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["술·유흥", "식비", "의료·건강·피트니스", "미용", "그 외 15개 카테고리"],
        datasets: [
          {
            data: [25, 30, 15, 10, 20],
            backgroundColor: ["#3b82f6", "#10b981", "#f97316", "#f43f5e", "#64748b"],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  });
  </script>
  
  <style>
  .my-page {
    font-family: Arial, sans-serif;
  }
  
  .profile-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #e5e7eb;
  }
  
  .profile-info {
    display: flex;
    flex-direction: column;
  }
  
  .profile-name,
  .profile-email {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .calendar-section {
    margin-bottom: 2rem;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
  }
  
  th,
  td {
    border: 1px solid #d1d5db;
    padding: 0.5rem;
  }
  
  .income {
    background-color: #d1fae5;
  }
  
  .chart-section {
    text-align: center;
  }
  </style>
  