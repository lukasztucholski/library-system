<template>
  <nav class="menu">
    <ul>
      <router-link
        to="/"
        tag="li"
      >
        Home
      </router-link>
      <router-link
        to="/search"
        tag="li"
      >
        Search
      </router-link>
      <router-link
        to="/catalog"
        tag="li"
      >
        Browse Catalog
      </router-link>
      <router-link
        to="/settings"
        tag="li"
      >
        Display Settings
      </router-link>
      <router-link
        to="/contact"
        tag="li"
        class="contact__link"
      >
        Contact
      </router-link>
      <router-link
        to="/admin"
        tag="li"
      >
        Admin Panel
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'MenuList',
};
</script>

<style>
</style>
