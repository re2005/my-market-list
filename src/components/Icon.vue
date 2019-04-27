<template>
    <!-- eslint-disable vue/no-v-html -->
    <i
        class="root"
        :class="size"
        v-on="$listeners"
        v-html="require(`!svg-inline-loader!../assets/icons/icon-${name}.svg`)"
    />
</template>

<script>
    export default {
        name: 'Icon',
        props: {
            name: {
                type: String,
                required: true
            },
            size: {
                type: String,
                required: false,
                default: 'md'
            }
        }
    };
</script>

<style lang="scss" scoped>
    .root {
        box-sizing: content-box;
        display: inline-block;
        font-size: 0;
    }

    .xs {
        height: .8rem;
        width: .8rem;
    }

    .sm {
        height: 1rem;
        width: 1rem;
    }

    .md {
        height: 1.2rem;
        width: 1.2rem;
    }

    .lg {
        height: 1.4rem;
        width: 1.4rem;
    }

    .xl {
        height: 1.6rem;
        width: 1.6rem;
    }

</style>
