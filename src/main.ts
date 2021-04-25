import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import axios from './utils/axios';
import { AxiosInstance } from 'axios';
const app = createApp(App);

/**
 * 封装 axios 请求方法
 */
const formDataRequestHeader = {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded'};
const jsonRequestHeader = {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json'}
app.config.globalProperties.$post = async function(url:string,params?: any){
  try {
    return new Promise((resolve, _reject) => {
      axios.post(url, params, { headers: formDataRequestHeader }).then(res => {
        // 处理请求结果
        resolve(res);
      }).catch(err => {
        console.error(err);
      });
    });
  } catch (err_1) {
    console.error(err_1);
  }
};
app.config.globalProperties.$postForJson = async (url:string,params?:{[key:string]:any})=>{
  try {
    return new Promise((resolve, _reject) => {
      axios.post(url, params, { headers: jsonRequestHeader }).then(res => {
        resolve(res);
      }).catch(err => {
        console.error(err);
      });
    });
  } catch (err_1) {
    console.error(err_1);
  }
}

app.config.globalProperties.$get = async (url:string)=>{
  try {
    return new Promise((resolve, _reject) => {
      axios.get(url).then(res => {
        resolve(res);
      }).catch(err => {
        console.error(err);
      });
    });
  } catch (err_1) {
    console.error(err_1);
  }
}

// 注册自定义类型
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $post?:AxiosInstance;
    $get?:AxiosInstance;
    $postForJson?:AxiosInstance;
  }
}

app.use(store);
app.use(router);
app.use(ElementPlus,{size:'mini'});
app.mount('#app');
