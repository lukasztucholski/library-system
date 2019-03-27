<template>
  <section class="cart">
    <h1>Cart</h1>
    <p
      v-for="book in cartContent"
      :key="book.id"
    >
      {{ book.title }} - {{ book.id }}
    </p>
    <button
      v-if="cartContent.length > 0"
      :disabled="!isLogged"
      @click="borrowBooks()"
    >
      Borrow Books
    </button>
    <p v-else>
      You don't have any books in cart
    </p>
    <p v-if="(!isLogged) && (cartContent.length > 0)">
      You must be logged if you want to borrow books!
    </p>
  </section>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import firebase from 'firebase/app';
import { eventBus } from '../main';

export default {
  name: 'Cart',
  data() {
    return {
      isLogged: false,
      user: {},
      cartContent: [],
    };
  },
  created() {
    this.cartContent = eventBus.cartContent;
    this.isLogged = eventBus.isLogged;
    this.user = eventBus.user;
    eventBus.$on('changeLoggedStatus', (updatedUserInfo) => {
      this.isLogged = updatedUserInfo.status;
      this.user = updatedUserInfo.user;
    });
  },
  methods: {
    borrowBooks() {
      if (this.isLogged) {
        if (!this.user.borrowedBooks) {
          this.user.borrowedBooks = [];
        }
        const dateOfBorrowed = new Date().getTime();
        const dateOfGiveBack = new Date().setMonth(new Date().getMonth() + 1);
        this.cartContent.forEach((book) => {
          this.user.borrowedBooks.push({
            dateOfBorrowed,
            dateOfGiveBack,
            id: book.id,
          });
          const editedDocument = firebase.firestore().collection('books').doc(`${book.id}`);
          editedDocument.update({
            status: 'borrowed',
            whichUserHas: this.user.uid,
            dateOfBorrowed,
            dateOfGiveBack,
          })
            .then(() => {
              const userInDatabase = firebase.firestore().collection('users').doc(`${this.user.uid}`);
              userInDatabase.update({
                borrowedBooks: this.user.borrowedBooks,
              });
              console.log('Document successfully updated!');
              this.cartContent = [];
              eventBus.$emit('clearCart');
            })
            .catch((error) => {
              console.error('Error updating document: ', error);
            });
        });
      }
    },
  },
};
</script>

<style>
</style>
