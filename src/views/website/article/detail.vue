<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-page-header @back="goBack" content="文章列表"></el-page-header>
        <div style="margin-top: 30px">
          <span>{{title}}</span>
          <el-button :loading="isLoadingButton" style="float: right;" type="primary" @click="submitForm('form')">{{title
            === '新增文章' ? '提交' : '保存'}}
          </el-button>
        </div>
      </div>
      <div>
        <el-form :model="form" :rules="rules" ref="form" label-width="120px" hide-required-asterisk>
          <el-form-item label="文章标题:" prop="articleTitle">
            <el-input v-model="form.articleTitle" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文章类型:" prop="articleType">
            <el-select v-model="form.articleType">
              <el-option
                v-for="item in articleTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章封面:" prop="articlePicture">
            <picture-uploader
              ref="PictureUploader"
              :width="'200px'"
              :height="'150px'"
              :fixedNumber="[4, 3]"
              :imageUrl="imageUrl"
              @getImage="getImageAndUpload"
            ></picture-uploader>
          </el-form-item>
          <el-form-item label="文章排序:" prop="articleSort">
            <el-input-number
              v-model="form.articleSort"
              controls-position="right"
              :min="1"
              :max="99999">
            </el-input-number>
          </el-form-item>
          <el-form-item label="文章内容:"></el-form-item>
        </el-form>
        <textarea id="tinymce"></textarea>
      </div>
    </el-card>

  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/silver'

  import 'tinymce/plugins/image'// 插入上传图片插件
  import 'tinymce/plugins/media'// 插入视频插件
  import 'tinymce/plugins/table'// 插入表格插件
  import 'tinymce/plugins/link' //超链接插件
  import 'tinymce/plugins/lists'// 列表插件
  import 'tinymce/plugins/contextmenu'  //右键菜单插件
  import 'tinymce/plugins/wordcount' // 字数统计插件
  import 'tinymce/plugins/colorpicker' //选择颜色插件
  import 'tinymce/plugins/textcolor'  //文本颜色插件
  import 'tinymce/plugins/fullscreen' //全屏
  import 'tinymce/plugins/help' // 帮助
  import 'tinymce/plugins/charmap' // 特殊符号
  import 'tinymce/plugins/paste' // 粘贴图片
  import 'tinymce/plugins/hr' // 水平分割线
  import 'tinymce/plugins/searchreplace' // 全屏
  import 'tinymce/plugins/insertdatetime' // 插入时间
  import 'tinymce/plugins/toc' // 内容列表
  import 'tinymce/plugins/codesample' // 插入代码

  import {
    uploadArticleContentPictureApi,
    uploadArticlePictureApi,
    addArticleApi,
    updateArticleApi,
    getArticleTypeApi
  } from "@/api/article";
  import PictureUploader from '@/components/picture-uploader'
  import {
    articleContentPictureBaseUrl,
    articleCoverPictureBaseUrl
  } from '@/utils/path'

  export default {
    name: "ArticleDetail",
    components: {PictureUploader},
    data() {
      return {
        title: '',
        articleId: Number,
        isLoadingButton: false,
        form: {
          articleTitle: '',
          articleType: '',
          articlePicture: '',
          articleContent: '',
          articleSort: 9999
        },
        imageUrl: '',
        articleTypeList: [],
        rules: {
          articleTitle: {required: true, message: '请输入文章标题', trigger: 'blur'},
          articleType: {required: true, message: '请选择文章类型', trigger: 'change'},
          articlePicture: {required: true, message: '请上传文章封面', trigger: 'change'},
          articleSort: {type: 'number', required: true, message: '请输入文章排序', trigger: 'change'}
        },
        file: new Blob(),
        fileName: '',
        DefaultInit: {
          language_url: 'assets/tinymce/langs/zh_CN.js',  //导入语言文件
          language: "zh_CN",//语言设置
          skin_url: 'assets/tinymce/skins/ui/oxide',//主题样式
          height: 1000, //高度
          menubar: false, // 最上方menu菜单
          toolbar: true, // false禁用工具栏（隐藏工具栏）
          browser_spellcheck: true, // 拼写检查
          branding: false, // 去水印
          statusbar: false, // 隐藏编辑器底部的状态栏
          elementpath: false,  // 禁用下角的当前标签路径
          paste_data_images: true, // 允许粘贴图像
          toolbar: ['bold italic underline strikethrough blockquote | forecolor backcolor|formatselect | fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent |codeformat blockformats | removeformat undo redo ',
            'bullist numlist toc pastetext|charmap hr insertdatetime | lists image media table link unlink | searchreplace fullscreen help '],
          plugins: 'lists image media table wordcount fullscreen help codesample toc insertdatetime  searchreplace  link charmap paste hr',
        },
      }
    },
    mounted() {
      this.init();
      this.getArticleType()
    },
    watch: {
      'form.articleContent': function (value) {
        if (value) this.setContent(value)
      },
      'form.articlePicture': function (value) {
        if (value) this.imageUrl = articleCoverPictureBaseUrl + value;
        else this.imageUrl = ''
      }
    },
    methods: {
      init() {
        const _this = this;
        tinymce.init({
          // 默认配置
          ...this.DefaultInit,
          // 图片上传
          images_upload_handler: function (blobInfo, success, failure) {
            let data = {};
            data.file = blobInfo.blob();
            uploadArticleContentPictureApi(data)
              .then(result => {
                let response = result.data.resultParm.message;
                let url = articleContentPictureBaseUrl + response;
                if (result.data.status === 200) {
                  success(url);
                } else {
                  failure('上传失败！')
                }
              })
          },
          // 挂载的DOM对象
          selector: `#tinymce`,
        })
      },
      // 获取文章类型
      getArticleType() {
        getArticleTypeApi().then(result => {
          this.articleTypeList = result.data.resultParm.articleTypeList
        })
      },
      // 获得剪切后的图片和上传图片
      getImageAndUpload(name, data, url) { // 文件名 二进制文件 文件本地地址
        this.fileName = name;
        this.file = data;
        this.imageUrl = url;
        let formData = new FormData();
        formData.append('file', data, name);
        uploadArticlePictureApi(formData).then(result => {
          if (result.data.status === 200) {
            this.$refs['PictureUploader'].closeUpload();
            this.$successMsg('上传成功');
            this.form.articlePicture = result.data.resultParm.message;
          } else {
            this.$errorMsg('上传失败');
          }
        }).catch(() => {
          this.$refs['PictureUploader'].closeUpload();
          this.$errorMsg('上传失败');
        });
      },
      // 获得富文本内容
      getContent() {
        this.form.articleContent = tinymce.activeEditor.getContent()
      },
      // 设置富文本内容
      setContent(value) {
        tinymce.activeEditor.setContent(value)
      },
      // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isLoadingButton = true;
            this.getContent();
            let data;
            data = {...this.form};
            if (this.title === '新增文章') {
              addArticleApi(data).then(() => {
                this.isLoadingButton = false;
                this.$emit('tab');
                this.$emit('update');
                this.clearForm();
              }).catch(() => {
                this.isLoadingButton = false;
              })
            } else {
              data.articleId = this.articleId;
              updateArticleApi(data).then(() => {
                this.isLoadingButton = false;
                this.$emit('tab');
                this.$emit('update');
                this.clearForm();
              }).catch(() => {
                this.isLoadingButton = false;
              })
            }
          } else {
            return false;
          }
        });
      },
      // 清空数据
      clearForm() {
        this.articleId = Number;
        this.title = '';
        this.imageUrl = '';
        this.$refs['form'].resetFields();
        this.setContent('');
      },
      // 退出
      goBack() {
        this.$msgBox('确认退出？').then(() => {
          this.$emit('tab');
          this.clearForm()
        })
      }
    }
  }
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>
