<template>
  <div>
    <h1>
      {{ bookToRender.title || 'n/a' }}
      <button
        class="closed-btn"
        @click="closeComponent()"
      >
        Close
      </button>
    </h1>
    <div class="book-info">
      <img :src="bookToRender.thumbnailUrl">
      <div class="book-details">
        <p>Book ID: {{ bookToRender.id || 'n/a' }}</p>
        <p v-if="bookToRender.authors">
          Authors: {{ bookToRender.authors.join(", ") || 'n/a' }}
        </p>
        <p v-if="bookToRender.categories">
          Categories: {{ bookToRender.categories.join(", ") || 'n/a' }}
        </p>
        <p>Pages: {{ bookToRender.pageCount || 'n/a' }}</p>
        <p>ISBN: {{ bookToRender.isbn || 'n/a' }}</p>
        <p v-if="bookToRender.publishedDate">
          Published: {{ new Date(bookToRender.publishedDate.date).toLocaleDateString() || 'n/a' }}
        </p>
      </div>
      <div class="book-menu">
        <p>Quantity in library: {{ bookToRender.quantity || 'n/a' }}</p>
        <p>Status: {{ status || 'n/a' }}</p>
        <button
          v-if="bookToRender.status === 'available'"
          @click="addBookToCart(bookToRender)"
        >
          Add to cart
        </button>
      </div>
    </div>
    <div class="book-description">
      <p>Short Description: {{ bookToRender.shortDescription || 'n/a' }}</p>
      <p>Long Description: {{ bookToRender.longDescription || 'n/a' }}</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import firebase from 'firebase/app';
// eslint-disable-next-line import/no-cycle
import { eventBus } from '../../main';

export default {
  name: 'ShowSingleBook',
  props: {
    singleBook: {
      type: Object,
      default: () => {},
    },
    bookId: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      bookToRender: this.singleBook || {},
    };
  },
  computed: {
    status() {
      let status = '';
      if (this.bookToRender.status === 'inYourCart') {
        status = 'This book is in your cart.';
      }
      if (this.bookToRender.status === 'available') {
        status = 'Available to borrow!';
      }
      if (this.bookToRender.status === 'borrowed') {
        status = 'This book is borrowed by someone.';
      }
      if ((this.bookToRender.status === 'borrowed') && (this.bookToRender.whichUserHas === eventBus.user.uid)) {
        status = 'You have already borrowed this book.';
      }
      return status;
    },
  },
  created() {
    if (this.bookId) {
      firebase.firestore().collection('books').doc(`${this.bookId}`).get()
        .then((book) => {
          (book.exists) ? this.bookToRender = book.data() : console.log('No such document!');
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    }
  },
  methods: {
    closeComponent() {
      this.$router.push({ name: 'catalog' });
    },
    addBookToCart(book) {
      eventBus.$emit('addToCart', book);
      this.bookToRender.status = 'inYourCart';
    },
  },
};
</script>

<style>
</style>
