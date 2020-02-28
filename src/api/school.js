import {axiosd, axiosF, axiosG, axiosK} from "@/utils/request";

// 获得驾校列表
const getSchoolListUrl = 'admin/getSchoolList?';

export function getSchoolListApi(data) {
  return axiosG(getSchoolListUrl + data)
}

// 删除驾校
const deleteSchoolUrl = 'admin/deleteSchool?schoolId=';

export function deleteSchoolApi(data) {
  return axiosd(deleteSchoolUrl + data)
}

// 添加驾校
const addSchoolUrl = 'admin/addSchool';

export function addSchoolApi(data) {
  return axiosK(addSchoolUrl, data)
}

// 更新驾校
const updateSchoolUrl = 'school/updateSchool';

export function updateSchoolApi(data) {
  return axiosK(updateSchoolUrl, data)
}

// 获得信息byId
const getSchoolByUserIdUrl = 'school/getSchoolByUserId';

export function getSchoolByUserIdApi() {
  return axiosG(getSchoolByUserIdUrl)
}

/**
 * @module 驾校信息
 * */

// 上传驾校封面
const uploadHeadPictureUrl = 'school/uploadHeadPicture';

export function uploadHeadPictureApi(data) {
  return axiosF(uploadHeadPictureUrl, data)
}

// 上传图片
export const uploadSchoolPicturesUrl = 'school/uploadSchoolTrainingPicture';

/**
 * @module 驾照类型
 * */

// 获得驾照类型
const getDrivingTypeListUrl = 'school/getDrivingTypeList';

export function getDrivingTypeListApi() {
  return axiosG(getDrivingTypeListUrl)
}

/**
 * @module 课程
 * */

// 获取学校课程列表接口
const getSchoolCourseListUrl = 'school/getSchoolCourseList?';

export function getSchoolCourseListApi(data) {
  return axiosG(getSchoolCourseListUrl + data)
}

// 学校增加课程
const addSchoolCourseUrl = 'school/addSchoolCourse';

export function addSchoolCourseApi(data) {
  return axiosK(addSchoolCourseUrl, data)
}

// 学校删除课程
const deleteSchoolCourseUrl = 'school/deleteSchoolCourse?schoolCourseId=';

export function deleteSchoolCourseApi(data) {
  return axiosd(deleteSchoolCourseUrl + data)
}

// 更改学校课程接口
const updateSchoolCourseUrl = 'school/updateSchoolCourse';

export function updateSchoolCourseApi(data) {
  return axiosK(updateSchoolCourseUrl, data)
}

/**
 * @module 推荐
 * */

// 推荐
const schoolRecommendUrl = 'admin/schoolRecommend?schoolId=';

export function schoolRecommendApi(data) {
  return axiosG(schoolRecommendUrl + data)
}

// 不推荐
const schoolDisRecommendUrl = 'admin/schoolDisRecommend?schoolId=';

export function schoolDisRecommendApi(data) {
  return axiosG(schoolDisRecommendUrl + data)
}

/**
 * @module 咨询
 * */

// 通过学校id获得驾校咨询列表
const getSchoolConsultListUrl = 'school/getSchoolConsultList?';

export function getSchoolConsultListApi(data) {
  return axiosG(getSchoolConsultListUrl + data)
}

// 删除驾校咨询
const deleteSchoolConsultUrl = 'school/deleteSchoolConsult?schoolConsultId=';

export function deleteSchoolConsultApi(data) {
  return axiosd(deleteSchoolConsultUrl + data)
}

// 通过学校id获得教练咨询列表
const getCoachConsultListUrl = 'school/getCoachConsultList?';

export function getCoachConsultListApi(data) {
  return axiosG(getCoachConsultListUrl + data)
}

// 删除教练咨询列表
const deleteCoachConsultUrl = 'school/deleteCoachConsult?coachConsultId=';

export function deleteCoachConsultApi(data) {
  return axiosd(deleteCoachConsultUrl + data)
}

/**
 * @module 评论
 * */

// 通过学校id获得驾校评论列表
const getSchoolCommentListUrl = 'school/getSchoolCommentList?';

export function getSchoolCommentListApi(data) {
  return axiosG(getSchoolCommentListUrl + data)
}

// 删除驾校评论
const deleteSchoolCommentUrl = 'school/deleteSchoolComment?schoolCommentId=';

export function deleteSchoolCommentApi(data) {
  return axiosd(deleteSchoolCommentUrl + data)
}

/**
 * @module 预约
 * */

// 获得预约
const getForeSpeakListUrl = 'school/coach/getForeSpeakList?';

export function getForeSpeakListApi(data) {
  return axiosG(getForeSpeakListUrl + data)
}
