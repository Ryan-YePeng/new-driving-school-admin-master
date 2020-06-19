import {axiosK} from '@/utils/request'

const loginUrl = 'common/login'; // 登陆

export const login=(data) =>axiosK(loginUrl, data)
