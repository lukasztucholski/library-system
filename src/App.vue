<template>
  <div class="library-system">
    <h1 class="library-system__title">VUE APP</h1>
    <Menu />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Menu from './components/MenuList.vue';

export default {
  name: 'App',
  components: { Menu },
};
</script>

<style>
</style>
