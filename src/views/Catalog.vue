<template>
  <section class="catalog">
    <h1>Browse Catalog</h1>
    <p
      v-if="!loaded"
    >
      Loading data from database...
    </p>
    <CatalogMenu
      v-if="library.length > 0"
      :library="library"
      @showCollection="allBooksOfSelected($event)"
    />
    <component
      :is="selectedComponent"
      v-if="titleOfCollection.length > 0"
      :title="titleOfCollection"
      :books="collectionForChildComp"
      :single-book="selectedSingleBook"
      @showBook="showSingleBook($event)"
      @closeComponent="closeComponent()"
    />
</section>
</template>

<script>
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
      titleOfCollection: '',
      selectedSingleBook: {},
    };
  },
  created() {
    firebase.database().ref().once('value').then((lib) => {
      this.loaded = true;
      this.library = lib.val();
    }); // read only once
    // eslint-disable-next-line max-len
    // firebase.database().ref().on('value', (lib) => { console.dir(lib.val()); this.library = lib.val(); }); // real-time watcher to changing records in database
  },
  methods: {
    allBooksOfSelected(dataFromEmitedEvent) {
      this.collectionForChildComp = [];
      this.titleOfCollection = dataFromEmitedEvent.value;
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
        if (bookFromDb._id === bookId) {
          book = bookFromDb;
        }
      });
      return book;
    },
    showSingleBook(bookId) {
      this.selectedSingleBook = this.getBookFromDatabase(bookId);
      this.titleOfCollection = this.selectedSingleBook.title;
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
