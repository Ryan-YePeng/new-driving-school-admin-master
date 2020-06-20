import {axiosd, axiosG, axiosK} from './axios'

/**
 * @module 添加
 * */
const addPlaceProvince = 'admin/place/addPlaceProvince'; // 添加省级接口
const addPlaceCity = 'admin/place/addPlaceCity'; // 添加市级接口
const addPlaceArea = 'admin/place/addPlaceArea'; // 添加区级接口

export const addPlaceProvinceApi = (data) => axiosK(addPlaceProvince, data)
export const addPlaceCityApi = (data) => axiosK(addPlaceCity, data)
export const addPlaceAreaApi = (data) => axiosK(addPlaceArea, data)


/**
 * @module 删除
 * */
const deletePlaceProvince = 'admin/place/deletePlaceProvince?provinceId='; // 删除省级位置接口
const deletePlaceCity = 'admin/place/deletePlaceCity?cityId='; // 删除市级位置接口
const deletePlaceArea = 'admin/place/deletePlaceArea?areaId='; // 删除区级位置接口

export const deletePlaceProvinceApi = (data) => axiosd(deletePlaceProvince + data)
export const deletePlaceCityApi = (data) => axiosd(deletePlaceCity + data)
export const deletePlaceAreaApi = (data) => axiosd(deletePlaceArea + data)

/**
 * @module 获取
 * */
const getProvinceList = 'admin/place/getProvinceList'; // 获得省级列表
const getCityList = 'admin/place/getCityList?provinceId='; // 获得市级列表
const getAreaList = 'admin/place/getAreaList?cityId='; // 获得区级列表

export const getProvinceListApi = () => axiosG(getProvinceList)
export const getCityListApi = (data) => axiosG(getCityList + data)
export const getAreaListApi = (data) => axiosG(getAreaList + data)
