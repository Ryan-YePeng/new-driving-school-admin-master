import {axiosd, axiosG, axiosK} from "@/utils/request";


// 获得图片列表
const getPictureListUrl = 'admin/getPictureList';

export function getPictureListApi() {
  return axiosG(getPictureListUrl)
}

// 增加图片
const addPictureUrl = 'admin/addPicture';

export function addPictureApi(data) {
  return axiosK(addPictureUrl, data)
}

//  上传文件
export const uploadPictureApi = 'admin/uploadPicture';

// 删除图片
const deletePictureUrl = 'admin/deletePicture?pictureId=';

export function deletePictureApi(data) {
  return axiosd(deletePictureUrl + data)
}




