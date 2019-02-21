<template>
  <div class="history-nav">
    <ul>
      <router-link
        to=""
        tag="li"
        @click.native="goBack"
      >
        << Back
      </router-link>
      <router-link
        to=""
        tag="li"
        @click.native="goForward"
      >
        Forward >>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HistoryNavigation',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goForward() {
      this.$router.go(1);
    },
  },
};
</script>

<style>
</style>
