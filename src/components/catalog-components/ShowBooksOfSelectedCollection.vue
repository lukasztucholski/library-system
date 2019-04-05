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
import firebase from 'firebase/app';

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
      // console.log(this.booksOfAuthor);
      this.titleOfCollection = this.booksOfAuthor;
      firebase.firestore().collection('books').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((book) => {
            if (book.data().authors) {
              if (book.data().authors.includes(this.booksOfAuthor)) {
                this.collection.push(book.data());
              }
            }
          });
        })
        .catch((error) => {
          console.dir('Error getting collection: ', error);
        });
    } else if (this.booksOfCategory.length > 0) {
      // console.log(this.booksOfCategories);
      this.titleOfCollection = this.booksOfCategory;
      firebase.firestore().collection('books').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((book) => {
            if (book.data().categories) {
              if (book.data().categories.includes(this.booksOfCategory)) {
                this.collection.push(book.data());
              }
            }
          });
        })
        .catch((error) => {
          console.dir('Error getting collection: ', error);
        });
    }
  },
  methods: {
    selectBook(valueOfSelectedItem) {
      // this.$router.push(`/catalog/books/${valueOfSelectedItem}`);
      // or
      this.$router.push({ name: 'singleBook', params: { bookId: `${valueOfSelectedItem}` } }); // bookId must be string, not number
    },
    closeComponent() {
      this.$router.push('/catalog');
    },
  },
};
</script>

<style>
</style>
