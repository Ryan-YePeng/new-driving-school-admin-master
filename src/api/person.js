import {axiosG, axiosK} from '@/utils/request'

const getUserUrl = 'school/getUser'; // 获得个人信息
const updatePasswordUrl = 'school/updateAdminPassword'; // 修改密码

export const getUserApi = () => axiosG(getUserUrl)
export const updatePasswordApi = (data) => axiosK(updatePasswordUrl, data)
