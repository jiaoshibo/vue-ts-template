import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// vuex
import store from './store'

// axios 请求方法

// 全局css
import '@/assets/styles/index.css'

const app = createApp(App);

/* app.config.globalProperties.$post = $post;
app.config.globalProperties.$postForJson = $postForJson;
app.config.globalProperties.$get = $get;
 

// 注册自定义类型
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $post:typeof $post;
    $get:typeof $get;
    $postForJson:typeof $postForJson
  }
} */


// 程序挂载
app.use(store);
app.use(router);
app.mount('#app');
