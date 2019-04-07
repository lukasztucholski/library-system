<template>
  <div class="books-of-collection">
    <h1>
      Books of {{ titleOfCollection }}
      <button
        class="closed-btn"
        @click="closeComponent()"
      >
        Close
      </button>
    </h1>
    <div
      v-for="book in collection"
      :key="book.id"
    >
      <img
        :src="book.thumbnailUrl"
        :alt="book.title"
        @click="selectBook(book.id)"
      >
      <p>{{ book.title }}</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import firebase from 'firebase/app';
// eslint-disable-next-line import/no-cycle
import { eventBus } from '../../main';

export default {
  name: 'ShowBooksOfSelectedCollection',
  props: {
    title: {
      type: String,
      default: 'Default Title',
    },
    books: {
      type: Array,
      default: () => [],
    },
    booksOfAuthor: {
      type: String,
      default: '',
    },
    booksOfCategory: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      collection: this.books || [],
      titleOfCollectoin: this.title || '',
    };
  },
  created() {
    if (this.booksOfAuthor.length > 0) {
      this.titleOfCollection = this.booksOfAuthor;
      (eventBus.library.length > 0) ? this.getBooksFromStorage('authors', this.booksOfAuthor) : this.getBooksFromDatabase('authors', this.booksOfAuthor);
    } else if (this.booksOfCategory.length > 0) {
      this.titleOfCollection = this.booksOfCategory;
      (eventBus.library.length > 0) ? this.getBooksFromStorage('categories', this.booksOfCategory) : this.getBooksFromDatabase('categories', this.booksOfCategory);
    }
  },
  methods: {
    selectBook(valueOfSelectedItem) {
      this.$router.push({ name: 'singleBook', params: { bookId: `${valueOfSelectedItem}` } }); // bookId must be string, not number
    },
    closeComponent() {
      this.$router.push({ name: 'catalog' });
    },
    getBooksFromStorage(wchichField, valueFromProp) {
      eventBus.library.forEach((book) => {
        if (book[wchichField]) {
          if (book[wchichField].includes(valueFromProp)) {
            this.collection.push(book);
          }
        }
      });
    },
    getBooksFromDatabase(wchichField, valueFromProp) {
      firebase.firestore().collection('books').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((book) => {
            if (book.data()[wchichField]) {
              if (book.data()[wchichField].includes(valueFromProp)) {
                this.collection.push(book.data());
              }
            }
          });
        })
        .catch((error) => {
          console.dir('Error getting collection: ', error);
        });
    },
  },
};
</script>

<style>
</style>
