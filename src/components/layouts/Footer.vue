<template>
  <footer class="footer">
      <div class="footer-container">
          <div class="footer-left w-100">
              <img class="logo" src="../../assets/images/cmlogo2.png" alt="Logo" />
              <div class="w-100">
                  <h3 class="h3" style="color: black">KB IT's Your Life 5기(KB 해커톤) - 모으GO 달성하조</h3>
                  <div class="fs-sm mb-1">서울 광진구 능동로 195-16 6층 (멀티캠퍼스 세종대)</div>
                  <div class="fs-sm mb-1">Designed by 이조은, 정단호, 정예슬, 홍세영, 황현석</div>
                  <div class="fs-sm mb-1 w-100 d-flex">
                      <div>Developed by 이조은, 정단호, 정예슬, 홍세영, 황현석</div>
                      <div style="margin-left:auto">
                          <a href="https://github.com/CHECKMATE-KB" class="github-link" target="_blank"><i class="fab fa-github" style="color: black"></i> 프로젝트 보러가기</a>
                      </div>
                  </div>
              </div>
              
          </div>
      </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
/*
.footer {
  background-color: #6e6e6e;
  color: white;
  padding: 100px 180px;
  height: 350px;
  font-family: 'Arial', sans-serif;
  display: flex;
  align-items: center;
}
*/
.footer {
  background-color: white;
  color: white;
  padding: 50px 0; /* 상하 여백만 설정 */
  font-family: 'Arial', sans-serif;
  width: 100%; /* 100%로 설정 */
  position: relative; /* 명시적으로 relative 설정 */
  left: 0; /* 화면의 가장 왼쪽부터 시작 */
  margin: 0; /* margin 초기화 */
  position: relative;
  bottom: 60px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.footer-left {
  display: flex;
  align-items: center;
}

.logo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 50px;
}

.github-link {
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  position: relative;
  right: 30px;
  bottom: 35px;
}

.github-link i {
  margin-right: 8px;
}

.github-link:hover {
  text-decoration: underline;
}
.fs-sm {
  color: black;
}
</style>