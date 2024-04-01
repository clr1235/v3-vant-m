import { VantResolver } from '@vant/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'node:path';
import process from 'node:process';
import viewport from 'postcss-mobile-forever';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite';
import type { ConfigEnv, UserConfig } from 'vite';
import { loadEnv } from 'vite';
import Layouts from 'vite-plugin-vue-layouts';

import legacy from '@vitejs/plugin-legacy';

// vite-plugin-compression 插件可开启gzip压缩

export default ({ mode }: ConfigEnv): UserConfig => {
    const root = process.cwd()
    const env = loadEnv(mode, root)

    return {
        base: env.VITE_APP_PUBLIC_PATH,
        plugins: [
            // 此项必须放在vue()之前   https://github.com/posva/unplugin-vue-router
            VueRouter({
                extensions: ['.vue'],
                routesFolder: 'src/pages',
                dts: 'src/typed-router.d.ts',
            }),
            vue(),
            // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
            Layouts(),
            AutoImport({
                resolvers: [VantResolver()],
                imports: [
                    'vue',
                    VueRouterAutoImports,
                    {
                        // add any other imports you were relying on
                        'vue-router/auto': ['useLink'],
                    },
                ],
            }),
            Components({
                resolvers: [VantResolver()],
            }),
            UnoCSS(),
            // 添加对旧版本浏览器的支持
            legacy({
                targets: ['defaults', 'not IE 11'],
            }),
        ],
        server: {
            host: true,
            // port: 3000,
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
            rollupOptions: {
                output: {
                    chunkFileNames: "static/js/[name]-[hash].js",
                    entryFileNames: "static/js/[name]-[hash].js",
                    assetFileNames: "static/[ext]/[name]-[hash].[ext]"
                }
            }
        },
    }
}
