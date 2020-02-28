import {axiosG} from '../utils/request'

// 获得审核列表
const getSchoolApplyUrl = 'admin/school/getToSchoolList?';

export function getSchoolApplyApi(data) {
  return axiosG(getSchoolApplyUrl + data)
}

// 同意审核
const agreeSchoolApplyUrl = 'admin/school/schoolAgree?schoolId=';

export function passSchoolApplyApi(data) {
  return axiosG(agreeSchoolApplyUrl + data)
}

// 拒绝审核
const rejectSchoolApplyUrl = 'admin/school/schoolDisAgree?schoolId=';

export function rejectSchoolApplyApi(data) {
  return axiosG(rejectSchoolApplyUrl + data)
}
