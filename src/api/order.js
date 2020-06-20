import {axiosd, axiosG, axiosK} from './axios'

/**
 * @module 订单列表
 * */
const deleteOrder = 'admin/pay/deleteOrder?orderId='; // 删除订单
const getOrderList = 'admin/pay/getOrderList?'; // 获得订单
const getSchoolList = 'school/getSchoolList'; // 获得驾校

export const deleteOrderApi = (data) => axiosd(deleteOrder + data)
export const getOrderListApi = (data) => axiosG(getOrderList + data)
export const getSchoolListApi = () => axiosG(getSchoolList)
