import NProgress from 'nprogress';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router/auto';

NProgress.configure({ showSpinner: true, parent: '#app' })
const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
    extendRoutes: (routes) => {
        return setupLayouts(routes)
    },
})

router.beforeEach(() => {
    NProgress.start()
})

router.afterEach(() => {
    NProgress.done()
})

export default router;
