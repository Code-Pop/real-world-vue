<template>
  <div>
    <div class="grid">
      <UserCard
        class="cell"
        v-for="user in user.users"
        :key="user.id"
        :user="user"
      />
    </div>
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'user-grid', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page</router-link
      >
      <template v-if="hasNextPage"> | </template>
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'user-grid', query: { page: page + 1 } }"
      rel="next"
    >
      Next Page</router-link
    >
  </div>
</template>

<script>
import UserCard from '@/components/UserCard.vue'
import { mapState } from 'vuex'
import store from '@/store/store'

function getPageUsers(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store
    .dispatch(
      'user/fetchUsers',
      {
        page: currentPage,
      },
      { root: true }
    )
    .then(() => {
      routeTo.params.page = currentPage
      next()
    })
}

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    UserCard,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageUsers(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageUsers(routeTo, next)
  },
  computed: {
    hasNextPage() {
      return this.user.usersTotal > this.page * this.user.perPage
    },
    ...mapState(['user', 'users']),
  },
}
</script>

<style scoped>
.grid {
  display: flex; /* establish flex container */
  flex-wrap: wrap; /* enable flex items to wrap */
  justify-content: space-around;
}
.cell {
  flex: 0 0 32%; /* don't grow, don't shrink, width */
  height: 150px;
  margin-bottom: 5px;
}
</style>
