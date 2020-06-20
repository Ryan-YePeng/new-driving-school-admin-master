import {axiosG, axiosK} from './axios'

/**
 * @module 回复
 * */
const addCoachReply = 'school/reply/addCoachReply'; // 添加教练回复
const addSchoolReply = 'school/reply/addSchoolReply'; // 添加驾校回复
const getCoachReplyByConsultId = 'school/reply/getCoachReplyByConsultId?coachConsultId='; // 通过教练咨询id获得回复列表
const getSchoolReplyByConsultId = 'school/reply/getSchoolReplyByConsultId?schoolConsultId='; // 通过驾校咨询id获得回复列表

export const addCoachReplyApi = (data) => axiosK(addCoachReply, data)
export const addSchoolReplyApi = (data) => axiosK(addSchoolReply, data)
export const getCoachReplyByConsultIdApi = (data) => axiosG(getCoachReplyByConsultId + data)
export const getSchoolReplyByConsultIdApi = (data) => axiosG(getSchoolReplyByConsultId + data)