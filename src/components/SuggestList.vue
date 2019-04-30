<template>
    <div>
        <ul class="suggest-list"
            v-if="suggests.length !== 0">
            <li
                v-for="(suggest, index) in suggests"
                :key="index"
                @click="addItem(suggest)">
                {{ suggest }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'SuggestList',
        props: {
            suggestsList: {
                type: [Array, Object],
                required: true
            },
            item: {
                type: String
            },
            user: {
                type: Object,
                required: true
            }
        },
        methods: {
            addItem(suggest) {
                this.$emit('addItem', suggest);
            }
        },
        computed: {
            suggests() {
                if (!this.item || this.item.length < 2) return [];
                let suggest = [];
                const query = this.item.toLowerCase();
                for (let item in this.suggestsList) {
                    if (this.suggestsList.hasOwnProperty(item) && item.toLowerCase().indexOf(query) !== -1) suggest.push(item);
                }
                return suggest;
            }
        }
    };
</script>

<style scoped lang="scss">
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
</style>
