// eslint.config.mjs
import antfu from '@antfu/eslint-config'


const data = antfu({
    // enable UnoCSS support
    // https://unocss.dev/integrations/vscode
    unocss: true,
    ignores: [
        '.github',
    ],
})
console.log(data, 'data=s=s=s=s=')

export default data
