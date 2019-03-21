<template>
  <footer class="footer">
    <p>Made by <a href="https://github.com/lukasztucholski">Łukasz Tucholski</a>. License: <a href="https://en.wikipedia.org/wiki/MIT_License">MIT</a></p>
    <div>
      <p>//temp area</p>
      <button @click="wyloguj()">
        logout
      </button>
      <button @click="zaloguj()">
        login
      </button>
    </div>
  </footer>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'Footer',
  methods: {
    wyloguj() {
      firebase.auth().signOut();
    },
    zaloguj() {
      firebase.auth().signInWithEmailAndPassword('test@test.pl', 'test12');
    },
  },
};
</script>

<style>
</style>
