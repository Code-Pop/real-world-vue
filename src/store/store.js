import Vue from 'vue'
import Vuex from 'vuex'
import * as user_ from '@/store/modules/user_.js'
import * as user from '@/store/modules/user.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    user_,
    notification
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  }
})
