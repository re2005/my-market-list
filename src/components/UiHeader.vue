<template>
    <header>
        <div class="logo-wrapper">
            <img src="../assets/images/my-market-list-logo.svg"
                 class="logo">
            <h1>
                My Market List
            </h1>
        </div>
        <div v-if="!config.guest"
             class="user">
            <div class="name">
                <img src="../assets/icons/icon-login.svg">{{config.user.email}}
            </div>

            <span @click="openShare"
                  class="share">
                <img src="../assets/icons/icon-share.svg">
            </span>

            <button @click="logOut" class="button warn">
                <span v-if="!isLoading"
                      class="name">
                    <span>Logout</span>
                </span>

                <img src="@/assets/icons/icon-loading.svg"
                     v-if="isLoading"
                     class="loading" />
            </button>
        </div>
    </header>
</template>

<script>
    import firebase from 'firebase/app';

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
        }
    };
</script>

<style scoped lang="scss">

    .logo-wrapper {
        background: url("../assets/images/background-main.svg") no-repeat bottom;
        background-size: 101%;
        background-color: #FFF7B4;

        .user & {
            background-color: transparent;
        }

        .user & {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px 0;
        }
    }

    .logo {
        border: 2px solid #68C20C;
        box-shadow: 0 11px 80px 0 #5DB502;
        border-radius: 100%;

        .user & {
            width: 40px;
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

        &:before {
            content: '';
            background-image: linear-gradient(-270deg, #200E37 0%, #390832 100%);
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            z-index: -1;
        }

        .name {
            display: flex;
            align-items: center;

            img {
                margin-right: 10px;
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
