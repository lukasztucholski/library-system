<template>
  <section class="catalog">
    <h1>Browse Catalog</h1>
    <CatalogMenu
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
    />
  </section>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';
import CatalogMenu from '../components/catalog-components/CatalogMenuList.vue';
import ShowBooksOfSelectedCollection from '../components/catalog-components/ShowBooksOfSelectedCollection.vue';
import ShowSingleBook from '../components/catalog-components/ShowSingleBook.vue';

export default {
  name: 'Catalog',
  components: { CatalogMenu, ShowBooksOfSelectedCollection, ShowSingleBook },
  data() {
    return {
      library: [],
      selectedComponent: '',
      collectionForChildComp: [],
      titleOfCollection: '',
      selectedSingleBook: '',
    };
  },
  created() {
    const firebaseConfig = {
      apiKey: 'AIzaSyB7YHlcqqiFWdMcO8xfNM21prjcNCBfvbE',
      authDomain: 'library-system-vuejs.firebaseapp.com',
      databaseURL: 'https://library-system-vuejs.firebaseio.com',
      projectId: 'library-system-vuejs',
      storageBucket: 'library-system-vuejs.appspot.com',
      messagingSenderId: '467782326362',
    };
    firebase.initializeApp(firebaseConfig);
    firebase.database().ref().once('value').then((lib) => { this.library = lib.val(); }); // read only once
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
  },
};
</script>

<style>
</style>
