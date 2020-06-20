import {axiosG} from './axios'

/**
 * @module 驾校审核
 * */
const getSchoolApply = 'admin/school/getToSchoolList?'; // 获得审核列表
const agreeSchoolApply = 'admin/school/schoolAgree?schoolId='; // 同意审核
const rejectSchoolApply = 'admin/school/schoolDisAgree?schoolId='; // 拒绝审核

export const getSchoolApplyApi = (data) => axiosG(getSchoolApply + data)
export const passSchoolApplyApi = (data) => axiosG(agreeSchoolApply + data)
export const rejectSchoolApplyApi = (data) => axiosG(rejectSchoolApply + data)
