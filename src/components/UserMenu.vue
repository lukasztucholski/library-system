<template>
  <div class="user-menu">
    <ul
      v-if="!isLogged"
    >
      <router-link
        :to="{ name: 'signin' }"
        tag="li"
      >
        Sign In
      </router-link>
      <span>or</span>
      <router-link
        :to="{ name: 'signup' }"
        tag="li"
      >
        Sign Up
      </router-link>
    </ul>
    <ul
      v-else
    >
      <span>Logged as {{ user.firstName + ' ' + user.lastName }} ||</span>
      <router-link
        :to="{ name: 'userpanel' }"
        tag="li"
      >
        Manage Account
      </router-link>
      <router-link
        :to="{ name: 'borrowedbooks' }"
        tag="li"
      >
        Borrowed Books
      </router-link>
      <li @click="logout()">
        Logout
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import { eventBus } from '../main';

export default {
  name: 'UserMenu',
  data() {
    return {
      isLogged: false,
      user: undefined,
    };
  },
  created() {
    eventBus.$on('changeLoggedStatus', (updatedUserInfo) => {
      this.isLogged = updatedUserInfo.status;
      this.user = updatedUserInfo.user;
    });
  },
  methods: {
    logout() {
      firebase.auth().signOut();
    },
  },
};
</script>

<style>
</style>
