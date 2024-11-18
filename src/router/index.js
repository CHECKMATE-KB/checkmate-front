import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import QuizPage from '../pages/QuizPage.vue'; // 퀴즈 페이지 컴포넌트 임포트
import UserJoin from '../pages/UserJoin.vue'; // 회원가입 페이지 컴포넌트 임포트
import Login from '../pages/Login.vue'; // 로그인 페이지 컴포넌트 임포트
import FindMistake from '../pages/FindMistake.vue';
import FindMistakeResult from '../pages/FindMistakeResult.vue';

import Mypage from '../pages/Mypage.vue';

import Challenge from '../pages/challenge/Challenge.vue'
import ChallengeInfo from '../pages/challenge/ChallengeInfo.vue'
import ChallengeDetail from '../pages/challenge/ChallengeDetail.vue'
import ChallengeStart from '../pages/challenge/ChallengeStart.vue'

const routes = [

  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/quiz', name: 'quiz', component: QuizPage },
  { path: '/findMistake', name: 'findMistake', component: FindMistake },
  { path: '/findMistakeResult', name: 'findMistakeResult', component: FindMistakeResult },

  { path: '/challenge', name: 'challenge', component: Challenge },
  { path: '/challenge/info', name: 'challengeInfo', component: ChallengeInfo },
  { path: '/challenge/detail', name: 'challengeDetail', component: ChallengeDetail },
  { path: '/challenge/start', name: 'challengeStart', component: ChallengeStart },
  { path: '/userjoin', name: 'UserJoin', component: UserJoin },
  { path: '/login', name: 'Login', component: Login },
  { path: '/mypage', name: 'Mypage', component: Mypage },
  


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
