import { ConfigProvider } from 'vant';
import { createApp } from 'vue';

import router from '@/router';
import pinia from '@/stores';
import 'virtual:uno.css';
import App from './App.vue';

/* --------------------------------
Vant 中有个别组件是以函数的形式提供的，
包括 Toast，Dialog，Notify 和 ImagePreview 组件。
在使用函数组件时，unplugin-vue-components
无法自动引入对应的样式，因此需要手动引入样式。
------------------------------------- */
import 'vant/es/dialog/style';
import 'vant/es/image-preview/style';
import 'vant/es/notify/style';
import 'vant/es/toast/style';

const app = createApp(App);

app.use(ConfigProvider)
app.use(router)
app.use(pinia)

app.mount('#app')
