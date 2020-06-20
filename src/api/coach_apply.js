import {axiosG} from './axios'

/**
 * @module 教练审核
 * */
const getCoachApply = 'admin/coach/getToCoachList?'; // 获得教练审核列表
const agreeCoachApply = 'admin/coach/coachAgree?coachId='; // 同意
const rejectCoachApply = 'admin/coach/coachDisAgree?coachId='; // 拒绝

export const getCoachApplyApi=(data) => axiosG(getCoachApply + data)
export const passCoachApplyApi=(data) => axiosG(agreeCoachApply + data)
export const rejectCoachApplyApi=(data) => axiosG(rejectCoachApply + data)
