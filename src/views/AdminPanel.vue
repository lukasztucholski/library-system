<template>
  <section class="admin-panel">
    <h1>Admin Panel</h1>
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
  name: 'AdminPanel',
  data() {
    return {
      isLogged: false,
      user: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    if (eventBus.isLogged) {
      if (eventBus.user.isAdmin) {
        next();
      } else {
        next({ name: 'notadmin' });
      }
    } else {
      next({ name: 'signin' });
    }
  },
};
</script>

<style>
</style>
