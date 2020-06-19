import axios from 'axios'
import {MessageBox} from 'element-ui'
import {errorMessage, successMsg, errorMsg} from '@/utils/EUI'
import {isEmpty} from "@/utils/common";
import router from '@/router'
import store from '@/store'

let errorStatus = null;

const service = axios.create({
  timeout: 20000,
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true
});

service.interceptors.request.use( //请求拦截
  config => { //成功
    let token = store.getters.token;
    let url = config.url;
    if (isAddToken(url)) {
      config.headers.Authorization = token
    }
    return config
  },
  error => { //错误
    errorMessage('请求错误！');
    return Promise.reject(error)
  }
);

service.interceptors.response.use( //响应拦截
  response => { //成功
    const {message, status} = response.data;
    if (!isEmpty(message) && status === 200) {
      successMsg(message)
    }
    if (!isEmpty(message) && status !== 200) {
      errorMsg(message)
    }
    return response
  },
  error => { //错误
    /* 请求超时！*/
    if (error.toString().includes('timeout')) {
      errorMessage('请求超时！');
      return Promise.reject(error)
    }
    /* 网络错误！ */
    let statusText = '';
    try {
      statusText = error.response.statusText
    } finally {
      if (statusText === 'Internal Server Error') {
        errorMessage('网络错误，请检查您的网络状况！')
      }
    }
    const {status, message} = error.response.data;
    /* 401 */
    if (status === 401) {
      if (errorStatus === status) return;
      errorStatus = status;
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        router.push({name: 'login'})
      }).catch(() => errorStatus = null)
    }
    /* 403 */
    else if (status === 403) {
      router.push({name: 'error403'})
    }
    /* elseStatus */
    else {
      if (!isEmpty(message)) errorMsg(message);
    }
    return Promise.reject(error)
  }
);

/**
 * @description 白名单，不添加token的接口
 * */
const isAddToken = url => ["common/login"].every(item => url !== item);

export default service;