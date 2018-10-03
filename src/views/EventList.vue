<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">
      Prev Page</router-link>
      <template v-if="isLastPage"> | </template>
    </template>
    <template v-if="isLastPage">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">
      Next Page</router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  created() {
    this.perPage = 3 // Setting perPage here and not in data means it won't be reactive
    // We don't need it to be reactive.

    this.$store.dispatch('fetchEvents', {
      perPage: this.perPage,
      page: this.page
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    isLastPage() {
      return this.eventsTotal > this.page * this.perPage
    },
    ...mapState(['events', 'eventsTotal'])
  }
}
</script>
