import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from './pages/layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('./pages/list.vue'),
      },
      {
        path: 'register',
        component: () => import('./pages/register.vue'),
      },
      {
        path: 'login',
        component: () => import('./pages/login.vue'),
      }
    ],
  },
  {
    path: '/editor/:id',
    component: () => import('./pages/editor/index.vue')
  }
]

Vue.use(VueRouter);

export default new VueRouter({
  routes,
});

