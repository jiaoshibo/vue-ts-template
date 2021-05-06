import Axios from 'axios';
import {ElMessage} from 'element-plus';
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
  response=>{
    return response
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
const formDataRequestHeader = {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded'};
const jsonRequestHeader = {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json'}
export const $post = async function(url:string,params?: any){
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
export const $postForJson = async (url:string,params?:{[key:string]:any})=>{
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

export const $get = async (url:string)=>{
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

export const $getPic = async (url:string)=>{
  return new Promise((resolve,reject)=>{
    axios.get(url,{responseType:'arraybuffer'}).then(res=>{
      resolve(res);
    }).catch(err=>{
      console.error(err)
    })
  }).catch(reason=>{
    console.error(reason);
  })
}
