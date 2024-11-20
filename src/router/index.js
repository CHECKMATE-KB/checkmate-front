import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import QuizPage from '../pages/QuizPage.vue';
import UserJoin from '../pages/UserJoin.vue';
import Login from '../pages/Login.vue';
import FindMistake from '../pages/FindMistake.vue';
import FindMistakeResult from '../pages/FindMistakeResult.vue';
import Mypage from '../pages/Mypage.vue';
import Challenge from '../pages/challenge/Challenge.vue';
import ChallengeInfo from '../pages/challenge/ChallengeInfo.vue';
import ChallengeDetail from '../pages/challenge/ChallengeDetail.vue';
import ChallengeStart from '../pages/challenge/ChallengeStart.vue';
import ChallengeCreate from '../pages/challenge/ChallengeCreate.vue';
import FinalQuizResult from '../pages/FinalResult.vue';

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/quiz', name: 'quiz', component: QuizPage },
  { path: '/findMistake', name: 'findMistake', component: FindMistake },
  { path: '/findMistakeResult', name: 'findMistakeResult', component: FindMistakeResult },
  { path: '/challenge', name: 'Challenge', component: Challenge },
  { path: '/challenge/info', name: 'ChallengeInfo', component: ChallengeInfo },
  { path: '/challenge/detail', name: 'ChallengeDetail', component: ChallengeDetail },
  { path: '/challenge/start', name: 'ChallengeStart', component: ChallengeStart },
  { path: '/challenge/create', name: 'ChallengeCreate', component: ChallengeCreate },
  { path: '/userjoin', name: 'UserJoin', component: UserJoin },
  { path: '/login', name: 'Login', component: Login },
  { path: '/mypage', name: 'Mypage', component: Mypage },
  { path: '/finalQuizResult', name: 'finalQuizResult', component: FinalQuizResult },
];

const router = createRouter({
  history: createWebHistory('/'), // BASE_URL 명시적으로 설정
  routes,
});

export default router;
