<template>
  <section class="catalog">
    <h1>Browse Catalog</h1>
    <p
      v-if="!loadedInfo && error.length === 0"
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
    <router-view :key="$route.fullPath" />
  </section>
</template>

<script>
/* eslint-disable no-console */
import firebase from 'firebase/app';
// eslint-disable-next-line import/no-cycle
import { eventBus } from '../main';
import CatalogMenu from '../components/catalog-components/CatalogMenuList.vue';

export default {
  name: 'Catalog',
  components: { CatalogMenu },
  data() {
    return {
      loadedInfo: false,
      library: [],
      error: '',
    };
  },
  created() {
    if (eventBus.library.length > 0) {
      this.library = eventBus.library;
      this.loadedInfo = true;
    } else {
      firebase.firestore().collection('books').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.library.push(doc.data());
          });
          this.loadedInfo = true;
          eventBus.$emit('getLibrary', this.library);
        })
        .catch((error) => {
          console.dir('Error getting collection: ', error);
          this.error = `${error.name}: ${error.message}`;
        });
    }
  },
};
</script>

<style>
</style>
