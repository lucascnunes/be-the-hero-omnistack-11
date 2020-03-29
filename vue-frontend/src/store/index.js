import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        isLogged: false,
        ongName: null,
        expire_at: null,
        expired: false,
    },
    getters: {

    },
    mutations: {
        USER_LOGGED: (state, value) => {
            state.isLogged = value
        },
        SET_ONG_NAME: (state, name) => {
            state.ongName = name
        },
        SET_EXPIRE_TIME: (state, time) => {
            state.expire_at = time
        },
        SET_EXPIRED: (state, value) => {
            state.expired = value
        }
    },
    actions: {
        
    },
    plugins: [createPersistedState()],
})
  