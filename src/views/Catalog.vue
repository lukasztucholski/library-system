<template>
  <section class="catalog">
    <h1>Browse Catalog</h1>
    <CatalogMenu :library="library" />
  </section>
</template>

<script>
import CatalogMenu from '../components/catalog-components/CatalogMenuList.vue';
import libraryDatabase from '../library-database';

export default {
  name: 'Catalog',
  components: { CatalogMenu },
  data() {
    return {
      library: libraryDatabase,
    };
  },
};
</script>

<style>
</style>
