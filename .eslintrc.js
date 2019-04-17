module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': [
            2,
            'always'
        ],
        'indent': 'off',
        'space-before-function-paren': [
            'error', {'anonymous': 'ignore', 'named': 'never'}
        ],
        'object-curly-spacing': ["error", "never"],
        'generator-star-spacing': 'off',
        'no-mixed-operators': 'off',
        'vue/html-indent': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
