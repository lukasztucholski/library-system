<template>
  <section class="catalog">
    <h1>Browse Catalog</h1>
    <CatalogMenu :library="library" />
  </section>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';
import CatalogMenu from '../components/catalog-components/CatalogMenuList.vue';

export default {
  name: 'Catalog',
  components: { CatalogMenu },
  data() {
    return {
      library: [],
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
};
</script>

<style>
</style>
