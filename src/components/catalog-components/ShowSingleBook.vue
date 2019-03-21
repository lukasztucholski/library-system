<template>
  <div>
    <h1>{{ singleBook.title }}
      <button @click="closeComponent()">
        Close
      </button>
    </h1>
    <img :src="singleBook.thumbnailUrl">
    <p>Book ID: {{ singleBook._id }}</p>
    <p>Status: {{ singleBook.status }}</p>
    <p v-if="singleBook.authors">Authors: {{ singleBook.authors.join(", ") }}</p>
    <p v-if="singleBook.categories">Categories: {{ singleBook.categories.join(", ") }}</p>
    <p v-if="singleBook.pageCount > 0">
      Pages: {{ singleBook.pageCount }}
    </p>
    <p v-else>
      Pages: n/d
    </p>
    <p>ISBN: {{ singleBook.isbn }}</p>
    <p v-if="singleBook.publishedDate">Published: {{ new Date(singleBook.publishedDate.date).toLocaleDateString() }}</p>
    <br>
    <p>Short Description: {{ singleBook.shortDescription }}</p>
    <br>
    <p>Long Description: {{ singleBook.longDescription }}</p>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'ShowSingleBook',
  props: {
    singleBook: {
      type: Object,
      default: () => {},
    },
  },
  created() {
  },
  methods: {
    closeComponent() {
      this.$emit('closeComponent');
    },
  },
};
</script>

<style>
</style>
