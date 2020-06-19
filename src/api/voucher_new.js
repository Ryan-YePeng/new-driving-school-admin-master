import {axiosd, axiosG, axiosK} from './axios'

/**
 * @module 优惠劵
 * */
const addCouponPictureUrl = 'admin/couponPicture/addCouponPicture'; // 添加优惠卷方法
const getAdminCouponPictureListUrl = 'admin/couponPicture/getAdminCouponPictureList'; // 获得优惠卷
const deleteCouponPictureByIdUrl = 'admin/couponPicture/deleteCouponPictureById?couponPictureId='; // 删除优惠劵

export const addCouponPictureApi = (data) => axiosK(addCouponPictureUrl, data)
export const getAdminCouponPictureListApi = () => axiosG(getAdminCouponPictureListUrl)
export const deleteCouponPictureByIdApi = (data) => axiosd(deleteCouponPictureByIdUrl + data)

// 上传文件
export const uploadCouponPictureUrl = 'admin/couponPicture/uploadCouponPicture';

/**
 * @module 使用优惠卷的用户
 * */
const getCouponUserListUrl = 'admin/couponPicture/getCouponUserList?'; // 获得填表用户
const deleteCouponUserByIdUrl = 'admin/couponPicture/deleteCouponUserById?couponUserId='; // 删除填表用户

export const getCouponUserListApi = (data) => axiosG(getCouponUserListUrl + data)
export const deleteCouponUserByIdApi = (data) => axiosd(deleteCouponUserByIdUrl + data)