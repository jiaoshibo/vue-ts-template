import Axios from 'axios';
import {ElMessage} from 'element-plus'
const baseUrl = 'https://api.github.com';

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