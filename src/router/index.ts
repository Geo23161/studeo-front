import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/after'
  },
  {
    path: '/search',
    component: () => import('@/views/SearchPage.vue')
  },
  {
    path: '/after',
    component: () => import('@/views/AfterPage.vue')
  },
  {
    path: '/welcome',
    component: () => import('@/views/WelcomePage.vue')
  },
  {
    path: '/spec',
    component: () => import('@/views/SpecPage.vue')
  },
  {
    path: '/quest/:id',
    component: () => import('@/views/QPage.vue')
  },
  {
    path: '/cquest/:id',
    component: () => import('@/views/CPage.vue')
  },
  {
    path: '/fiche/:id',
    component: () => import('@/views/FPage.vue')
  },
  {
    path: '/news/:id',
    component: () => import('@/views/NewsPage.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/RegisterPage.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/ask',
    component: () => import('@/views/AskPage.vue')
  },
  {
    path: '/answer/:id',
    component: () => import('@/views/AideAnsPage.vue')
  },
  {
    path: '/canswer/:id',
    component: () => import('@/views/ConsAnsPage.vue')
  },
  {
    path: '/cask',
    component: () => import('@/views/CAskPage.vue')
  },
  {
    path: '/fiche',
    component: () => import('@/views/FichePage.vue')
  },
  {
    path: '/conseil',
    component: () => import('@/views/ConseilPage.vue')
  },
  {
    path: '/aides_answers',
    component: () => import('@/views/AidesAnswersPage.vue')
  },
  {
    path: '/conseils_answers',
    component: () => import('@/views/ConseilsAnswersPage.vue')
  },
  {
    path: '/mes_conseil',
    component: () => import('@/views/MesConseilPage.vue') 
  },
  {
    path: '/aide',
    component: () => import('@/views/AidePage.vue')
  },
  {
    path: '/staff',
    component: () => import('@/views/StaffPage.vue')
  },
  {
    path: '/add',
    component: () => import('@/views/AddFichePage.vue')
  },
  {
    path: '/mes_aide', 
    component: () => import('@/views/MesAidesPage.vue')
  },
  {
    path: '/mes_fiche',
    component: () => import('@/views/MesFichesPage.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
