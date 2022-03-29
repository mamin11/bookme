import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './assets/index.css'
import VueSession from 'vue-session'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// import {TimePicker} from 'ant-design-vue'
// Vue.component(TimePicker.name, TimePicker)

Vue.config.productionTip = false

var options = {
  persist: true
}
Vue.use(Antd)
Vue.use(Buefy)
Vue.use(VueSession, options)


new Vue({
  router,
  store,
  vuetify,
  options,
  render: h => h(App)
}).$mount('#app')
