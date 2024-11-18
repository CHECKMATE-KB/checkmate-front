import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import QuizPage from '../pages/QuizPage.vue'; // 퀴즈 페이지 컴포넌트 임포트
import ResultPage from '../pages/ResultPage.vue'; // 결과 페이지 컴포넌트 임포트
import UserJoin from '../pages/UserJoin.vue'; // 회원가입 페이지 컴포넌트 임포트
import Login from '../pages/Login.vue'; // 로그인 페이지 컴포넌트 임포트
import authRotes from './auth';
import boardRotes from './board';
import travelRoutes from './travel';
import galleryRoutes from './gallery';
import FindMistake from '../pages/FindMistake.vue';
import FindMistakeResult from '../pages/FindMistakeResult.vue';

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
    {
      path: '/login',  // 로그인 페이지의 경로
      name: 'Login',    // 결과 페이지의 이름 (name과 component 속성을 일치시켜야 함)
      component: Login, // 결과 페이지 컴포넌트 (name과 component 속성을 일치시켜야 함)
    },
    {
      path: '/userjoin',  // 로그인 페이지의 경로
      name: 'UserJoin',    // 결과 페이지의 이름 (name과 component 속성을 일치시켜야 함)
      component: UserJoin, // 결과 페이지 컴포넌트 (name과 component 속성을 일치시켜야 함)
    },
    { path: '/findMistake', name: 'findMistake', component: FindMistake },
  { path: '/findMistakeResult', name: 'findMistakeResult', component: FindMistakeResult },
  ],

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

});

export default router;
