<template>
  <footer class="footer">
      <div class="footer-container">
          <div class="footer-left w-100">
              <img class="logo" src="../../assets/images/cmlogo2.png" alt="Logo" />
              <div class="w-100">
                  <h3 class="h3" style="color: white">KB IT's Your Life 5기 BUDUNGS</h3>
                  <div class="fs-sm mb-1">서울 광진구 능동로 195-16 6층 (멀티캠퍼스 세종대)</div>
                  <div class="fs-sm mb-1">Designed by 이조은, 정단호, 정예슬, 홍세영, 황현석</div>
                  <div class="fs-sm mb-1 w-100 d-flex">
                      <div>Developed by 이조은, 정단호, 정예슬, 홍세영, 황현석</div>
                      <div style="margin-left:auto">
                          <a href="https://github.com/CHECKMATE-KB" class="github-link" target="_blank"><i class="fab fa-github"></i> 프로젝트 보러가기</a>
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
.footer {
  background-color: #6e6e6e;
  color: white;
  padding: 100px 180px;
  height: 350px;
  font-family: 'Arial', sans-serif;
  display: flex;
  align-items: center;
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
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.github-link i {
  margin-right: 8px;
}

.github-link:hover {
  text-decoration: underline;
}
</style>