import { VantResolver } from '@vant/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import viewport from 'postcss-mobile-forever';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [VantResolver()],
        }),
        Components({
            resolvers: [VantResolver()],
        }),
        UnoCSS(),
    ],
    css: {
        postcss: {
            plugins: [
                autoprefixer(),
                viewport({
                    appSelector: '#app',
                    viewportWidth: file => file.includes('vant') ? 375 : 750,
                    maxDisplayWidth: 600,
                }),
            ],
        },
    },
})
