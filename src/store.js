import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        list: [],
        list_suggest: [],
        isLoading: false,
        user: {}
    },
    getters: {
        getList: state => state.list || [],
        getSuggestList: state => state.list_suggest || [],
        isLoading: state => state.isLoading,
        getUser: state => state.user,
        isGuest: state => state.user.email === 'guest'
    },
    mutations: {
        updateLists(state, value) {
            state.list = [];
            state.list_suggest = [];
            if (!value) return;
            state.list = value.list;
            state.list_suggest = value.list_suggest;
        },
        updateUser(state, value) {
            if (!value) return;
            state.user = {
                uid: value.uid,
                email: value.email.replace('@gmail.com', '')
            };
        }
    },
    actions: {
        updateUser({commit}, value) {
            commit('updateUser', value);
        },
        getListFromApi({state, commit}) {
            state.isLoading = true;
            return firebase
                .database()
                .ref(state.user.uid)
                .on('value', snapshot => {
                    state.isLoading = false;
                    commit('updateLists', snapshot.val());
                });
        }
    }
});
