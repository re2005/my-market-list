<template>
    <header>
        <div class="logo-wrapper">
            <div class="logo" />
            <h1>
                My Market List
            </h1>
        </div>

        <div v-if="!$isAPP">
            <div v-if="!config.guest"
                 class="user">
                <div class="name">
                    <Icon name="login"
                          size="md" />
                    {{config.user.email}}
                </div>

                <span
                    @click="openShare"
                    class="share">
                <Icon name="share"
                      size="xl" />
                </span>

                <button @click="logOut" class="button warn">
                <span v-if="!isLoading"
                      class="name">
                    <span>Logout</span>
                </span>

                    <Icon name="loading"
                          size="sm"
                          v-if="isLoading"
                          class="loading" />
                </button>
            </div>
        </div>
        <div v-else class="user" />
    </header>
</template>

<script>
    import firebase from 'firebase/app';
    import Icon from '../components/Icon';

    export default {
        name: 'UiHeader',
        data() {
            return {
                isLoading: false
            };
        },
        props: {
            config: {
                type: Object,
                required: true
            }
        },
        methods: {
            logOut() {
                this.isLoading = true;
                firebase.auth().signOut().then(() => {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1500);
                });
            },
            openShare() {
                this.$emit('open', 'share');
            }
            // change() {
            //     firebase.auth()
            //         .signInWithEmailAndPassword('rerere@gmail.com', 'UnchangedPassw0rd!!@#$%^&*()')
            //         .then(function (userCredential) {
            //             debugger;
            //             userCredential.user.updateEmail('newyou@domain.com');
            //         });
            // }
        },
        components: {
            Icon
        }
    };
</script>

<style scoped lang="scss">

    .logo-wrapper {
        background: url("../assets/images/background-main.svg") no-repeat bottom;
        background-size: 101%;
        background-color: #FFF7B4;
        position: relative;
        padding-top: 10px;

        .user & {
            background-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px 0;
            z-index: 10;
        }
    }

    .logo {
        background: url("../assets/images/my-market-list-logo.svg") no-repeat center;
        background-size: 100%;
        box-shadow: 0 11px 80px 0 #5DB502;
        border-radius: 100%;
        height: 90px;
        width: 90px;
        margin: auto;

        .user & {
            width: 40px;
            height: 40px;
            margin: inherit;
            margin-right: 10px;
        }
    }

    h1 {
        font-size: 2rem;
        color: white;
        padding-bottom: 30px;

        .user & {
            padding-bottom: 0;
        }
    }

    .user {
        margin-top: -30px;
        padding: 40px 20px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: white;
        position: relative;
        background-image: linear-gradient(-270deg, #200E37 0%, #390832 100%);

        .name {
            display: flex;
            align-items: center;

            i {
                margin-right: 4px;
            }
        }
    }

    .button {
        min-width: 100px;
        font-size: .8rem;
    }

    .share {
        margin-top: 4px;
        cursor: pointer;

        img {
            width: 26px;
        }
    }

</style>
