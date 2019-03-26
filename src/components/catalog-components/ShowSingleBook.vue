<template>
  <div>
    <h1>
      {{ singleBook.title || 'n/a' }}
      <button @click="closeComponent()">
        Close
      </button>
    </h1>
    <div class="book-info">
      <img :src="singleBook.thumbnailUrl">
      <div class="book-details">
        <p>Book ID: {{ singleBook.id || 'n/a' }}</p>
        <p v-if="singleBook.authors">
          Authors: {{ singleBook.authors.join(", ") || 'n/a' }}
        </p>
        <p v-if="singleBook.categories">
          Categories: {{ singleBook.categories.join(", ") || 'n/a' }}
        </p>
        <p>Pages: {{ singleBook.pageCount || 'n/a' }}</p>
        <p>ISBN: {{ singleBook.isbn || 'n/a' }}</p>
        <p v-if="singleBook.publishedDate">
          Published: {{ new Date(singleBook.publishedDate.date).toLocaleDateString() || 'n/a' }}
        </p>
      </div>
      <div class="book-menu">
        <p>Quantity in library: {{ singleBook.quantity || 'n/a' }}</p>
        <p>Status: {{ status || 'n/a' }}</p>
        <button
          v-if="singleBook.status === 'available'"
          @click="addBookToCart(singleBook)"
        >
          Add to cart
        </button>
      </div>
    </div>
    <div class="book-description">
      <p>Short Description: {{ singleBook.shortDescription || 'n/a' }}</p>
      <p>Long Description: {{ singleBook.longDescription || 'n/a' }}</p>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../main';

export default {
  name: 'ShowSingleBook',
  props: {
    singleBook: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    status() {
      let status = '';
      if (this.singleBook.status === 'inYourCart') {
        status = 'This book is in your cart.';
      }
      if (this.singleBook.status === 'available') {
        status = 'Available to borrow!';
      }
      if (this.singleBook.status === 'borrowed') {
        status = 'This book is borrowed by someone.';
      }
      if ((this.singleBook.status === 'borrowed') && (this.singleBook.whichUserHas === eventBus.user.uid)) {
        status = 'You have already borrowed this book.';
      }
      return status;
    },
  },
  methods: {
    closeComponent() {
      this.$emit('closeComponent');
    },
    addBookToCart(book) {
      eventBus.$emit('addToCart', book);
      this.singleBook.status = 'inYourCart';
    },
  },
};
</script>

<style>
</style>
