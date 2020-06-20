import {axiosG} from './axios'

const menu = 'school/getMenu'; // 获取菜单

export const get = () => axiosG(menu)
