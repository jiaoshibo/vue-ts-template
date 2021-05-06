import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import {$post,$get,$postForJson,$getPic} from './utils/axios';
import { AxiosResponse } from 'axios';
const app = createApp(App);

app.config.globalProperties.$post = $post;
app.config.globalProperties.$postForJson = $postForJson;
app.config.globalProperties.$get = $get;
app.config.globalProperties.$getPic = $getPic;
 
interface customAxios{
  post<T = any, R = AxiosResponse<T>>(url:string,data?:{[key:string]:any}): Promise<R>;
  get<T = any, R = AxiosResponse<T>>(url: string): Promise<R>;
}

// 注册自定义类型
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $post:customAxios["post"];
    $get:customAxios["get"];
    $postForJson:customAxios["post"];
    $getPic:customAxios["get"];
  }
}

app.use(store);
app.use(router);
app.use(ElementPlus,{size:'mini'});
app.mount('#app');
