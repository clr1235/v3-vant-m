// eslint.config.mjs
import antfu from '@antfu/eslint-config';

export default antfu({
    stylistic: {
        indent: 4, // 4, or 'tab'
        quotes: 'single', // or 'double'
    },
    typescript: true,
    vue: true,
    jsonc: false,
    yaml: false,
    ignores: [
        '**/fixtures',
        'node_modules',
    ],

}, {
    // 指定文件的覆盖
    files: ['src/**/*.vue'],
    rules: {
        'vue/singleline-html-element-content-newline': 0,
    },
}, {
    // 全部文件的覆盖
    rules: {
        'style/semi': 0,
        'comma-dangle': 0,
    },
})
