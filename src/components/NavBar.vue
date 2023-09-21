<template>
  <div id="nav" class="nav">
    <router-link to="/" class="brand">Some users</router-link>
    <!-- <input v-model="search" placeholder="Search" /> -->
    <nav>
      <router-link to="/" tag="button" class="nav-item"
        ><BaseIcon name="list"></BaseIcon
      ></router-link>

      <router-link to="/user/grid" tag="button" class="nav-item"
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
      user: [],
    }
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
  margin-right: 10px;
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: #db0909;
  border-bottom: solid 4px #e42121;
}
</style>
