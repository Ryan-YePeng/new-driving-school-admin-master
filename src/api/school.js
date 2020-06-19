import {axiosd, axiosF, axiosG, axiosK} from "./axios";

/**
 * @module 驾校
 * */
const getSchoolListUrl = 'admin/getSchoolList?'; // 获得驾校列表
const deleteSchoolUrl = 'admin/deleteSchool?schoolId='; // 删除驾校
const addSchoolUrl = 'admin/addSchool'; // 添加驾校
const updateSchoolUrl = 'school/updateSchool'; // 更新驾校
const getSchoolByUserIdUrl = 'school/getSchoolByUserId'; // 获得信息byId

export const getSchoolListApi = (data) => axiosG(getSchoolListUrl + data)
export const deleteSchoolApi = (data) => axiosd(deleteSchoolUrl + data)
export const addSchoolApi = (data) => axiosK(addSchoolUrl, data)
export const updateSchoolApi = (data) => axiosK(updateSchoolUrl, data)
export const getSchoolByUserIdApi = () => axiosG(getSchoolByUserIdUrl)


/**
 * @module 驾校信息
 * */
// 上传驾校封面
const uploadHeadPictureUrl = 'school/uploadHeadPicture';

export const uploadHeadPictureApi = (data) => axiosF(uploadHeadPictureUrl, data)

// 上传图片
export const uploadSchoolPicturesUrl = 'school/uploadSchoolTrainingPicture';

/**
 * @module 课程
 * */
const getDrivingTypeListUrl = 'school/getDrivingTypeList'; // 获得驾照类型
const getSchoolCourseListUrl = 'school/getSchoolCourseList?'; // 获取学校课程列表接口
const addSchoolCourseUrl = 'school/addSchoolCourse'; // 学校增加课程
const deleteSchoolCourseUrl = 'school/deleteSchoolCourse?schoolCourseId='; // 学校删除课程
const updateSchoolCourseUrl = 'school/updateSchoolCourse'; // 更改学校课程接口

export const getDrivingTypeListApi = () => axiosG(getDrivingTypeListUrl)
export const getSchoolCourseListApi = (data) => axiosG(getSchoolCourseListUrl + data)
export const addSchoolCourseApi = (data) => axiosK(addSchoolCourseUrl, data)
export const deleteSchoolCourseApi = (data) => axiosd(deleteSchoolCourseUrl + data)
export const updateSchoolCourseApi = (data) => axiosK(updateSchoolCourseUrl, data)


/**
 * @module 推荐
 * */
const schoolRecommendUrl = 'admin/schoolRecommend?schoolId='; // 推荐
const schoolDisRecommendUrl = 'admin/schoolDisRecommend?schoolId='; // 不推荐

export const schoolRecommendApi = (data) => axiosG(schoolRecommendUrl + data)
export const schoolDisRecommendApi = (data) => axiosG(schoolDisRecommendUrl + data)


/**
 * @module 咨询
 * */
const getAllSchoolConsultUrl = 'admin/getAllSchoolConsult'; // 获得所有驾校咨询
const getSchoolConsultListUrl = 'school/getSchoolConsultList?'; // 通过学校id获得驾校咨询列表
const deleteSchoolConsultUrl = 'school/deleteSchoolConsult?schoolConsultId='; // 删除驾校咨询
const getCoachConsultListUrl = 'school/getCoachConsultList?'; // 通过学校id获得教练咨询列表
const deleteCoachConsultUrl = 'school/deleteCoachConsult?coachConsultId='; // 删除教练咨询列表

export const getAllSchoolConsultApi = () => axiosG(getAllSchoolConsultUrl)
export const getSchoolConsultListApi = (data) => axiosG(getSchoolConsultListUrl + data)
export const deleteSchoolConsultApi = (data) => axiosd(deleteSchoolConsultUrl + data)
export const getCoachConsultListApi = (data) => axiosG(getCoachConsultListUrl + data)
export const deleteCoachConsultApi = (data) => axiosd(deleteCoachConsultUrl + data)


/**
 * @module 评论
 * */
const getSchoolCommentListUrl = 'school/getSchoolCommentList?'; // 通过学校id获得驾校评论列表
const deleteSchoolCommentUrl = 'school/deleteSchoolComment?schoolCommentId='; // 删除驾校评论

export const getSchoolCommentListApi = (data) => axiosG(getSchoolCommentListUrl + data)
export const deleteSchoolCommentApi = (data) => axiosd(deleteSchoolCommentUrl + data)


/**
 * @module 预约
 * */
const getForeSpeakListUrl = 'school/coach/getForeSpeakList?'; // 获得预约
const deleteForeSpeakByIdUrl = 'school/foreSpeak/deleteForeSpeakById?foreSpeakId='; // 删除预约

export const getForeSpeakListApi = (data) => axiosG(getForeSpeakListUrl + data)
export const deleteForeSpeakByIdApi = (data) => axiosd(deleteForeSpeakByIdUrl + data)
