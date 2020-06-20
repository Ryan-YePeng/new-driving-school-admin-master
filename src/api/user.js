import {axiosG, axiosK} from './axios'

const getUserList = 'admin/getUserList?'; // 搜索用户列表
const updateUser = 'school/updateUser'; // 编辑用户

export const getUserListApi = (data) => axiosG(getUserList + data)
export const updateUserApi = (data) => axiosK(updateUser, data)
