import {axiosG, axiosK} from '../utils/request'

// 添加教练回复
const addCoachReplyUrl = 'admin/reply/addCoachReply';

export function addCoachReplyApi(data) {
  return axiosK(addCoachReplyUrl, data)
}

// 添加驾校回复
const addSchoolReplyUrl = 'admin/reply/addSchoolReply';

export function addSchoolReplyApi(data) {
  return axiosK(addSchoolReplyUrl, data)
}

// 通过教练咨询id获得回复列表
const getCoachReplyByConsultIdUrl = 'admin/reply/getCoachReplyByConsultId?coachConsultId=';

export function getCoachReplyByConsultIdApi(data) {
  return axiosG(getCoachReplyByConsultIdUrl + data)
}

// 通过驾校咨询id获得回复列表
const getSchoolReplyByConsultIdUrl = 'admin/reply/getSchoolReplyByConsultId?schoolConsultId=';

export function getSchoolReplyByConsultIdApi(data) {
  return axiosG(getSchoolReplyByConsultIdUrl + data)
}
