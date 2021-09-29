<template>
  <router-link
    class="user-link"
    :to="{ name: 'user-show', params: { id: user.id } }"
  >
    <div class="user-card -shadow">
      <h4 class="title">{{ user.title }}</h4></br>
      <img :src="user.picture" /></br>
      <BaseIcon name="users">{{ user.location }} location</BaseIcon>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    user: Object,
  },
}
</script>

<style scoped>
img {
  width: 100%;
  max-width: 100px;
}
.user-card {
  padding: 10px;
  margin-bottom: 14px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.user-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.user-card > .title {
  margin: 0;
}
.user-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
