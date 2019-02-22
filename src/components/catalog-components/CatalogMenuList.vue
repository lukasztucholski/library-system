<template>
  <div class="catalog-menu">
    <select
      name="author"
      @change="allBooksOfSelected($event, 'authors')"
    >
      <option
        value="none"
        disabled
        selected
      >
        All authors of books:
      </option>
      <option
        v-for="author in allAuthors"
        :key="author"
      >
        {{ author }}
      </option>
    </select>
    <select
      name="categories"
      @change="allBooksOfSelected($event, 'categories')"
    >
      <option
        value="none"
        disabled
        selected
      >
        All categories of books:
      </option>
      <option
        v-for="category in allCategories"
        :key="category"
      >
        {{ category }}
      </option>
    </select>
    <select name="titles">
      <option
        value="none"
        disabled
        selected
      >
        All titles of books:
      </option>
      <option
        v-for="title in allTitles"
        :key="title"
      >
        {{ title }}
      </option>
    </select>
    <component
      :is="selectedComponent"
      :nameOfCollection="nameOfCollectionForChildComp"
      :books="collectionForChildComp"
    />
    <hr style="margin: 300px 0 5px 0">
    <p style="font-size:14px">
      Temporary space for tests
    </p>
    <button
      style="padding: 2px"
      @click="libraryStatistics()"
    >
      Statistics of books properties (in console).
    </button>
  </div>
</template>

<script>
/* eslint-disable no-console */
import ShowBooksOfSelectedCollection from './ShowBooksOfSelectedCollection.vue';

export default {
  name: 'CatalogMenu',
  components: { ShowBooksOfSelectedCollection },
  props: {
    library: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedComponent: '',
      collectionForChildComp: [],
      nameOfCollectionForChildComp: '',
    };
  },
  computed: {
    allAuthors() {
      const authorsStatistics = {};
      const authorsArray = [];
      this.library.forEach((book) => {
        if (book.authors.length > 0) {
          book.authors.forEach((author) => {
            if (author.length > 0) {
              if (!authorsStatistics[author.toUpperCase()]) {
                authorsStatistics[author.toUpperCase()] = 1;
                authorsArray.push(author);
              } else {
                authorsStatistics[author.toUpperCase()] += 1;
              }
            }
          });
        }
      });
      authorsArray.sort((a, b) => a.localeCompare(b)); // sort by alhapetical, ES6 method.
      return authorsArray;
    },
    allCategories() {
      const categoriesStatistics = {};
      const categoriesArray = [];
      this.library.forEach((book) => {
        if (book.categories.length > 0) {
          book.categories.forEach((category) => {
            if (category.length > 0) {
              if (!categoriesStatistics[category.toUpperCase()]) {
                categoriesStatistics[category.toUpperCase()] = 1;
                categoriesArray.push(category);
              } else {
                categoriesStatistics[category.toUpperCase()] += 1;
              }
            }
          });
        }
      });
      categoriesArray.sort((a, b) => a.localeCompare(b)); // sort by alhapetical, ES6 method.
      return categoriesArray;
    },
    allTitles() {
      const titlesStatistics = {};
      const titlesArray = [];
      this.library.forEach((book) => {
        if (book.title.length > 0) {
          if (!titlesStatistics[book.title.toUpperCase()]) {
            titlesStatistics[book.title.toUpperCase()] = 1;
            titlesArray.push(book.title);
          } else {
            titlesStatistics[book.title.toUpperCase()] += 1;
          }
        }
      });
      titlesArray.sort((a, b) => a.localeCompare(b)); // sort by alhapetical, ES6 method.
      return titlesArray;
    },
  },
  methods: {
    allBooksOfSelected(e, whatToGenerate) {
      this.collectionForChildComp = [];
      this.nameOfCollectionForChildComp = e.target.value;
      this.selectedComponent = 'ShowBooksOfSelectedCollection';

      if (whatToGenerate === 'authors') {
        this.library.forEach((book) => {
          if (book.authors.length > 0) {
            book.authors.forEach((author) => {
              if (e.target.value.toUpperCase() === author.toUpperCase()) {
                this.collectionForChildComp.push(book);
              }
            });
          }
        });
      } else if (whatToGenerate === 'categories') {
        this.library.forEach((book) => {
          if (book.categories.length > 0) {
            book.categories.forEach((category) => {
              if (e.target.value.toUpperCase() === category.toUpperCase()) {
                this.collectionForChildComp.push(book);
              }
            });
          }
        });
      }
    },
    libraryStatistics() {
      const statistics = {};
      this.library.forEach((element, index) => {
        const obj = this.library[index];
        // eslint-disable-next-line no-restricted-syntax
        for (const item in obj) {
          if (!statistics[item]) {
            statistics[item] = 1;
          } else {
            statistics[item] += 1;
          }
        }
      });
      console.log(statistics);
    },
  },
};
</script>

<style>
</style>
