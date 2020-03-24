import {axiosd, axiosG, axiosK} from '../utils/request'

/**
 * @module 优惠劵
 * */

// 添加优惠卷方法
const addCouponPictureUrl = 'admin/couponPicture/addCouponPicture';

export function addCouponPictureApi(data) {
  return axiosK(addCouponPictureUrl, data)
}

// 获得优惠卷
const getAdminCouponPictureListUrl = 'admin/couponPicture/getAdminCouponPictureList';

export function getAdminCouponPictureListApi() {
  return axiosG(getAdminCouponPictureListUrl)
}

// 删除优惠劵
const deleteCouponPictureByIdUrl = 'admin/couponPicture/deleteCouponPictureById?couponPictureId=';

export function deleteCouponPictureByIdApi(data) {
  return axiosd(deleteCouponPictureByIdUrl + data)
}

// 上传文件
export const uploadCouponPictureUrl = 'admin/couponPicture/uploadCouponPicture';

/**
 * @module 使用优惠卷的用户
 * */
// 获得填表用户
const getCouponUserListUrl = 'admin/couponPicture/getCouponUserList?';

export function getCouponUserListApi(data) {
  return axiosG(getCouponUserListUrl + data)
}

// 删除填表用户
const deleteCouponUserByIdUrl = 'admin/couponPicture/deleteCouponUserById?couponUserId=';

export function deleteCouponUserByIdApi(data) {
  return axiosd(deleteCouponUserByIdUrl + data)
}
