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
Vue.prototype.$isAPP = window.isAPP;

firebase.auth().onAuthStateChanged(data => {
    if (!firebase.auth().currentUser && window.location.search.indexOf('key') === -1 && !window.isAPP) {
        firebase.auth().signInWithEmailAndPassword('guest@gmail.com', '!@#$%^&*').then(
            (user) => {
                console.log(user);
            },
            (err) => {
                alert('Oops. ' + err.message);
            }
        );
    }

    if (!firebase.auth().currentUser && window.isAPP) {
        const config = {
            user: Date.now() + '@gmail.com',
            password: 'UnchangedPassw0rd!!@#$%^&*()'
        };
        firebase.auth().createUserWithEmailAndPassword(config.user, config.password).then(
            (user) => {
                window.ga('send', {
                    hitType: 'event',
                    eventCategory: 'Action',
                    eventAction: 'UserCreated',
                    eventLabel: user.email
                });
            });
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
