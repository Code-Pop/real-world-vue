import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: []
    // For next lesson:
    // event: {}
    // Basic example:
    // count: 0
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    INCREMENT_COUNT(state, value) {
      state.count += value
    }
    // For next lesson:
    // SET_EVENTS(state, events) {
    //   state.events = events
    // },
    // SET_EVENT(state, event) {
    //   state.event = event
    // }
  },
  actions: {
    // Basic example:
    // updateCount({ state, commit }, value) {
    //   if (state.user) {
    //     commit('INCREMENT_COUNT', value)
    //   }
    // },
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(event => {
        commit('ADD_EVENT', event.data)
        return event
      })
    }
    // For next lesson:
    // fetchEvents({ commit }) {
    //   EventService.getEvents()
    //     .then(response => {
    //       commit('SET_EVENTS', response.data)
    //     })
    //     .catch(error => {
    //       console.log('There was an error:', error.response)
    //     })
    // },
    // fetchEvent({ commit }, id) {
    //   EventService.getEvent(id)
    //     .then(response => {
    //       commit('SET_EVENT', response.data)
    //     })
    //     .catch(error => {
    //       console.log('There was an error:', error.response)
    //     })
    // }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
