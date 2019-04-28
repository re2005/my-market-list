<template>
    <div class="component second">

        <span @click="close"
              class="close">
            <icon name="close" size="xl" />
        </span>

        <form @submit="login"
              autocomplete="on">
            <input type="text"
                   ref="email"
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

                    <Icon name="login-open"
                          size="sm"
                          class="icon" />

                    <span>Login</span>
                </span>

                <Icon name="loading"
                      size="sm"
                      v-if="isLoading"
                      class="loading" />
            </button>
        </form>
    </div>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import Icon from '@/components/Icon';

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
        mounted() {
            if (this.$refs.email) {
                this.$nextTick(() => {
                    this.$refs.email.focus();
                });
            }
        },
        components: {
            Icon
        },
        methods: {
            close() {
                this.$emit('close');
            },
            replace(message) {
                return message.replace(/email address|user/g, 'list name');
            },
            login(ev) {
                ev.preventDefault();
                this.isLoading = true;
                firebase.auth().signInWithEmailAndPassword(this.email + '@gmail.com', this.password).then(
                    (user) => {
                        this.$emit('close');

                        window.ga('send', {
                            hitType: 'event',
                            eventCategory: 'Action',
                            eventAction: 'UserLogged',
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
