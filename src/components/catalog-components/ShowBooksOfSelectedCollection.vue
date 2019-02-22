<template>
  <div class="books-of-collection">
    <h1>Books of {{ nameOfCollection }}</h1>
    <br>
    <select
      @click="selectBook($event)"
    >
      <option
        v-for="book in books"
        :key="book._id"
      >
        {{ book.title }}
      </option>
    </select>
    <component
      :is="selectedComp"
      :book="selectedBook"
    />
  </div>
</template>

<script>
import ShowSingleBook from './ShowSingleBook.vue';

export default {
  name: 'ShowBooksOfSelectedCollection',
  components: { ShowSingleBook },
  props: ['nameOfCollection', 'books'],
  data() {
    return {
      selectedBook: {},
      selectedComp: '',
    };
  },
  methods: {
    selectBookFromString(name) {
      let selectedBook;
      this.books.forEach((book) => {
        if (book.title === name) {
          selectedBook = book;
        }
      });
      return selectedBook;
    },
    selectBook(event) {
      this.selectedComp = 'ShowSingleBook';
      this.selectedBook = this.selectBookFromString(event.target.value);
      console.log(this.selectedBook);
    },
  },
};
</script>

<style>
</style>
