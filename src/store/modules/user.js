import UserService from '@/services/UserService.js'

export const namespaced = true

export const state = {
  users: [],
  usersTotal: 0,
  user: {},
  perPage: 6
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
  }
}

export const actions = {
  createUser({ commit, dispatch }, user) {
    return UserService.postUser(user)
      .then(() => {
        commit('ADD_EVENT', user)
        commit('SET_EVENT', user)
        const notification = {
          type: 'success',
          message: 'Your user has been created!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your user: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
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
  fetchUser({ commit, getters, state }, id) {
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
  }
}