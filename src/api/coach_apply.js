import {axiosG} from '../utils/request'

// 获得教练审核列表
const getCoachApplyUrl = 'admin/coach/getToCoachList?';

export function getCoachApplyApi(data) {
  return axiosG(getCoachApplyUrl + data)
}

// 同意
const agreeCoachApplyUrl = 'admin/coach/coachAgree?coachId=';

export function passCoachApplyApi(data) {
  return axiosG(agreeCoachApplyUrl + data)
}

// 拒绝
const rejectCoachApplyUrl = 'admin/coach/coachDisAgree?coachId=';

export function rejectCoachApplyApi(data) {
  return axiosG(rejectCoachApplyUrl + data)
}
