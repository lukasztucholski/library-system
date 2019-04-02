<template>
  <nav
    class="menu"
    @click="isToggleClsassActive = !isToggleClsassActive"
  >
    <div
      class="menu__toggle"
    >
      <span class="toggle__bar" />
      <span class="toggle__bar" />
      <span class="toggle__bar" />
    </div>
    <ul
      :class="{ 'menu__list': true, 'hidden': isToggleClsassActive}"
    >
      <router-link
        :to="{ name: 'home' }"
        tag="li"
      >
        Home
      </router-link>
      <router-link
        :to="{ name: 'search' }"
        tag="li"
      >
        Search
      </router-link>
      <router-link
        :to="{ name: 'catalog' }"
        tag="li"
      >
        Browse Catalog
      </router-link>
      <router-link
        :to="{ name: 'settings' }"
        tag="li"
      >
        Display Settings
      </router-link>
      <router-link
        :to="{ name: 'contact' }"
        tag="li"
        class="contact__link"
      >
        Contact
      </router-link>
      <router-link
        :to="{ name: 'adminpanel' }"
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
  data() {
    return {
      isToggleClsassActive: true,
    };
  },
};
</script>

<style>
</style>
