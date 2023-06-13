import { createStore } from 'vuex'

export default createStore({
  state: {
    $nowUser: {
      username: '111',
      email: '',
      image: ''
    }
  },
  getters: {
  },
  mutations: {
    LoginUser (state, payload) {
      state.$nowUser.username = payload.username
      state.$nowUser.email = payload.email
      state.$nowUser.image = payload.image
    }
  },
  actions: {
  },
  modules: {
  }
})
