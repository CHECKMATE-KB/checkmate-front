import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import QuizPage from '../pages/QuizPage.vue'; // 퀴즈 페이지 컴포넌트 임포트
import ResultPage from '../pages/ResultPage.vue'; // 결과 페이지 컴포넌트 임포트
import UserJoin from '../pages/UserJoin.vue'; // 회원가입 페이지 컴포넌트 임포트
import Login from '../pages/Login.vue'; // 로그인 페이지 컴포넌트 임포트
import FindMistake from '../pages/FindMistake.vue';
import FindMistakeResult from '../pages/FindMistakeResult.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/quiz', // 퀴즈 페이지의 경로
    name: 'quiz', // 퀴즈 페이지의 이름
    component: QuizPage, // 퀴즈 페이지 컴포넌트
  },
  {
    path: '/result', // 결과 페이지의 경로
    name: 'result', // 결과 페이지의 이름
    component: ResultPage, // 결과 페이지 컴포넌트
  },
  {
    path: '/login', // 로그인 페이지의 경로
    name: 'Login', // 결과 페이지의 이름
    component: Login, // 결과 페이지 컴포넌트
  },
  {
    path: '/userjoin', // 회원가입 페이지의 경로
    name: 'UserJoin', // 회원가입 페이지의 이름
    component: UserJoin, // 회원가입 페이지 컴포넌트
  },
  {
    path: '/findMistake',
    name: 'findMistake',
    component: FindMistake,
  },
  {
    path: '/findMistakeResult',
    name: 'findMistakeResult',
    component: FindMistakeResult,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
