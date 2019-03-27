<template>
  <section class="borrowed-books">
    <h1>Your Borrowed Books</h1>
    <div
      v-if="isLogged"
    >
      <p
        v-for="book in userBooks"
        :key="book.id"
      >
        {{ book.title }}
      </p>
      <p v-if="userBooks.length === 0">
        You don't have borrow any books.
      </p>
    </div>
    <p v-else>
      You must sign in to your account to see this page!
    </p>
  </section>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import firebase from 'firebase/app';
import { eventBus } from '../main';

export default {
  name: 'BorrowedBooks',
  data() {
    return {
      isLogged: false,
      user: {},
      userBooks: [],
    };
  },
  created() {
    this.user = eventBus.user;
    this.isLogged = eventBus.isLogged;
    this.getUserBooks();
    eventBus.$on('changeLoggedStatus', (updatedUserInfo) => {
      this.isLogged = updatedUserInfo.status;
      this.user = updatedUserInfo.user;
    });
  },
  methods: {
    getUserBooks() {
      if (this.user.borrowedBooks) {
        this.user.borrowedBooks.forEach((book) => {
          firebase.firestore().collection('books').where('id', '==', book.id).get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // console.log(doc.data());
                this.userBooks.push(doc.data());
              });
            })
            .catch((error) => {
              console.log('Error getting documents: ', error);
            });
        });
      }
    },
  },
};
</script>

<style>
</style>
