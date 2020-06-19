import {axiosG, axiosK} from './axios'

/**
 * @module 回复
 * */
const addCoachReplyUrl = 'school/reply/addCoachReply'; // 添加教练回复
const addSchoolReplyUrl = 'school/reply/addSchoolReply'; // 添加驾校回复
const getCoachReplyByConsultIdUrl = 'school/reply/getCoachReplyByConsultId?coachConsultId='; // 通过教练咨询id获得回复列表
const getSchoolReplyByConsultIdUrl = 'school/reply/getSchoolReplyByConsultId?schoolConsultId='; // 通过驾校咨询id获得回复列表

export const addCoachReplyApi = (data) => axiosK(addCoachReplyUrl, data)
export const addSchoolReplyApi = (data) => axiosK(addSchoolReplyUrl, data)
export const getCoachReplyByConsultIdApi = (data) => axiosG(getCoachReplyByConsultIdUrl + data)
export const getSchoolReplyByConsultIdApi = (data) => axiosG(getSchoolReplyByConsultIdUrl + data)