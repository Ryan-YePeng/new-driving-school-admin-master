import {axiosd, axiosG, axiosK} from '../utils/request'

// 添加电话接口
const addPhoneUrl = 'admin/phone/addPhone';

export function addPhoneApi(data) {
  return axiosK(addPhoneUrl, data)
}

// 删除电话接口
const deletePhoneUrl = 'admin/phone/deletePhone?phoneId=';

export function deletePhoneApi(data) {
  return axiosd(deletePhoneUrl + data)
}

// 更改电话接口
const updatePhoneUrl = 'admin/phone/updatePhone';

export function updatePhoneApi(data) {
  return axiosK(updatePhoneUrl, data)
}

// 获得电话
const getPhoneListUrl = 'admin/phone/getPhoneList';

export function getPhoneListApi(data) {
  return axiosG(getPhoneListUrl)
}


