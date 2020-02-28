import {axiosd, axiosG, axiosK} from '../utils/request'

// 添加优惠卷方法
const addCouponUrl = 'school/coupon/addCoupon';

export function addCouponApi(data) {
  return axiosK(addCouponUrl, data)
}

// 通过schoolId获得优惠卷
const getCouponBySchoolIdUrl = 'school/coupon/getCouponBySchoolId?schoolId=';

export function getCouponBySchoolIdApi(data) {
  return axiosG(getCouponBySchoolIdUrl + data)
}

// 删除优惠劵
const deleteCouponUrl = 'school/coupon/deleteCoupon?couponId=';

export function deleteCouponApi(data) {
  return axiosd(deleteCouponUrl + data)
}

// 更新优惠卷
const updateCouponUrl = 'school/coupon/updateCoupon';

export function updateCouponApi(data) {
  return axiosK(updateCouponUrl, data)
}

// 获取学校课程列表接口
const getSchoolCourseListUrl = 'school/getSchoolCourseName?schoolId=';

export function getSchoolCourseListApi(data) {
  return axiosG(getSchoolCourseListUrl + data)
}

// 上传文件
export const uploadCouponPictureUrl = 'school/coupon/uploadCouponPicture';
