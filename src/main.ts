import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import {$post,$get,$postForJson,$getPic} from './utils/axios';
import { AxiosInstance } from 'axios';
const app = createApp(App);

app.config.globalProperties.$post = $post;
app.config.globalProperties.$postForJson = $postForJson;
app.config.globalProperties.$get = $get;
app.config.globalProperties.$getPic = $getPic;
 

// 注册自定义类型
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $post?:AxiosInstance["post"];
    $get?:AxiosInstance["get"];
    $postForJson?:AxiosInstance["post"];
    $getPic?:AxiosInstance["get"];
  }
}

app.use(store);
app.use(router);
app.use(ElementPlus,{size:'mini'});
app.mount('#app');
