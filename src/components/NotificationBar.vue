<template>
  <div class="notification-bar" 
        :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },
  methods: {
    ...mapActions('notification', ['remove'])
  },
  mounted() {
    setTimeout(this.remove(this.notification), 5000)
  }
}
</script>

<style scoped>
.notification-bar {
  display: flex;
}
</style>
