import UserService from '@/services/UserService.js'
export const SET_SEARCH = "SET_SEARCH"
export const namespaced = true

export const state = {
  users: [],
  usersTotal: 0,
  user: {},
  perPage: 6,
  search: '',
}

export const mutations = {
  ADD_EVENT(state, user) {
    state.users.push(user)
  },
  SET_EVENTS(state, users) {
    state.users = users
  },
  SET_EVENTS_TOTAL(state, usersTotal) {
    state.usersTotal = usersTotal
  },
  SET_EVENT(state, user) {
    state.user = user
  },
  SET_SEARCH(state, search) {
    state.search = search
  }
}

export const actions = {


  search({ commit }, search) {
    commit('SET_SEARCH', search)
  },
  fetchUsers({ commit, dispatch, state }, { page }) {
    return UserService.getUsers(state.perPage, page)
      .then(response => {
        commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching users: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchUser({ commit, getters, state }, id,) {
    if (id == state.user.id) {
      return state.user
    }

    var user = getters.getUserById(id)

    if (user) {
      commit('SET_EVENT', user)
      return user
    } else {
      return UserService.getUser(id).then(response => {
        commit('SET_EVENT', response.data)
        return response.data
      })
    }
  }
}
export const getters = {
  getUserById: state => id => {
    return state.users.find(user => user.id === id)
  },
  getUserBySearch: state => {
    return state.users.filter(user => user.name.toLowerCase().indexOf(state.search.toLowerCase()) > -1)
  }
}