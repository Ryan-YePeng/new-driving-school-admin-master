import {axiosK} from '../utils/request'

// 登陆
const loginUrl = 'common/login';

export function login(data) {
  return axiosK(loginUrl, data)
}
