<script setup>
import { RouterView } from 'vue-router';
import DefaultLayout from './components/layouts/DefaultLayout.vue';
</script>

<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>

<style scoped>
.main-background {
  background-color: #f8f6e9; /* 원하는 배경색 */
  min-height: 100vh;
  min-width: 100vh !important;
  margin: 0;
  padding: 0;
}

</style>
