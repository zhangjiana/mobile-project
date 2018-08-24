import Vue from 'vue'
import App from './App.vue'
// import pull from './assets/js/pull';
import pullDown from './assets/js/pullDown';
import scrollRefresh from './assets/js/scrollRefresh';
import './assets/js/set'
Vue.config.productionTip = false
// Vue.use(pull);
Vue.use(pullDown);
Vue.use(scrollRefresh);
new Vue({
  render: h => h(App)
}).$mount('#app')
