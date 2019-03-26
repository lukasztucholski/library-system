/* eslint-disable no-console */
/* eslint-disable no-new */
/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import Vue from 'vue';
import router from './router';
import App from './App.vue';
import './style.scss';

Vue.config.productionTip = false;

export const eventBus = new Vue({
  data: {
    isLogged: false,
    user: {},
    cartContent: [],
  },
  created() {
    this.$on('addToCart', (book) => {
      this.cartContent.push(book);
      this.$emit('updateCart', this.cartContent);
    });
    this.$on('changeLoggedStatus', (updatedUserInfo) => {
      this.isLogged = updatedUserInfo.status;
      this.user = updatedUserInfo.user;
    });
    this.$on('clearCart', () => {
      this.cartContent = [];
      this.$emit('updateCart', this.cartContent);
    });
  },
});

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
    // console.log(user);
    // console.log(user.providerData);
    firebase.firestore().collection('users').doc(`${user.uid}`).get()
      .then((userFromDB) => {
        if (userFromDB.exists) {
          eventBus.$emit('changeLoggedStatus', {
            status: true,
            user: userFromDB.data(),
          });
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  } else {
    eventBus.$emit('changeLoggedStatus', {
      status: false,
      user: {},
    });
  }
});

new Vue({
  el: '#App',
  router,
  components: { App },
  template: '<App/>',
});
