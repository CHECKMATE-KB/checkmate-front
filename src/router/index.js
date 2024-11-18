import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import QuizPage from '../pages/QuizPage.vue';
import ResultPage from '../pages/ResultPage.vue';
import FindMistake from '../pages/FindMistake.vue';
import FindMistakeResult from '../pages/FindMistakeResult.vue';
import QuizPage3 from '../pages/QuizPage3.vue'; // QuizPage3 추가
import QuizPage3Result from '../pages/QuizPage3Result.vue'; // QuizPage3Result 추가
import QuizPage4 from '../pages/QuizPage4.vue'; // QuizPage4 추가
import QuizPage4Result from '../pages/QuizPage4Result.vue'; // QuizPage4Result 추가
import QuizPage5 from '../pages/QuizPage5.vue'; // QuizPage5 추가
import QuizPage5Result from '../pages/QuizPage5Result.vue'; // QuizPage5Result 추가
import FinalResult from '../pages/FinalResult.vue'; // FinalResult 추가

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/quiz', name: 'quiz', component: QuizPage },
  { path: '/result', name: 'result', component: ResultPage },
  { path: '/findMistake', name: 'findMistake', component: FindMistake },
  { path: '/findMistakeResult', name: 'findMistakeResult', component: FindMistakeResult },
  { path: '/quizPage3', name: 'quizPage3', component: QuizPage3  },
  { path: '/quizPage3Result', name: 'quizPage3Result', component: QuizPage3Result },
  { path: '/quizPage4', name: 'quizPage4', component: QuizPage4 }, // QuizPage4 추가
  { path: '/quizPage4Result', name: 'quizPage4Result', component: QuizPage4Result }, // QuizPage4Result 추가
  { path: '/quizPage5', name: 'quizPage5', component: QuizPage5 }, // QuizPage5 추가
  { path: '/quizPage5Result', name: 'quizPage5Result', component: QuizPage5Result }, // QuizPage4Result 추가
  { path: '/finalResult', name: 'finalResult', component: FinalResult }, // FinalResult 추가
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
