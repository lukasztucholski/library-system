/* eslint-disable no-new */
import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Catalog from '../views/Catalog.vue';
import Settings from '../views/DisplaySettings.vue';
import Contact from '../views/Contact.vue';
import AdminPanel from '../views/AdminPanel.vue';
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
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        title: 'Search in the catalog',
      },
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog,
      meta: {
        title: 'Browse Catalog',
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        title: 'Settings',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: {
        title: 'Contact',
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPanel,
      meta: {
        title: 'Admin Panel',
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