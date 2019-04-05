/* eslint-disable no-new */
import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Catalog from '../views/Catalog.vue';
import Settings from '../views/DisplaySettings.vue';
import Contact from '../views/Contact.vue';
import AdminPanel from '../views/AdminPanel.vue';
import Cart from '../views/Cart.vue';
import UserPanel from '../views/UserPanel.vue';
import BorrowedBooks from '../views/BorrowedBooks.vue';
import SignUpForm from '../components/SignUpForm.vue';
import SignInForm from '../components/SignInForm.vue';

// error views
import Error404 from '../views/errors/404.vue';
import NotAdmin from '../views/errors/NotAdmin.vue';

import ShowSingleBook from '../components/catalog-components/ShowSingleBook.vue';
import ShowBooksOfSelectedCollection from '../components/catalog-components/ShowBooksOfSelectedCollection.vue';

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
      children: [
        {
          path: 'books/:bookId',
          name: 'singleBook',
          component: ShowSingleBook,
          meta: {
            title: 'Book with id (hmm how to do this???)',
          },
          props: true,
        },
        {
          path: 'authors/:booksOfAuthor',
          name: 'booksOfAuthors',
          component: ShowBooksOfSelectedCollection,
          meta: {
            title: 'Books of (...)',
          },
          props: true,
        },
        {
          path: 'categories/:booksOfCategory',
          name: 'booksOfCategories',
          component: ShowBooksOfSelectedCollection,
          meta: {
            title: 'Books of (...)',
          },
          props: true,
        },
      ],
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
      path: '/adminpanel',
      name: 'adminpanel',
      component: AdminPanel,
      meta: {
        title: 'Admin Panel',
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpForm,
      meta: {
        title: 'Sign Up',
      },
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInForm,
      meta: {
        title: 'Sign In',
      },
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        title: 'Cart',
      },
    },
    {
      path: '/userpanel',
      name: 'userpanel',
      component: UserPanel,
      meta: {
        title: 'Manage Your Account',
      },
    },
    {
      path: '/borrowedbooks',
      name: 'borrowedbooks',
      component: BorrowedBooks,
      meta: {
        title: 'Your Borrowed Books',
      },
    },
    {
      path: '/notadmin',
      name: 'notadmin',
      component: NotAdmin,
      meta: {
        title: 'Permission Denied',
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
