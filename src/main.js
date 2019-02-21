/* eslint-disable no-new */
import Vue from 'vue';
import router from './router';

import App from './App.vue';
import './style.scss';

Vue.config.productionTip = false;

new Vue({
  el: '#App',
  router,
  components: { App },
  template: '<App/>',
});
