import {axiosd, axiosFs, axiosG, axiosK} from "./axios";

/**
 * @description 轮播图
 * */
const getPictureList = 'admin/getPictureList'; // 获得图片列表
const addPicture = 'admin/addPicture'; // 增加图片
const deletePicture = 'admin/deletePicture?pictureId='; // 删除图片
const uploadPicture = 'admin/uploadPicture'; //  上传文件

export const getPictureListApi = () => axiosG(getPictureList)
export const addPictureApi = (data) => axiosK(addPicture, data)
export const deletePictureApi = (data) => axiosd(deletePicture + data)
export const uploadPictureApi = (data) => axiosFs(uploadPicture, data)
