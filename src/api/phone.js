import {axiosd, axiosG, axiosK} from './axios'

/**
 * @module 电话
 * */
const addPhone = 'admin/phone/addPhone'; // 添加电话接口
const deletePhone = 'admin/phone/deletePhone?phoneId='; // 删除电话接口
const updatePhone = 'admin/phone/updatePhone'; // 更改电话接口
const getPhoneList = 'admin/phone/getPhoneList'; // 获得电话

export const addPhoneApi = (data) => axiosK(addPhone, data)
export const deletePhoneApi = (data) => axiosd(deletePhone + data)
export const updatePhoneApi = (data) => axiosK(updatePhone, data)
export const getPhoneListApi = (data) => axiosG(getPhoneList)
