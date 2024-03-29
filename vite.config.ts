import { VantResolver } from '@vant/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'node:path';
import process from 'node:process';
import viewport from 'postcss-mobile-forever';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import type { ConfigEnv, UserConfig } from 'vite';
import { loadEnv } from 'vite';

export default ({ mode }: ConfigEnv): UserConfig => {
    const root = process.cwd()
    const env = loadEnv(mode, root)

    return {
        base: env.VITE_APP_PUBLIC_PATH,
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
        server: {
            host: true,
            port: 3000,
            proxy: {
                '/api': {
                    target: '',
                    ws: false,
                    changeOrigin: true,
                },
            },
        },
        resolve: {
            alias: {
                '~@': path.join(__dirname, './src'),
                '@': path.join(__dirname, './src'),
                '~': path.join(__dirname, './src/assets'),
            },
        },
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
        build: {
            cssCodeSplit: false,
            chunkSizeWarningLimit: 2048,
        },
    }
}
