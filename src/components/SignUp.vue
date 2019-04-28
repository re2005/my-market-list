<template>
    <div class="component first">

        <span @click="close"
              class="close">
            <icon name="close" size="xl" />
        </span>

        <form @submit="signUp"
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

            <button @click="signUp"
                    class="button primary">
                <span v-if="!isLoading"
                      class="name">
                        <Icon name="signup"
                              size="sm"
                              class="icon" />
                    <span>Create</span>
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
        name: 'SignUp',
        data() {
            return {
                email: '',
                password: '',
                error: undefined,
                isLoading: false
            };
        },
        components: {
            Icon
        },
        mounted() {
            if (this.$refs.email) {
                this.$nextTick(() => {
                    this.$refs.email.focus();
                });
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            replace(message) {
                return message.replace(/email address|user/g, 'list name');
            },
            signUp(ev) {
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
