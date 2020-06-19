import {axiosG} from '@/utils/request'

/**
 * @module 驾校审核
 * */
const getSchoolApplyUrl = 'admin/school/getToSchoolList?'; // 获得审核列表
const agreeSchoolApplyUrl = 'admin/school/schoolAgree?schoolId='; // 同意审核
const rejectSchoolApplyUrl = 'admin/school/schoolDisAgree?schoolId='; // 拒绝审核

export const getSchoolApplyApi = (data) => axiosG(getSchoolApplyUrl + data)
export const passSchoolApplyApi = (data) => axiosG(agreeSchoolApplyUrl + data)
export const rejectSchoolApplyApi = (data) => axiosG(rejectSchoolApplyUrl + data)
