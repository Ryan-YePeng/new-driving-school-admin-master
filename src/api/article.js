import {axiosG, axiosK, axiosd, axiosFs, axiosF} from './axios'

/**
 * @description 文章
 * */
const getArticleUrl = 'admin/article/getArticleList?'; // 获取文章列表接口
const getArticleTypeUrl = 'admin/article/getArticleTypeList'; // 获取文章类型接口
const addArticleUrl = 'admin/article/addArticle'; // 添加文章接口
const updateArticleUrl = 'admin/article/updateArticle'; // 更改文章接口
const deleteArticleUrl = 'admin/article/deleteArticleById?id='; // 删除文章接口
const uploadArticleContentPictureUrl = 'admin/article/uploadArticleContentPicture'; // 上传富文本图片接口
const uploadArticlePictureUrl = 'admin/article/uploadArticlePicture'; // 上传文章图片接口

export const getArticleApi = (data) => axiosG(getArticleUrl + data)
export const getArticleTypeApi = () => axiosG(getArticleTypeUrl)
export const addArticleApi = (data) => axiosK(addArticleUrl, data)
export const updateArticleApi = (data) => axiosK(updateArticleUrl, data)
export const deleteArticleApi = (data) => axiosd(deleteArticleUrl + data)
export const uploadArticleContentPictureApi = (data) => axiosFs(uploadArticleContentPictureUrl, data)
export const uploadArticlePictureApi = (data) => axiosF(uploadArticlePictureUrl, data)
