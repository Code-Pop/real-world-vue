<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <p>{{ getEvent(1) }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user', 'categories']),
    getEvent(id) {
      return this.$store.getters.getEventById(id)
    }
  }
}
</script>

<style scoped>
</style>
