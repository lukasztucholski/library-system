<template>
  <div class="app">
    <h1 class="app__title">
      LIBRARY SYSTEM
    </h1>
    <UserMenu />
    <CartWidget />
    <Menu />
    <!-- <HistoryNavigation /> -->
    <div class="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Menu from './components/MenuList.vue';
import Footer from './components/Footer.vue';
import UserMenu from './components/UserMenu.vue';
import HistoryNavigation from './components/HistoryNavigation.vue';
import CartWidget from './components/CartWidget.vue';

export default {
  name: 'App',
  components: {
    Menu, Footer, UserMenu, HistoryNavigation, CartWidget,
  },
};
</script>

<style>
</style>
