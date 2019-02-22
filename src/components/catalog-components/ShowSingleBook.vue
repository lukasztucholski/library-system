<template>
  <div>
    <h1>{{ book.title }}</h1>
    <img :src="book.thumbnailUrl">
    <p>Book ID: {{ book._id }}</p>
    <p>Book authors: {{ book.authors }}</p>
    <p>Book categories: {{ book.categories }}</p>
    <p>Book pageCount: {{ book.pageCount }}</p>
  </div>
</template>

<script>
export default {
  name: 'ShowSingleBook',
  props: ['book'],
};
</script>

<style>
</style>
