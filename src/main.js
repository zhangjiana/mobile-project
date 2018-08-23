import Vue from 'vue'
import App from './App.vue'
import pull from './assets/js/pull';
import './assets/js/set'
Vue.config.productionTip = false
Vue.use(pull);
new Vue({
  render: h => h(App)
}).$mount('#app')
