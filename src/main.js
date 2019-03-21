/* eslint-disable no-new */
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import Vue from 'vue';
import router from './router';
import App from './App.vue';
import './style.scss';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyB7YHlcqqiFWdMcO8xfNM21prjcNCBfvbE',
  authDomain: 'library-system-vuejs.firebaseapp.com',
  databaseURL: 'https://library-system-vuejs.firebaseio.com',
  projectId: 'library-system-vuejs',
  storageBucket: 'library-system-vuejs.appspot.com',
  messagingSenderId: '467782326362',
};
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('main js zalogowany');
  } else {
    console.log('main js niezalogowany');
  }
});

// eslint-disable-next-line import/prefer-default-export
export const eventBus = new Vue();

new Vue({
  el: '#App',
  router,
  components: { App },
  template: '<App/>',
});
