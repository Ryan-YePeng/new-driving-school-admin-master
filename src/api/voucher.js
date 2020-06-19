import {axiosd, axiosG, axiosK} from '@/utils/request'

/**
 * @module 优惠卷
 * */
const addCouponUrl = 'school/coupon/addCoupon'; // 添加优惠卷方法
const getCouponBySchoolIdUrl = 'school/coupon/getCouponBySchoolId?schoolId='; // 通过schoolId获得优惠卷
const deleteCouponUrl = 'school/coupon/deleteCoupon?couponId='; // 删除优惠劵
const updateCouponUrl = 'school/coupon/updateCoupon'; // 更新优惠卷
const getSchoolCourseListUrl = 'school/getSchoolCourseName?schoolId='; // 获取学校课程列表接口

export const addCouponApi = (data) => axiosK(addCouponUrl, data)
export const getCouponBySchoolIdApi = (data) => axiosG(getCouponBySchoolIdUrl + data)
export const deleteCouponApi = (data) => axiosd(deleteCouponUrl + data)
export const updateCouponApi = (data) => axiosK(updateCouponUrl, data)
export const getSchoolCourseListApi = (data) => axiosG(getSchoolCourseListUrl + data)

// 上传文件
export const uploadCouponPictureUrl = 'school/coupon/uploadCouponPicture';