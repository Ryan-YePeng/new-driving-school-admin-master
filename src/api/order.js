import {axiosd, axiosG, axiosK} from '@/utils/request'

/**
 * @module 订单列表
 * */
const deleteOrderUrl = 'admin/pay/deleteOrder?orderId='; // 删除订单
const getOrderListUrl = 'admin/pay/getOrderList?'; // 获得订单
const getSchoolListUrl = 'school/getSchoolList'; // 获得驾校

export const deleteOrderApi = (data) => axiosd(deleteOrderUrl + data)
export const getOrderListApi = (data) => axiosG(getOrderListUrl + data)
export const getSchoolListApi = () => axiosG(getSchoolListUrl)
