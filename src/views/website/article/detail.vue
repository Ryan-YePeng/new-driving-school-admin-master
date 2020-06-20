<template>
  <card>
    <div slot="header">
      <el-page-header @back="goBack" content="文章列表"></el-page-header>
      <div style="margin-top: 30px">
        <span>{{title}}</span>
        <el-button :loading="isLoadingButton" style="float: right;" type="primary" @click="submitForm('Form')">{{title
          === '新增文章' ? '提交' : '保存'}}
        </el-button>
      </div>
    </div>
    <el-form :model="form" :rules="rules" ref="Form" label-width="120px">
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
        <upload-cover v-model="form.articlePicture"/>
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
    <custom-editor v-model="form.articleContent" ref="CustomEditor"/>
  </card>
</template>

<script>
  import CustomEditor from './CustomEditor'
  import UploadCover from './UploadCover'
  import {addArticleApi, updateArticleApi, getArticleTypeApi} from "@/api/article";

  export default {
    name: "ArticleDetail",
    components: {CustomEditor, UploadCover},
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
        articleTypeList: [],
        rules: {
          articleTitle: {required: true, message: '请输入文章标题', trigger: 'blur'},
          articleType: {required: true, message: '请选择文章类型', trigger: 'change'},
          articlePicture: {required: true, message: '请上传文章封面', trigger: 'change'},
          articleSort: {required: true, message: '请输入文章排序', trigger: 'change'}
        }
      }
    },
    mounted() {
      this.getArticleType()
    },
    methods: {
      // 获取文章类型
      getArticleType() {
        getArticleTypeApi().then(result => {
          this.articleTypeList = result.data.resultParm.articleTypeList
        })
      },
      // 获得富文本内容
      getContent() {
        this.form.articleContent = this.$refs.CustomEditor.get()
      },
      // 设置富文本内容
      setContent(value = '') {
        this.$refs['CustomEditor'].set(value)
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
        this.title = '';
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].clearValidate();
        this.setContent()
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
