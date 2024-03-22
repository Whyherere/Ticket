import { createStore } from 'vuex'
import { userState } from './userState'
import { ticketState } from './ticketStat'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: userState,
    ticket: ticketState
  }
})
