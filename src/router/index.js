import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import QuizPage from '../pages/QuizPage.vue'; // 퀴즈 페이지 컴포넌트 임포트
import ResultPage from '../pages/ResultPage.vue'; // 결과 페이지 컴포넌트 임포트
import authRotes from './auth';
import boardRotes from './board';
import travelRoutes from './travel';
import galleryRoutes from './gallery';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/quiz',  // 퀴즈 페이지의 경로
      name: 'quiz',    // 퀴즈 페이지의 이름
      component: QuizPage, // 퀴즈 페이지 컴포넌트
    },
    {
      path: '/result',  // 결과 페이지의 경로
      name: 'result',    // 결과 페이지의 이름
      component: ResultPage, // 결과 페이지 컴포넌트
    },
    ...authRotes,
    ...boardRotes,
    ...travelRoutes,
    ...galleryRoutes,
  ],
});

export default router;
