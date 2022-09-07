import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/index.css'
import VueSession from 'vue-session'
import './css/style.scss'

Vue.config.productionTip = false

var options = {
  persist: true
}
Vue.use(VueSession, options)


new Vue({
  router,
  store,
  vuetify,
  options,
  render: h => h(App)
}).$mount('#app')
