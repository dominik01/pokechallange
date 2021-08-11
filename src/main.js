import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export const pokeApiUrl = 'https://pokeapi.co/api/v2'

Vue.config.productionTip = false
Vue.use(IconsPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
