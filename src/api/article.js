import {axiosG, axiosK, axiosd, axiosFs, axiosF} from '../utils/request'

// 获取文章列表接口
const getArticleUrl = 'admin/article/getArticleList?';

export function getArticleApi(data) {
  return axiosG(getArticleUrl + data)
}

// 获取文章类型接口
const getArticleTypeUrl = 'admin/article/getArticleTypeList';

export function getArticleTypeApi() {
  return axiosG(getArticleTypeUrl)
}

// 添加文章接口
const addArticleUrl = 'admin/article/addArticle';

export function addArticleApi(data) {
  return axiosK(addArticleUrl, data)
}

// 更改文章接口
const updateArticleUrl = 'admin/article/updateArticle';

export function updateArticleApi(data) {
  return axiosK(updateArticleUrl, data)
}

// 删除文章接口
const deleteArticleUrl = 'admin/article/deleteArticleById?id=';

export function deleteArticleApi(data) {
  return axiosd(deleteArticleUrl + data)
}

// 上传富文本图片接口
const uploadArticleContentPictureUrl = 'admin/article/uploadArticleContentPicture';

export function uploadArticleContentPictureApi(data) {
  return axiosFs(uploadArticleContentPictureUrl, data)
}

// 上传文章图片接口
const uploadArticlePictureUrl = 'admin/article/uploadArticlePicture';

export function uploadArticlePictureApi(data) {
  return axiosF(uploadArticlePictureUrl, data)
}








