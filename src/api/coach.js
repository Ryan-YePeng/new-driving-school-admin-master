import {axiosd, axiosG, axiosK} from "@/utils/request";

/**
 * @module 教练
 * */
const getCoachListUrl = 'admin/coach/getCoachList?'; // 获得教练列表(已审核)
const getCoachBySchoolIdUrl = 'school/coach/getCoachBySchoolId?schoolId='; // 通过学校id获得教练列表
const deleteCoachUrl = 'school/deleteCoach?coachId='; // 删除教练接口
const updateCoachUrl = 'school/coach/updateCoach'; // 更新教练
const addCoachUrl = 'admin/coach/addCoach'; // 添加教练
const getSchoolNameUrl = 'admin/coach/getSchoolName?schoolFullName='; // 获取驾校

export const getCoachListApi = (data) => axiosG(getCoachListUrl + data)
export const getCoachBySchoolIdApi = (data) => axiosG(getCoachBySchoolIdUrl + data)
export const deleteCoachApi = (data) => axiosd(deleteCoachUrl + data)
export const updateCoachApi = (data) => axiosK(updateCoachUrl, data)
export const addCoachApi = (data) => axiosK(addCoachUrl, data)
export const getSchoolNameApi = (data) => axiosG(getSchoolNameUrl + data)

/**
 * @module 课程
 * */
const addCoachCourseUrl = 'school/addCoachCourse'; // 增加教练课程接口
const deleteCoachCourseUrl = 'school/deleteCoachCourse?coachCourseId='; // 删除教练课程接口
const getCoachCourseListUrl = 'school/getCoachCourseList?'; // 获得教练课程接口
const getSchoolCourseListUrl = 'school/getSchoolCourseName?schoolId='; // 获取学校课程列表接口

export const addCoachCourseApi = (data) => axiosK(addCoachCourseUrl, data)
export const deleteCoachCourseApi = (data) => axiosd(deleteCoachCourseUrl + data)
export const getCoachCourseListApi = (data) => axiosG(getCoachCourseListUrl + data)
export const getSchoolCourseListApi = (data) => axiosG(getSchoolCourseListUrl + data)

/**
 * @module 推荐
 * */
const coachRecommendUrl = 'admin/coach/recommend?coachId='; // 推荐
const coachDisRecommendUrl = 'admin/coach/disRecommend?coachId='; // 不推荐

export const coachRecommendApi = (data) => axiosG(coachRecommendUrl + data)
export const coachDisRecommendApi = (data) => axiosG(coachDisRecommendUrl + data)

/**
 * @module 资讯
 * */
const getCoachConsultListByCoachIdUrl = 'school/getCoachConsultListByCoachId?'; // 通过教练id获得教练资讯列表
const deleteCoachConsultUrl = 'school/deleteCoachConsult?coachConsultId='; // 删除教练咨询列表

export const getCoachConsultListByCoachIdApi = (data) => axiosG(getCoachConsultListByCoachIdUrl + data)
export const deleteCoachConsultApi = (data) => axiosd(deleteCoachConsultUrl + data)

/**
 * @module 评论
 * */
const getCoachCommentListUrl = 'school/getCoachCommentList?'; // 获得教练评论
const deleteCoachCommentUrl = 'school/deleteCoachComment?coachCommentId='; // 删除教练评论

export const getCoachCommentListApi = (data) => axiosG(getCoachCommentListUrl + data)
export const deleteCoachCommentApi = (data) => axiosd(deleteCoachCommentUrl + data)

/**
 * @module 预约
 * */
const getForeSpeakListUrl = 'school/foreSpeak/getForeSpeakListByCoachId?'; // 获得预约
const deleteForeSpeakByIdUrl = 'school/foreSpeak/deleteForeSpeakById?foreSpeakId='; // 删除预约

export const getForeSpeakListApi = (data) => axiosG(getForeSpeakListUrl + data)
export const deleteForeSpeakByIdApi = (data) => axiosd(deleteForeSpeakByIdUrl + data)
