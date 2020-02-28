import {axiosd, axiosG, axiosK} from "@/utils/request";

// 获得教练列表(已审核)
const getCoachListUrl = 'admin/coach/getCoachList?';

export function getCoachListApi(data) {
  return axiosG(getCoachListUrl + data)
}

// 删除教练接口
const deleteCoachUrl = 'admin/deleteCoach?coachId=';

export function deleteCoachApi(data) {
  return axiosd(deleteCoachUrl + data)
}

// 更新教练
const updateCoachUrl = 'admin/coach/updateCoach';

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
const addCoachCourseUrl = 'admin/addCoachCourse';

export function addCoachCourseApi(data) {
  return axiosK(addCoachCourseUrl, data)
}

// 删除教练课程接口
const deleteCoachCourseUrl = 'admin/deleteCoachCourse?coachCourseId=';

export function deleteCoachCourseApi(data) {
  return axiosd(deleteCoachCourseUrl + data)
}

// 获得教练课程接口
const getCoachCourseListUrl = 'admin/getCoachCourseList?';

export function getCoachCourseListApi(data) {
  return axiosG(getCoachCourseListUrl + data)
}

// 获取学校课程列表接口
const getSchoolCourseListUrl = 'admin/getSchoolCourseName?schoolId=';

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
 * @module 评论
 * */

// 获得教练评论
const getCoachCommentListUrl = 'admin/getCoachCommentList?';

export function getCoachCommentListApi(data) {
  return axiosG(getCoachCommentListUrl + data)
}

// 删除教练评论
const deleteCoachCommentUrl = 'admin/deleteCoachComment?coachCommentId=';

export function deleteCoachCommentApi(data) {
  return axiosd(deleteCoachCommentUrl + data)
}

