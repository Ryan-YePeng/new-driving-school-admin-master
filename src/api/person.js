import {axiosG, axiosK} from '../utils/request'

// 获得个人信息
const getUserUrl = 'school/getUser';

export function getUserApi() {
  return axiosG(getUserUrl)
}

// 修改密码
const updatePasswordUrl = 'school/updateAdminPassword';

export function updatePasswordApi(data) {
  return axiosK(updatePasswordUrl, data)
}
