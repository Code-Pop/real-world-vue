<template>
  <div id="nav" class="nav">
    <router-link to="/" class="brand">Some users</router-link>

    <nav>
      <router-link to="/" tag="button"
        ><BaseIcon name="list"></BaseIcon
      ></router-link>
      &nbsp
      <router-link to="/user/grid" tag="button"
        ><BaseIcon name="grid"></BaseIcon
      ></router-link>
    </nav>
  </div>
</template>

<script>
import BaseIcon from './BaseIcon.vue'
export default {
  components: { BaseIcon },
  data() {
    return {
      search: '',
    }
  },
  watch: {
    search() {
      this.$store.dispatch('search', this.search)
    },
  },
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.nav > .brand {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #8d0f0f;
  text-decoration: none;
}
.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: #991010;
  border-bottom: solid 2px #a50909;
}
</style>
