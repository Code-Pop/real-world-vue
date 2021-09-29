<template>
  <div>
    <UserCard v-for="user in user.users" :key="user.id" :user="user" />

    <template v-if="page != 1">
      <router-link
        :to="{ name: 'user-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page</router-link
      >
      <template v-if="hasNextPage"> | </template>
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'user-list', query: { page: page + 1 } }"
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


