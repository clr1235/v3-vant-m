// eslint.config.mjs
import antfu from '@antfu/eslint-config'


const conf = antfu({
    // enable UnoCSS support
    // https://unocss.dev/integrations/vscode
    unocss: true,
    typescript: true,
    vue: true,
    ignores: [
        '.github',
    ],
})
console.log(conf, 'data=s=s=s=s=')

export default conf
