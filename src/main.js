import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase/app';
import config from './config';
import FastClick from 'vue-fastclick';

FastClick.attach(document.body);

firebase.initializeApp(config);
Vue.config.productionTip = false;
let app = '';

firebase.auth().onAuthStateChanged(data => {
    if (!firebase.auth().currentUser && window.location.search.indexOf('key') === -1) {
        firebase.auth().signInWithEmailAndPassword('guest@gmail.com', '!@#$%^&*').then(
            (user) => {
                console.log(user);
            },
            (err) => {
                alert('Oops. ' + err.message);
            }
        );
    }

    store.dispatch('updateUser', data);
    store.dispatch('getListFromApi');

    if (!app) {
        /* eslint-disable no-new */
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');
    }
});
