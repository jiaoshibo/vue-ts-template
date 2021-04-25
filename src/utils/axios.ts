import Axios from 'axios';
import {ElMessage} from 'element-plus';

let baseUrl:string;
if(process.env.NODE_ENV==='development'){
  baseUrl = '/api/'
}else{
  let host = window.location.hostname;
  let protocol = window.location.protocol;
  let port = window.location.port;
  baseUrl = `${protocol}://${host}:${port}/`
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
export default axios;