import {axiosd, axiosG, axiosK} from '../utils/request'

/**
 * @module 添加
 * */

// 添加省级接口
const addPlaceProvinceUrl = 'admin/place/addPlaceProvince';

export function addPlaceProvinceApi(data) {
  return axiosK(addPlaceProvinceUrl, data)
}

// 添加市级接口
const addPlaceCityUrl = 'admin/place/addPlaceCity';

export function addPlaceCityApi(data) {
  return axiosK(addPlaceCityUrl, data)
}

// 添加区级接口
const addPlaceAreaUrl = 'admin/place/addPlaceArea';

export function addPlaceAreaApi(data) {
  return axiosK(addPlaceAreaUrl, data)
}


/**
 * @module 删除
 * */

// 删除省级位置接口
const deletePlaceProvinceUrl = 'admin/place/deletePlaceProvince?provinceId=';

export function deletePlaceProvinceApi(data) {
  return axiosd(deletePlaceProvinceUrl + data)
}

// 删除市级位置接口
const deletePlaceCityUrl = 'admin/place/deletePlaceCity?cityId=';

export function deletePlaceCityApi(data) {
  return axiosd(deletePlaceCityUrl + data)
}

// 删除区级位置接口
const deletePlaceAreaUrl = 'admin/place/deletePlaceArea?areaId=';

export function deletePlaceAreaApi(data) {
  return axiosd(deletePlaceAreaUrl + data)
}

/**
 * @module 获取
 * */

// 获得省级列表
const getProvinceListUrl = 'admin/place/getProvinceList';

export function getProvinceListApi() {
  return axiosG(getProvinceListUrl)
}

// 获得市级列表
const getCityListUrl = 'admin/place/getCityList?provinceId=';

export function getCityListApi(data) {
  return axiosG(getCityListUrl + data)
}

// 获得区级列表
const getAreaListUrl = 'admin/place/getAreaList?cityId=';

export function getAreaListApi(data) {
  return axiosG(getAreaListUrl + data)
}
