import service from './axios'
import qs from 'qs'

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
