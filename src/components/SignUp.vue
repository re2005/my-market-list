<template>
    <div class="component first">

        <span @click="close"
              class="close">
            <img src="@/assets/icons/icon-close.svg" />
        </span>

        <form @submit="signUp"
              autocomplete="on">
            <input type="text"
                   v-model="email"
                   placeholder="list-name"
                   autocomplete="username">

            <input type="password"
                   v-model="password"
                   placeholder="password"
                   autocomplete="password">

            <span class="error">
                {{error}}
            </span>

            <button @click="signUp"
                    class="button primary">
                <span v-if="!isLoading"
                      class="name">
                    <img src="@/assets/icons/icon-signup.svg"
                         class="icon" />
                    <span>Create</span>
                </span>

                <img src="@/assets/icons/icon-loading.svg"
                     v-if="isLoading"
                     class="loading" />
            </button>
        </form>

    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';

    export default {
        name: 'SignUp',
        data() {
            return {
                email: '',
                password: '',
                error: undefined,
                isLoading: false
            };
        },
        methods: {
            close() {
                this.$emit('close');
            },
            replace(message) {
                return message.replace(/email address|user/g, 'list name');
            },
            signUp: function (ev) {
                ev.preventDefault();
                this.isLoading = true;
                let email = this.email + '@gmail.com';
                firebase.auth().createUserWithEmailAndPassword(email, this.password).then(
                    (user) => {
                        this.$router.push({name: 'home'});
                        this.$emit('close');

                        window.ga('send', {
                            hitType: 'event',
                            eventCategory: 'Action',
                            eventAction: 'UserCreated',
                            eventLabel: this.email
                        });
                    },
                    (err) => {
                        this.isLoading = false;
                        this.error = this.replace(err.message);
                    }
                );
            }
        }
    };
</script>
