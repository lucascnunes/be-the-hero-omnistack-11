import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueIziToast from 'vue-izitoast'
import 'izitoast/dist/css/iziToast.min.css';

import { store } from './store'

import App from './App.vue'

import router from './router'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'http://localhost:3333'
Vue.axios.defaults.withCredentials = true

Vue.use(VueIziToast);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
