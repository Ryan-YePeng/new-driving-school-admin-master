import {axiosG, axiosK} from '@/utils/request'

const getUserListUrl = 'admin/getUserList?'; // 搜索用户列表
const updateUserUrl = 'school/updateUser'; // 编辑用户

export const getUserListApi = (data) => axiosG(getUserListUrl + data)
export const updateUserApi = (data) => axiosK(updateUserUrl, data)
