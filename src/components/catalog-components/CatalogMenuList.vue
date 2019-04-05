<template>
  <div class="catalog-menu">
    <select
      name="authors"
      @change="selectBooksOfAuthors($event.target.value)"
    >
      <option
        value=""
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
      @change="selectBooksOfCategories($event.target.value)"
    >
      <option
        value=""
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
        value=""
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
  </div>
</template>

<script>
export default {
  name: 'CatalogMenu',
  props: {
    library: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    allAuthors() {
      return this.getList2('authors');
    },
    allCategories() {
      return this.getList2('categories');
    },
    allTitles() {
      return this.getList('title');
    },
  },
  methods: {
    selectBooksOfAuthors(valueOfSelectedItem) {
      // this.$router.push(`/catalog/authors/${valueOfSelectedItem}`);
      // or
      this.$router.push({ name: 'booksOfAuthors', params: { booksOfAuthor: valueOfSelectedItem } });
    },
    selectBooksOfCategories(valueOfSelectedItem) {
      // this.$router.push(`/catalog/categories/${valueOfSelectedItem}`);
      // or
      this.$router.push({ name: 'booksOfCategories', params: { booksOfCategory: valueOfSelectedItem } });
    },
    getList(nameOfList) {
      const statistics = {};
      const collectionArray = [];
      this.library.forEach((book) => {
        if (book[nameOfList]) {
          if (book[nameOfList].length > 0) {
            if (!statistics[book[nameOfList].toUpperCase()]) {
              statistics[book[nameOfList].toUpperCase()] = 1;
              collectionArray.push(book[nameOfList]);
            } else {
              statistics[book[nameOfList].toUpperCase()] += 1;
            }
          }
        }
      });
      collectionArray.sort((a, b) => a.localeCompare(b)); // sort by alhapetical, ES6 method.
      return collectionArray;
    },
    getList2(name) {
      const statistics = {};
      const collectionArray = [];

      this.library.forEach((book) => {
        if (book[name]) {
          if (book[name].length > 0) {
            book[name].forEach((item) => {
              if (item.length > 0) {
                if (!statistics[item.toUpperCase()]) {
                  statistics[item.toUpperCase()] = 1;
                  collectionArray.push(item);
                } else {
                  statistics[item.toUpperCase()] += 1;
                }
              }
            });
          }
        }
      });
      collectionArray.sort((a, b) => a.localeCompare(b)); // sort by alhapetical, ES6 method.
      return collectionArray;
    },
  },
};
</script>

<style>
</style>
