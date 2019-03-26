<template>
  <div class="signup-form">
    <h1>Create Your Account</h1>
    <form @submit.prevent="signUp()">
      <input
        v-model="emailInput"
        type="email"
        placeholder="Your E-mail Adress"
      >
      <input
        v-model="passwordInput"
        type="password"
        placeholder="Password"
      >
      <button
        type="submit"
      >
        Sign Up!
      </button>
      <p style="margin-top: 30px; font-size: 14px;">
        //temp area <br>
        Email: {{ emailInput }} <br>
        Password: {{ passwordInput }}
      </p>
    </form>
  </div>
</template>

<script>
/* eslint-disable no-console */
import firebase from 'firebase/app';

export default {
  name: 'SingUpForm',
  data() {
    return {
      emailInput: '',
      passwordInput: '',
    };
  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.emailInput, this.passwordInput)
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
  },
};
</script>

<style>
</style>
