<template>
  <section class="user-panel">
    <h1>Manager Your Account</h1>
    <p>User e-mail: {{ user.email }}</p>
    <p>User First Name: {{ user.firstName }}</p>
    <p>User Last Name: {{ user.lastName }}</p>
    <p>User Nickname: {{ user.nickname }}</p>
  </section>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import { eventBus } from '../main';

export default {
  name: 'UserPanel',
  data() {
    return {
      isLogged: false,
      user: {},
    };
  },
  created() {
    this.user = eventBus.user;
    this.isLogged = eventBus.isLogged;
    eventBus.$on('changeLoggedStatus', (updatedUserInfo) => {
      this.isLogged = updatedUserInfo.status;
      this.user = updatedUserInfo.user;
    });
  },
};
</script>

<style>
</style>
