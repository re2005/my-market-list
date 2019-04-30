<template>
    <section class="home"
             :class="{'open': isOpen, 'user':!isGuest}">

        <sign-up class="sign-up"
                 v-if="isVisible('signUp')"
                 @close="close" />

        <log-in class="log-in"
                v-if="isVisible('logIn')"
                @close="close" />

        <share-list class="share"
                    :user="getUser"
                    v-if="isVisible('share')"
                    @close="close" />

        <ui-header :config="{user: getUser, guest:isGuest}"
                   @open="open" />

        <div v-if="isGuest"
             class="guest-label">
            <p>
                This is an open list, you can add and remove items, or create your own list!
            </p>
            <button class="button primary"
                    @click="open('signUp')">
                Create my list
            </button>
            <button class="button slim"
                    @click="open('logIn')">
                Login
            </button>
        </div>

        <div class="add">
            <input v-model="item"
                   placeholder="Strawberries"
                   class="item"
                   @keyup.enter="addItem(item)" />
            <button @click="addItem(item)"
                    :disabled="!item">
                add
            </button>
        </div>

        <suggest-list
            :suggests-list="getSuggestList"
            @addItem="addItem"
            :item="item"
            :user="getUser"
        />

        <div v-if="isLoading">
            loading
        </div>
        <div v-else>
            <div v-if="getList.length === 0">
                Empty list :(
            </div>

            <ul v-else class="list">
                <li v-for="(item, key) in getList"
                    :key="key">
                    <span class="item">{{ item }}</span>
                    <span @click="removeItem(key, item)"
                          class="delete">

                        <Icon name="close"
                              size="xs" />

                    </span>
                </li>
            </ul>

        </div>

        <footer>
            <p>
                My Market List - Made with ❤ in Amsterdam
            </p>
            <a href="https://github.com/re2005/list-app"
               title="GitHub"
               target="_blank">

                <Icon name="github"
                      size="lg" />
            </a>
            <a href="whatsapp://send?text=Let's make a list together. Create an account and share password to update our list :) https%3A%2F%2Fmy-market-list.firebaseapp.com%2F"
               data-action="share/whatsapp/share">

                <Icon name="whatsapp"
                      size="lg" />
            </a>
        </footer>

    </section>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import firebaseApp from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/database';
    import UiHeader from '@/components/UiHeader';
    import SignUp from '@/components/SignUp';
    import LogIn from '@/components/LogIn';
    import ShareList from '@/components/ShareList';
    import SimpleCrypto from 'simple-crypto-js';
    import Icon from '@/components/Icon';
    import SuggestList from '@/components/SuggestList';

    export default {
        name: 'home',
        data() {
            return {
                item: undefined,
                isOpen: undefined,
                loading: false
            };
        },
        components: {
            UiHeader,
            SignUp,
            LogIn,
            ShareList,
            Icon,
            SuggestList
        },
        computed: {
            ...mapGetters([
                'getList',
                'getUser',
                'getSuggestList',
                'isLoading',
                'isGuest'
            ])
        },
        methods: {
            isVisible(what) {
                return this.isOpen === what;
            },
            close() {
                this.isOpen = undefined;
            },
            open(what) {
                this.isOpen = what;
                window.ga('send', {
                    hitType: 'event',
                    eventCategory: 'Navigation',
                    eventAction: 'Open',
                    eventLabel: what
                });
            },
            ...mapActions(['getListFromApi']),
            getTotal(suggest) {
                let current;
                if (!this.getSuggestList[suggest] || !this.getSuggestList[suggest].amount) {
                    current = 1;
                } else {
                    current = this.getSuggestList[suggest].amount + 1;
                }
                return current;
            },
            addItem(item) {
                const newItem = item;
                this.item = '';
                firebaseApp.database().ref(this.getUser.uid).child('list').push(newItem);

                let total = this.getTotal(newItem);
                firebaseApp.database().ref(this.getUser.uid).child('list_suggest').child(newItem)
                    .set(
                        {
                            value: newItem,
                            amount: total
                        }
                    );

                window.ga('send', {
                    hitType: 'event',
                    eventCategory: 'Navigation',
                    eventAction: 'AddItem',
                    eventLabel: newItem
                });
            },
            removeItem(key, name) {
                firebaseApp.database().ref(this.getUser.uid).child('list').child(key).remove();

                window.ga('send', {
                    hitType: 'event',
                    eventCategory: 'Navigation',
                    eventAction: 'RemoveItem',
                    eventLabel: name
                });
            },
            login(user) {
                firebaseApp.auth().signInWithEmailAndPassword(user[0] + '@gmail.com', user[1]).then(
                    (user) => {
                        console.log(user);
                    },
                    (err) => {
                        console.log('Error login', err);
                        // TODO Handle error when login from parameter
                    }
                );
            }
        },
        mounted() {
            let key = this.$route.query.key;
            if (!key) return;
            const _secretKey = 'some-unique-key';
            const simpleCrypto1 = new SimpleCrypto(_secretKey);
            this.login(simpleCrypto1.decrypt(key).split(';'));
        }
    };
</script>

<style lang="scss" scoped>

    .home {
        transition: transform .2s ease-in-out;

        &.open {
            transform: translateY(200px);
            background: white;
            min-height: 100%;
            height: 100%;
        }
    }

    .guest-label {
        z-index: -1;
        padding: 30px 20px 10px;
        background-color: #FFF7B4;

        .button {
            display: block;
            margin: auto;
            font-size: 1rem;

            &.primary {
                margin: 20px auto 6px;
            }
        }

        p {
            max-width: 300px;
            margin: auto;
        }
    }

    .add {
        margin: 20px 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .item {
            background: #F3F3F3;
            border-radius: 0;
            border-bottom-left-radius: 19.5px;
            border-top-left-radius: 19.5px;
            padding-left: 20px;
            font-family: 'Dosis', sans-serif;

            &::placeholder {
                color: #CFCECE;
            }
        }

        button {
            margin-left: -2px;
            color: white;
            border: none;
            font-weight: bold;
            font-size: 1rem;
            padding: 9.6px 14px;
            border-bottom-right-radius: 19.5px;
            border-top-right-radius: 19.5px;
            background-image: linear-gradient(-180deg, #68CD1C 0%, #529E04 100%);

            &:disabled {
                cursor: not-allowed;
            }
        }
    }

    .suggest-list {
        background: #F5F5F5;
        border: 1px solid #e5e6e9;
        list-style: none;
        text-align: left;
        padding: 0;
        max-height: 174px;
        overflow: auto;
        max-width: 260px;
        margin: 10px auto;

        li {
            border-bottom: 1px solid #dfe0e3;
            padding: 10px;
            cursor: pointer;

            &:last-child {
                border: none;
            }
        }
    }

    .list {
        list-style: none;
        margin: 20px auto;
        padding: 0 0 40px;
        display: flex;
        flex-direction: column-reverse;
        max-width: 300px;

        li {
            flex: 1;
            margin: 10px 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 0 0 10px;
            line-height: 1.4rem;
            border-radius: 8px;
            overflow: hidden;
            align-items: center;
            background: #FFFFFF;
            border: 1px solid #D8D8D8;

            .item {
                max-width: 80%;
                text-align: left;
                word-break: break-word;
            }

            .delete {
                background: #FF0C38;
                border-radius: 8px;
                margin: 10px;
                width: 26px;
                height: 26px;
                color: white;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

    footer {
        height: 200px;
        display: block;
        margin: 20px 0;

        p {
            font-size: .9rem;
        }

        i {
            width: 24px;
            margin: 20px 5px;
        }
    }
</style>
