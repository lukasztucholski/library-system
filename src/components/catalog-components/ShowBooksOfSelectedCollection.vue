<template>
  <div class="books-of-collection">
    <h1>Books of {{ title }}</h1>
    <br>
    <div
      v-for="book in books"
      :key="book._id"
    >
      <img
        :src="book.thumbnailUrl"
        :alt="book.title"
        @click="selectBook(book._id)"
      >
      <p>{{ book.title }}</p>
      <hr>
    </div>
</div>
</template>

<script>
export default {
  name: 'ShowBooksOfSelectedCollection',
  props: ['title', 'books'],
  methods: {
    selectBook(dataToEmited) {
      this.$emit('showBook', dataToEmited);
    },
  },
};
</script>

<style>
</style>
