<template>
    <div class='component second'>

        <span @click='close'
              class='close'>
            <img src='@/assets/icons/icon-close.svg' />
        </span>

        <form @submit='share'
              autocomplete='on'>

            <div class='inputs'>
                <span>{{user.email}}</span>

                <label v-if="!shortUrl">
                    Please confirm your password
                    <input type='password'
                           ref="password"
                           v-model='password'
                           placeholder='password'
                           autocomplete='password'>
                </label>
            </div>

            <div v-if='shortUrl'
                 class="short-url">
                <p>
                    This link grant access to your list
                </p>
                <p class="url">{{shortUrl}}</p>

                <div class="actions">
                    <span @click="copyText">
                        <img src="@/assets/icons/icon-copy.svg"
                             alt="Copy"
                             class="whatsapp" />
                    </span>

                    <a :href="getWhatsappUrl()"
                       data-action="share/whatsapp/share">
                        <img src="@/assets/icons/icon-whatsapp-white.svg"
                             alt="Share via Whatsapp"
                             class="whatsapp" />
                    </a>
                </div>
            </div>

            <button @click='share'
                    :disabled="!this.password"
                    v-if='!shortUrl'
                    class='button primary'>

                <span v-if="!isLoading"
                      class="name">
                    <img src="@/assets/icons/icon-link.svg"
                         alt='Generate link'
                         class="icon" />
                    <span>Generate link</span>
                </span>

                <img src="@/assets/icons/icon-loading.svg"
                     v-if="isLoading"
                     class="loading" />

            </button>
        </form>
    </div>
</template>

<script>
    import SimpleCrypto from 'simple-crypto-js';
    import config from '../config';

    export default {
        name: 'LogIn',
        data() {
            return {
                email: '',
                password: '',
                error: undefined,
                shortUrl: undefined,
                isLoading: false
            };
        },
        props: {
            user: {
                type: Object,
                required: true
            }
        },

        mounted() {
            if (this.$refs.password) {
                this.$nextTick(() => {
                    this.$refs.password.focus();
                });
            }
        },
        computed: {
            url() {
                const _secretKey = 'some-unique-key';
                const simpleCrypto1 = new SimpleCrypto(_secretKey);
                const plainText = this.user.email + ';' + this.password;
                return this.makeUrl(simpleCrypto1.encrypt(plainText));
            }
        },
        methods: {
            copyText() {
                const el = document.createElement('textarea');
                el.value = this.shortUrl;
                el.setAttribute('readonly', '');
                el.style.position = 'absolute';
                el.style.left = '-9999px';
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
            },
            getWhatsappUrl() {
                return 'whatsapp://send?text=Here is the link to access my list: ' + encodeURIComponent('https://' + this.shortUrl);
            },
            makeUrl(secret) {
                let url = new URL('https://my-market-list.firebaseapp.com');
                url.searchParams.append('key', secret);
                return url;
            },
            close() {
                this.$emit('close');
            },
            replace(message) {
                return message.replace(/email address|user/g, 'list name');
            },
            async share(ev) {
                ev.preventDefault();
                this.isLoading = true;

                let linkRequest = {
                    destination: this.url.href
                };

                let requestHeaders = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'apikey': config.rebrandlyKey
                };

                let {shortUrl} = await fetch('https://api.rebrandly.com/v1/links', {
                        method: 'POST',
                        headers: requestHeaders,
                        body: JSON.stringify(
                            linkRequest
                        )
                    }
                ).then(response => response.json());

                this.shortUrl = shortUrl;
                this.isLoading = false;
            }
        }
    };
</script>

<style lang='scss' scoped>

    .button {
        &:disabled {
            cursor: not-allowed;
        }
    }

    .short-url {
        .url {
            border-radius: 8px;
            display: inline-block;
            margin: 15px 0 0 0;
            padding: 10px 20px;
            border: 1px solid #7b2099;
        }

        .actions {
            display: flex;
            align-content: center;
            justify-content: center;

            img {
                cursor: pointer;
                width: 24px;
                margin: 20px 10px 0;
            }
        }
    }

    .inputs {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        span {
            border-radius: 8px;
            padding: 10px 20px;
            display: block;
            border: 1px solid #35996f;
            margin: 0 0 20px 0;
        }
    }
</style>
