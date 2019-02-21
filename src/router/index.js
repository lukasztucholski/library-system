/* eslint-disable no-new */
import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home.vue';
import Error404 from '../views/errors/404.vue';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Library System by ŁT',
      },
    },
    {
      path: '*',
      component: Error404,
      meta: {
        title: 'ERROR 404',
      },
    },
  ],
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
