<template>
  <section class="catalog">
    <h1>Browse Catalog</h1>
    <p
      v-if="!loaded && error.length === 0"
    >
      Loading data from database...
    </p>
    <p v-if="error.length > 0">
      Oops! We have an error! - {{ error }} - Database will be available at 8pm.
    </p>
    <CatalogMenu
      v-if="library.length > 0"
      :library="library"
      @showCollection="allBooksOfSelected($event)"
    />
    <component
      :is="selectedComponent"
      v-if="titleOfComponent.length > 0"
      :title="titleOfComponent"
      :books="collectionForChildComp"
      :single-book="selectedSingleBook"
      @showBook="showSingleBook($event)"
      @closeComponent="closeComponent()"
    />
  </section>
</template>

<script>
/* eslint-disable no-console */
import firebase from 'firebase/app';
import CatalogMenu from '../components/catalog-components/CatalogMenuList.vue';
import ShowBooksOfSelectedCollection from '../components/catalog-components/ShowBooksOfSelectedCollection.vue';
import ShowSingleBook from '../components/catalog-components/ShowSingleBook.vue';

export default {
  name: 'Catalog',
  components: { CatalogMenu, ShowBooksOfSelectedCollection, ShowSingleBook },
  data() {
    return {
      loaded: false,
      library: [],
      selectedComponent: '',
      collectionForChildComp: [],
      titleOfComponent: '',
      selectedSingleBook: {},
      error: '',
    };
  },
  created() {
    firebase.firestore().collection('books').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.library.push(doc.data());
        });
        this.loaded = true;
      })
      .catch((error) => {
        console.dir('Error getting collection: ', error);
        this.error = `${error.name}: ${error.message}`;
      });
  },
  methods: {
    allBooksOfSelected(dataFromEmitedEvent) {
      this.collectionForChildComp = [];
      this.titleOfComponent = dataFromEmitedEvent.value;
      this.selectedComponent = 'ShowBooksOfSelectedCollection';

      this.library.forEach((book) => {
        if (book[dataFromEmitedEvent.name]) {
          if (book[dataFromEmitedEvent.name].length > 0) {
            book[dataFromEmitedEvent.name].forEach((item) => {
              if (dataFromEmitedEvent.value.toUpperCase() === item.toUpperCase()) {
                this.collectionForChildComp.push(book);
              }
            });
          }
        }
      });
    },
    getBookFromDatabase(bookId) {
      let book;
      this.library.forEach((bookFromDb) => {
        if (bookFromDb.id === bookId) {
          book = bookFromDb;
        }
      });
      return book;
    },
    showSingleBook(bookId) {
      this.selectedSingleBook = this.getBookFromDatabase(bookId);
      this.titleOfComponent = this.selectedSingleBook.title;
      this.selectedComponent = 'ShowSingleBook';
    },
    closeComponent() {
      this.selectedComponent = '';
    },
  },
};
</script>

<style>
</style>
