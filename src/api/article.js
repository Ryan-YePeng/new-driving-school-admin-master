import {axiosG, axiosK, axiosd, axiosFs, axiosF} from './axios'

/**
 * @description 文章
 * */
const getArticle = 'admin/article/getArticleList?'; // 获取文章列表接口
const getArticleType = 'admin/article/getArticleTypeList'; // 获取文章类型接口
const addArticle = 'admin/article/addArticle'; // 添加文章接口
const updateArticle = 'admin/article/updateArticle'; // 更改文章接口
const deleteArticle = 'admin/article/deleteArticleById?id='; // 删除文章接口
const uploadArticleContentPicture = 'admin/article/uploadArticleContentPicture'; // 上传富文本图片接口
const uploadArticlePicture = 'admin/article/uploadArticlePicture'; // 上传文章封面接口

export const getArticleApi = (data) => axiosG(getArticle + data)
export const getArticleTypeApi = () => axiosG(getArticleType)
export const addArticleApi = (data) => axiosK(addArticle, data)
export const updateArticleApi = (data) => axiosK(updateArticle, data)
export const deleteArticleApi = (data) => axiosd(deleteArticle + data)
export const uploadArticleContentPictureApi = (data) => axiosFs(uploadArticleContentPicture, data)
export const uploadArticlePictureApi = (data) => axiosF(uploadArticlePicture, data)
