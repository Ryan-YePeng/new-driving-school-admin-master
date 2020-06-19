import {axiosG} from './axios'

const menuUrl = 'school/getMenu'; // 获取菜单

export const get = () => axiosG(menuUrl)
