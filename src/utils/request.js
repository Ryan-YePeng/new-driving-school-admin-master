import axios from 'axios'
import qs from 'qs'
import {MessageBox} from 'element-ui'
import {errorMessage, successMsg, errorMsg} from '../utils/EUI'
import {isEmpty} from "../utils/common";
import router from '../router/index'
import store from '../store/index'

let errorCode = null;

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
      const {message} = response.data;
      if (message) successMsg(message);
      return response
    },
    error => { //错误
      /* 请求超时！*/
      if (error.toString().includes('timeout')) {
        errorMessage('请求超时！');
        return
      }
      /* 网络错误！ */
      let statusText = '';
      try {
        statusText = error.response.statusText = 'Internal Server Error';
      } finally {
        if (statusText === 'Internal Server Error') {
          errorMessage('网络错误，请检查您的网络状况！')
        }
      }
      const {code, message} = error.response.data;
      /* 401 */
      if (code === 401) {
        if (message.length < 15) {
          errorMessage(message)
        } else {
          if (errorCode === code) return;
          errorCode = code;
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
          }).catch(() => errorCode = null)
        }
      }
      /* 403 */
      else if (code === 403) {
        router.push({name: 'error403'})
      }
      /* elseCode */
      else {
        if (isEmpty(message)) errorMsg(message);
      }
      return Promise.reject(error)
    }
);

/**
 * @param {String} url 请求地址
 * @description get
 * */
export const axiosG = url => {
  return new Promise((resolve, reject) => {
    service({
      method: 'get',
      url: url
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
};
/**
 * @param {String} url 请求地址
 * @description delete，删除单条数据。
 * */
export const axiosd = url => {
  return new Promise((resolve, reject) => {
    service({
      method: 'delete',
      url: url
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
};
/**
 * @param {String} url 请求地址
 * @param {Array} param [1, 2, 3]
 * @description delete，删除多条数据。
 * */
export const axiosds = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'delete',
      url: `${url}/${param.join(',')}`
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
};
/**
 * @param {String} url 请求地址
 * @param {Object} param {name: LiHua, age: 18}
 * @description post，键值对格式。
 * */
export const axiosK = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url: url,
      data: param,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [(data) => {
        return qs.stringify(data)
      }]
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
};
/**
 * @param {String} url 请求地址
 * @param {Object} param {name: LiHua, age: 18}
 * @description post，JSON格式。
 * */
export const axiosJ = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url: url,
      data: param,
      headers: {
        'Content-Type': 'application/json'
      },
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
};
/**
 * @param {String} url 请求地址
 * @param {FormData} param new FormData()
 * @description post，文件格式。
 * */
export const axiosF = (url, param) => { // 文件 formData
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url: url,
      data: param,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
};
/**
 * @param {String} url 请求地址
 * @param {Object} param {id: 1, file: [1.png, 2.png]}
 * @description post，文件格式。
 * */
export const axiosFs = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url: url,
      data: param,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformRequest: [(data) => {
        const formData = new FormData();
        for (let key in data) {
          if ((data[key] instanceof Array)) {
            for (let i = 0; i < data[key].length; i++) {
              formData.append(key, data[key][i]);
            }
          } else {
            formData.append(key, data[key]);
          }
        }
        return formData
      }]
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
};
/**
 * @param {String} url 请求地址
 * @description 下载文件。
 * */
export const axiosL = url => {
  return new Promise((resolve, reject) => {
    service({
      method: 'get',
      url: url,
      responseType: 'blob'
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
};

/**
 * @description 白名单，不添加token的接口
 * */
const ignoreTokenArray = [
  "common/login"
];
const isAddToken = url => {
  return ignoreTokenArray.some(item => {
    return url !== item;
  });
};
