<template>
  <div id="schoolDetail" style="background-color: white;padding: 10px 20px;border-radius: 5px">
    <el-page-header @back="goBack" content="教练列表"></el-page-header>
    <el-tabs v-model="activeName" style="margin-top: 20px">
      <el-tab-pane label="教练信息" name="教练信息">
        <!--教练介绍-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>教练介绍</span>
            <el-button :loading="form_i_btn" style="float: right;" type="primary" @click="submitForm_i('form_i')">保存
            </el-button>
          </div>
          <div>
            <el-form :model="form_i" :rules="form_i_rules" ref="form_i" label-width="120px" hide-required-asterisk>
              <el-form-item label="教练姓名:" prop="realName">
                <el-input v-model="form_i.realName" placeholder="请输入教练姓名"></el-input>
              </el-form-item>
              <el-form-item label="教练性别:" prop="coachGender">
                <el-radio v-model="form_i.coachGender" label="男">男</el-radio>
                <el-radio v-model="form_i.coachGender" label="女">女</el-radio>
              </el-form-item>
              <el-form-item label="教练位置:">
                <el-cascader
                        size="mini"
                        style="width: 270px"
                        placeholder="请选择教练位置"
                        :options="optionData"
                        v-model="selectedOptions">
                </el-cascader>
              </el-form-item>
              <el-form-item label="教练所属驾校:">
                <el-input :disabled="true" :placeholder="form_i.schoolFullName"></el-input>
              </el-form-item>
              <el-form-item label="教练介绍:" prop="coachIntroduce">
                <el-input type="textarea" v-model="form_i.coachIntroduce" placeholder="请输入教练简介"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>

        <!--教练咨询-->
        <el-card class="box-card" style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>教练咨询</span>
            <el-button :loading="form_r_btn" style="float: right;" type="primary" @click="submitForm_r()">保存
            </el-button>
          </div>
          <div>
            <el-form :model="form_r" label-width="120px">
              <el-form-item label="咨询方式:" prop="articleTitle">
                <el-radio v-model="form_r.isConsult" :label="!flag">点击立即咨询跳转表单</el-radio>
                <el-radio v-model="form_r.isConsult" :label="flag">点击立即咨询跳转链接</el-radio>
              </el-form-item>
              <el-form-item v-if="form_r.isConsult" label="跳转链接:">
                <el-input v-model="form_r.consultLink" placeholder="请输入跳转链接"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="教练课程" name="CoachCourse">
        <coach-course v-if="activeName === 'CoachCourse'" :coachId="coachId" :schoolId="schoolId"></coach-course>
      </el-tab-pane>
      <el-tab-pane label="教练评论" name="CoachComment">
        <coach-comment v-if="activeName === 'CoachComment'" :coachId="coachId"></coach-comment>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // 地区选择器
  import {regionData} from 'element-china-area-data'
  import {CodeToText} from 'element-china-area-data'

  import {
    updateCoachApi
  } from "@/api/coach"

  import PictureUploader from '@/components/picture-uploader'
  import Pagination from '@/components/pagination'
  import CoachComment from './coach_comment'
  import CoachCourse from './coach_course'

  export default {
    name: "CoachDetail",
    components: {CoachComment, PictureUploader, Pagination, CoachCourse},
    data() {
      return {
        activeName: '教练信息',

        coachId: Number,
        schoolId: Number,

        /*教练信息*/
        optionData: regionData,
        selectedOptions: [],
        position: '',
        form_i_btn: false,
        form_i: {
          realName: '',
          coachGender: '男',
          province: '',
          city: '',
          area: '',
          schoolFullName: '',
          contactPhone: '',
          coachIntroduce: ''
        },
        form_i_rules: {
          realName: {required: true, message: ' ', trigger: 'blur'},
          coachIntroduce: {required: true, message: ' ', trigger: 'blur'}
        },

        /*教练资讯类型*/
        form_r_btn: false,
        form_r: {
          isConsult: false,
          consultLink: ''
        },
        flag: true
      }
    },
    methods: {
      // 提交form_i
      submitForm_i(formName) {
        let data = {...this.form_i};
        data.coachId = this.coachId;
        if (this.selectedOptions.length === 0) {
          this.$warnMsg('请选择教练位置');
          return
        }
        if (this.selectedOptions.length === 1) {
          data.province = CodeToText[this.selectedOptions[0]];
          data.city = '';
          data.area = ''
        }
        if (this.selectedOptions.length === 2) {
          data.province = CodeToText[this.selectedOptions[0]];
          data.city = CodeToText[this.selectedOptions[1]];
          data.area = ''
        }
        if (this.selectedOptions.length === 3) {
          data.province = CodeToText[this.selectedOptions[0]];
          data.city = CodeToText[this.selectedOptions[1]];
          data.area = CodeToText[this.selectedOptions[2]]
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form_i_btn = true;
            updateCoachApi(data).then(() => {
              this.form_i_btn = false;
            }).catch(() => {
              this.form_i_btn = false
            })
          } else {
            return false;
          }
        });
      },

      // 教练的咨询方式
      submitForm_r() {
        this.form_r_btn = true;
        let data = {};
        if (!this.form_r.isConsult) {
          data.consultLink = ''
        } else {
          data.consultLink = this.form_r.consultLink
        }
        data.isConsult = this.form_r.isConsult;
        data.coachId = this.coachId;
        updateCoachApi(data).then(() => {
          this.form_r_btn = false;
        }).catch(() => {
          this.form_r_btn = false
        })
      },

      // 清空数据
      clearForm() {
        this.$refs['form_i'].resetFields();
        for (let key in this.form_i) {
          this.form_i[key] = ''
        }
        this.form_r.isConsult = true;
        this.form_r.consultLink = '';
        this.activeName = '教练信息';
      },
      // 退出
      goBack() {
        this.$msgBox('确认退出？').then(() => {
          this.$emit('update');
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
<style lang="scss">
  #schoolDetail {
    .el-textarea__inner {
      height: 160px;
    }
  }
</style>
