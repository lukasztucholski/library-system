<template>
  <div class="library-system">
    <h1 class="library-system__title">VUE APP</h1>
    <Menu />
    <div class="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Menu from './components/MenuList.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: { Menu, Footer },
};
</script>

<style>
</style>
