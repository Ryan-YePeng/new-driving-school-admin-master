import {axiosG} from '../utils/request'

// 获取菜单
const menuUrl = 'school/getMenu';

export function get() {
  return axiosG(menuUrl)
}
