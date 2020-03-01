import {axiosd, axiosG, axiosK} from "@/utils/request";

// 获得教练列表(已审核)
const getCoachListUrl = 'admin/coach/getCoachList?';

export function getCoachListApi(data) {
  return axiosG(getCoachListUrl + data)
}

// 通过学校id获得教练列表
const getCoachBySchoolIdUrl = 'school/coach/getCoachBySchoolId?schoolId=';

export function getCoachBySchoolIdApi(data) {
  return axiosG(getCoachBySchoolIdUrl + data)
}

// 删除教练接口
const deleteCoachUrl = 'school/deleteCoach?coachId=';

export function deleteCoachApi(data) {
  return axiosd(deleteCoachUrl + data)
}

// 更新教练
const updateCoachUrl = 'school/coach/updateCoach';

export function updateCoachApi(data) {
  return axiosK(updateCoachUrl, data)
}

// 添加教练
const addCoachUrl = 'admin/coach/addCoach';

export function addCoachApi(data) {
  return axiosK(addCoachUrl, data)
}

// 获取驾校
const getSchoolNameUrl = 'admin/coach/getSchoolName?schoolFullName=';

export function getSchoolNameApi(data) {
  return axiosG(getSchoolNameUrl + data)
}

/**
 * @module 课程
 * */

// 增加教练课程接口
const addCoachCourseUrl = 'school/addCoachCourse';

export function addCoachCourseApi(data) {
  return axiosK(addCoachCourseUrl, data)
}

// 删除教练课程接口
const deleteCoachCourseUrl = 'school/deleteCoachCourse?coachCourseId=';

export function deleteCoachCourseApi(data) {
  return axiosd(deleteCoachCourseUrl + data)
}

// 获得教练课程接口
const getCoachCourseListUrl = 'school/getCoachCourseList?';

export function getCoachCourseListApi(data) {
  return axiosG(getCoachCourseListUrl + data)
}

// 获取学校课程列表接口
const getSchoolCourseListUrl = 'school/getSchoolCourseName?schoolId=';

export function getSchoolCourseListApi(data) {
  return axiosG(getSchoolCourseListUrl + data)
}

/**
 * @module 推荐
 * */

// 推荐
const coachRecommendUrl = 'admin/coach/recommend?coachId=';

export function coachRecommendApi(data) {
  return axiosG(coachRecommendUrl + data)
}

// 不推荐
const coachDisRecommendUrl = 'admin/coach/disRecommend?coachId=';

export function coachDisRecommendApi(data) {
  return axiosG(coachDisRecommendUrl + data)
}

/**
 * @module 资讯
 * */

// 通过教练id获得教练资讯列表
const getCoachConsultListByCoachIdUrl = 'school/getCoachConsultListByCoachId?';

export function getCoachConsultListByCoachIdApi(data) {
  return axiosG(getCoachConsultListByCoachIdUrl + data)
}

// 删除教练咨询列表
const deleteCoachConsultUrl = 'school/deleteCoachConsult?coachConsultId=';

export function deleteCoachConsultApi(data) {
  return axiosd(deleteCoachConsultUrl + data)
}

/**
 * @module 评论
 * */

// 获得教练评论
const getCoachCommentListUrl = 'school/getCoachCommentList?';

export function getCoachCommentListApi(data) {
  return axiosG(getCoachCommentListUrl + data)
}

// 删除教练评论
const deleteCoachCommentUrl = 'school/deleteCoachComment?coachCommentId=';

export function deleteCoachCommentApi(data) {
  return axiosd(deleteCoachCommentUrl + data)
}

/**
 * @module 预约
 * */

// 获得预约
const getForeSpeakListUrl = 'school/foreSpeak/getForeSpeakListByCoachId?';

export function getForeSpeakListApi(data) {
  return axiosG(getForeSpeakListUrl + data)
}

// 删除预约
const deleteForeSpeakByIdUrl = 'school/foreSpeak/deleteForeSpeakById?foreSpeakId=';

export function deleteForeSpeakByIdApi(data) {
  return axiosd(deleteForeSpeakByIdUrl + data)
}
