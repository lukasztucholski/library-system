<template>
  <div class="books-of-collection">
    <h1>
      Books of {{ title }}
      <button @click="closeComponent()">
        Close
      </button>
    </h1>
    <br>
    <div
      v-for="book in books"
      :key="book._id"
    >
      <img
        :src="book.thumbnailUrl"
        :alt="book.title"
        @click="selectBook(book.id)"
      >
      <p>{{ book.title }}</p>
      <hr>
    </div>
  </div>
</template>

<script>
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
  },
  methods: {
    selectBook(dataToEmited) {
      this.$emit('showBook', dataToEmited);
    },
    closeComponent() {
      this.$emit('closeComponent');
    },
  },
};
</script>

<style>
</style>
