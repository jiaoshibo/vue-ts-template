import Axios from 'axios';
import {AxiosRequestConfig} from 'axios'
import {ElMessage} from 'element-plus';
import qs from 'qs'
let baseUrl:string;
if(process.env.NODE_ENV==='develop'){
  baseUrl ='/api/';
}else{
  let host = window.location.hostname;
  let protocol = window.location.protocol;
  let port = window.location.port;
  // baseUrl = `${protocol}://${host}:${port}/`
  baseUrl = 'https://api.github.com';
}

const axios = Axios.create({
  baseURL:baseUrl,
  timeout:20000
})

/**
 * 请求开始时的拦截器
 */
axios.interceptors.request.use(
  request=>{
    console.log('request:',request)
    if(request.method==='post'&&request.headers['Content-Type']==='application/x-www-form-urlencoded'){
      request.data = qs.stringify({
        ...request.data
      })
    }
    return request
  },
  error=>{
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response=>{
    return response
  },
  error=>{
    if(error.response && error.response.data){
      const code = error.response.status;
      const msg = error.response.data.message;
      ElMessage.error(msg)
      console.error(`[Axios Error]`, error.response)
    }else{
      console.error(`${error}`)
    }
    return Promise.reject(error)
  }
)


/**
 * 封装 axios 请求方法
 */
export const $post = async function(url:string,params?: any,config:AxiosRequestConfig={ headers: {'Content-Type': 'application/x-www-form-urlencoded'}}){
  try {
    return new Promise((resolve, _reject) => {
      axios.post(url, params, config).then(res => {
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
export const $postForJson = async (url:string,params?:{[key:string]:any},config:AxiosRequestConfig={headers: {'Content-Type': 'application/json'}})=>{
  try {
    return new Promise((resolve, _reject) => {
      axios.post(url, params, config).then(res => {
        resolve(res);
      }).catch(err => {
        console.error(err);
      });
    });
  } catch (err_1) {
    console.error(err_1);
  }
}

export const $get = async (url:string,config?:AxiosRequestConfig)=>{
  try {
    return new Promise((resolve, _reject) => {
      axios.get(url,config).then(res => {
        resolve(res);
      }).catch(err => {
        console.error(err);
      });
    });
  } catch (err_1) {
    console.error(err_1);
  }
}
