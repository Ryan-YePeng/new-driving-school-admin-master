import {axiosd, axiosFs, axiosG, axiosK} from "./axios";

/**
 * @description 轮播图
 * */
const getPictureListUrl = 'admin/getPictureList'; // 获得图片列表
const addPictureUrl = 'admin/addPicture'; // 增加图片
const deletePictureUrl = 'admin/deletePicture?pictureId='; // 删除图片
const uploadPictureUrl = 'admin/uploadPicture'; //  上传文件

export const getPictureListApi = () => axiosG(getPictureListUrl)
export const addPictureApi = (data) => axiosK(addPictureUrl, data)
export const deletePictureApi = (data) => axiosd(deletePictureUrl + data)
export const uploadPictureApi = (data) => axiosFs(uploadPictureUrl, data)
