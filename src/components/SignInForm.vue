<template>
  <div class="signin-form">
    <h1>Sign In To Your Account</h1>
    <form @submit.prevent="signIn()">
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
        Sign In!
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
import firebase from 'firebase/app';

export default {
  name: 'SingInForm',
  data() {
    return {
      emailInput: '',
      passwordInput: '',
    };
  },
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.emailInput, this.passwordInput).catch((error) => {
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
