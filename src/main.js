import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseIcon from '@/components/BaseIcon'

Vue.component('BaseIcon', BaseIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
