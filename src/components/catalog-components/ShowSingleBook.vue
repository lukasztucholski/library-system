<template>
  <div>
    <h1>{{ singleBook.title }}</h1>
    <img :src="singleBook.thumbnailUrl">
    <p>Book ID: {{ singleBook._id }}</p>
    <p>Book authors: {{ singleBook.authors.join(", ") }}</p>
    <p>Book categories: {{ singleBook.categories.join(", ") }}</p>
    <p>Book pageCount: {{ singleBook.pageCount }}</p>
  </div>
</template>

<script>
export default {
  name: 'ShowSingleBook',
  props: ['singleBook'],
};
</script>

<style>
</style>
