import {axiosd, axiosG, axiosK} from '../utils/request'

// 删除订单
const deleteOrderUrl = 'admin/pay/deleteOrder?orderId=';

export function deleteOrderApi(data) {
  return axiosd(deleteOrderUrl + data)
}

// 获得订单
const getOrderListUrl = 'admin/pay/getOrderList?';

export function getOrderListApi(data) {
  return axiosG(getOrderListUrl + data)
}

// 获得驾校
const getSchoolListUrl = 'school/getSchoolList';

export function getSchoolListApi() {
  return axiosG(getSchoolListUrl)
}
