import {axiosd, axiosG, axiosK} from './axios'

/**
 * @module 电话
 * */
const addPhoneUrl = 'admin/phone/addPhone'; // 添加电话接口
const deletePhoneUrl = 'admin/phone/deletePhone?phoneId='; // 删除电话接口
const updatePhoneUrl = 'admin/phone/updatePhone'; // 更改电话接口
const getPhoneListUrl = 'admin/phone/getPhoneList'; // 获得电话

export const addPhoneApi = (data) => axiosK(addPhoneUrl, data)
export const deletePhoneApi = (data) => axiosd(deletePhoneUrl + data)
export const updatePhoneApi = (data) => axiosK(updatePhoneUrl, data)
export const getPhoneListApi = (data) => axiosG(getPhoneListUrl)
