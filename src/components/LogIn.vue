<template>
    <div class="component second">

        <span @click="close"
              class="close">
            <img src="@/assets/icons/icon-close.svg" />
        </span>

        <form @submit="login"
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

            <button @click="login"
                    class="button primary">

                <span v-if="!isLoading"
                      class="name">
                    <img src="@/assets/icons/icon-login-open.svg"
                         class="icon" />
                    <span>Login</span>
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
        name: 'LogIn',
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
                return message.replace(/email|address|user/g, 'list name');
            },
            login: function (ev) {
                ev.preventDefault();
                this.isLoading = true;
                firebase.auth().signInWithEmailAndPassword(this.email + '@gmail.com', this.password).then(
                    (user) => {
                        this.$emit('close');
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
