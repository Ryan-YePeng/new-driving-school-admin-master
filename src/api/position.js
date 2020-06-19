import {axiosd, axiosG, axiosK} from './axios'

/**
 * @module 添加
 * */
const addPlaceProvinceUrl = 'admin/place/addPlaceProvince'; // 添加省级接口
const addPlaceCityUrl = 'admin/place/addPlaceCity'; // 添加市级接口
const addPlaceAreaUrl = 'admin/place/addPlaceArea'; // 添加区级接口

export const addPlaceProvinceApi = (data) => axiosK(addPlaceProvinceUrl, data)
export const addPlaceCityApi = (data) => axiosK(addPlaceCityUrl, data)
export const addPlaceAreaApi = (data) => axiosK(addPlaceAreaUrl, data)


/**
 * @module 删除
 * */
const deletePlaceProvinceUrl = 'admin/place/deletePlaceProvince?provinceId='; // 删除省级位置接口
const deletePlaceCityUrl = 'admin/place/deletePlaceCity?cityId='; // 删除市级位置接口
const deletePlaceAreaUrl = 'admin/place/deletePlaceArea?areaId='; // 删除区级位置接口

export const deletePlaceProvinceApi = (data) => axiosd(deletePlaceProvinceUrl + data)
export const deletePlaceCityApi = (data) => axiosd(deletePlaceCityUrl + data)
export const deletePlaceAreaApi = (data) => axiosd(deletePlaceAreaUrl + data)

/**
 * @module 获取
 * */
const getProvinceListUrl = 'admin/place/getProvinceList'; // 获得省级列表
const getCityListUrl = 'admin/place/getCityList?provinceId='; // 获得市级列表
const getAreaListUrl = 'admin/place/getAreaList?cityId='; // 获得区级列表

export const getProvinceListApi = () => axiosG(getProvinceListUrl)
export const getCityListApi = (data) => axiosG(getCityListUrl + data)
export const getAreaListApi = (data) => axiosG(getAreaListUrl + data)
