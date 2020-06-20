import {axiosG, axiosK} from './axios'

const getUser = 'school/getUser'; // 获得个人信息
const updatePassword = 'school/updateAdminPassword'; // 修改密码

export const getUserApi = () => axiosG(getUser)
export const updatePasswordApi = (data) => axiosK(updatePassword, data)
