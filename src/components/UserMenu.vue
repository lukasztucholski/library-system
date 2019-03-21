<template>
  <div class="user-menu">
    <ul>
      <router-link
        to="/signin"
        tag="li"
      >
        Sign In
      </router-link>
      <span>or</span>
      <router-link
        to="/signup"
        tag="li"
      >
        Sign Up
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserMenu',
};
</script>

<style>
</style>
