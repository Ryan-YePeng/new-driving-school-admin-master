import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import router from '../router/index'
import store from '../store/index'

let errorMsg = '';

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
    Message.error('请求错误');
    return Promise.reject(error)
  }
);

service.interceptors.response.use( //响应拦截
  response => { //成功
    const {message} = response.data;
    if (message) Message.success(message);
    return response
  },
  error => { //错误
    let code = 0;
    try {
      code = error.response.status;
    }
    catch (e) {
      if (error.toString().includes('timeout')) {
        let msg = '网络请求超时！';
        if (msg === errorMsg) return Promise.reject(error);
        errorMsg = msg;
        Message.error(msg)
      }
      return Promise.reject(error)
    }
    const {message} = error.response.data;
    if (code === 504) {
      if (error.response.statusText === 'Gateway Timeout') {
        let msg = '网络错误！';
        if (msg === errorMsg) return;
        errorMsg = msg;
        Message.error(msg)
      }
    }
    else if (code === 401) {
      if (message.length < 15) {
        Message.error(message)
      } else {
        let msg = '登录状态已过期，您可以继续留在该页面，或者重新登录';
        if (errorMsg === msg) return;
        errorMsg = msg;
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
        }).catch(() => errorMsg = '')
      }
    }
    else if (code === 403) {
      if (router.path !== '/403') router.push({name: 'error403'})
    }
    else {
      if (message !== undefined) Message.error(message);
    }
    //console.log(error.response);
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
        let str = '';
        for (let key in data) {
          str = str + `${key}=${data[key]}&`;
        }
        return str.replace(/&$/, '')
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

/*白名单*/
const ignoreTokenArray = [
  'common/login',
];

const isAddToken = (url) => {
  let isAdd = true;
  ignoreTokenArray.some(item => {
    if (url.includes(item)) {
      isAdd = false;
      return true
    }
  });
  return isAdd;
};
