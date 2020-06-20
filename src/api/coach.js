import {axiosd, axiosG, axiosK} from "./axios";

/**
 * @module 教练
 * */
const getCoachList = 'admin/coach/getCoachList?'; // 获得教练列表(已审核)
const getCoachBySchoolId = 'school/coach/getCoachBySchoolId?schoolId='; // 通过学校id获得教练列表
const deleteCoach = 'school/deleteCoach?coachId='; // 删除教练接口
const updateCoach = 'school/coach/updateCoach'; // 更新教练
const addCoach = 'admin/coach/addCoach'; // 添加教练
const getSchoolName = 'admin/coach/getSchoolName?schoolFullName='; // 获取驾校

export const getCoachListApi = (data) => axiosG(getCoachList + data)
export const getCoachBySchoolIdApi = (data) => axiosG(getCoachBySchoolId + data)
export const deleteCoachApi = (data) => axiosd(deleteCoach + data)
export const updateCoachApi = (data) => axiosK(updateCoach, data)
export const addCoachApi = (data) => axiosK(addCoach, data)
export const getSchoolNameApi = (data) => axiosG(getSchoolName + data)

/**
 * @module 课程
 * */
const addCoachCourse = 'school/addCoachCourse'; // 增加教练课程接口
const deleteCoachCourse = 'school/deleteCoachCourse?coachCourseId='; // 删除教练课程接口
const getCoachCourseList = 'school/getCoachCourseList?'; // 获得教练课程接口
const getSchoolCourseList = 'school/getSchoolCourseName?schoolId='; // 获取学校课程列表接口

export const addCoachCourseApi = (data) => axiosK(addCoachCourse, data)
export const deleteCoachCourseApi = (data) => axiosd(deleteCoachCourse + data)
export const getCoachCourseListApi = (data) => axiosG(getCoachCourseList + data)
export const getSchoolCourseListApi = (data) => axiosG(getSchoolCourseList + data)

/**
 * @module 推荐
 * */
const coachRecommend = 'admin/coach/recommend?coachId='; // 推荐
const coachDisRecommend = 'admin/coach/disRecommend?coachId='; // 不推荐

export const coachRecommendApi = (data) => axiosG(coachRecommend + data)
export const coachDisRecommendApi = (data) => axiosG(coachDisRecommend + data)

/**
 * @module 资讯
 * */
const getCoachConsultListByCoachId = 'school/getCoachConsultListByCoachId?'; // 通过教练id获得教练资讯列表
const deleteCoachConsult = 'school/deleteCoachConsult?coachConsultId='; // 删除教练咨询列表

export const getCoachConsultListByCoachIdApi = (data) => axiosG(getCoachConsultListByCoachId + data)
export const deleteCoachConsultApi = (data) => axiosd(deleteCoachConsult + data)

/**
 * @module 评论
 * */
const getCoachCommentList = 'school/getCoachCommentList?'; // 获得教练评论
const deleteCoachComment = 'school/deleteCoachComment?coachCommentId='; // 删除教练评论

export const getCoachCommentListApi = (data) => axiosG(getCoachCommentList + data)
export const deleteCoachCommentApi = (data) => axiosd(deleteCoachComment + data)

/**
 * @module 预约
 * */
const getForeSpeakList = 'school/foreSpeak/getForeSpeakListByCoachId?'; // 获得预约
const deleteForeSpeakById = 'school/foreSpeak/deleteForeSpeakById?foreSpeakId='; // 删除预约

export const getForeSpeakListApi = (data) => axiosG(getForeSpeakList + data)
export const deleteForeSpeakByIdApi = (data) => axiosd(deleteForeSpeakById + data)
