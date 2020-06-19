import {axiosG} from './axios'

/**
 * @module 教练审核
 * */
const getCoachApplyUrl = 'admin/coach/getToCoachList?'; // 获得教练审核列表
const agreeCoachApplyUrl = 'admin/coach/coachAgree?coachId='; // 同意
const rejectCoachApplyUrl = 'admin/coach/coachDisAgree?coachId='; // 拒绝

export const getCoachApplyApi=(data) => axiosG(getCoachApplyUrl + data)
export const passCoachApplyApi=(data) => axiosG(agreeCoachApplyUrl + data)
export const rejectCoachApplyApi=(data) => axiosG(rejectCoachApplyUrl + data)
