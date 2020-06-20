<template>
  <div id="schoolDetail" style="background-color: white;padding: 10px 20px;border-radius: 5px">
    <el-page-header @back="goBack" content="教练列表"></el-page-header>
    <el-tabs v-model="activeName" style="margin-top: 20px">
      <el-tab-pane label="教练信息" name="教练信息">
        <!--教练介绍-->
        <card>
          <div slot="header">
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
              <el-form-item label="教练位置:" prop="province">
                <region-select
                    :province.sync="form_i.province"
                    :city.sync="form_i.city"
                    :area.sync="form_i.area"
                    placeholder="请选择教练位置"/>
              </el-form-item>
              <el-form-item label="教练所属驾校:">
                <el-input :disabled="true" :placeholder="form_i.schoolFullName"></el-input>
              </el-form-item>
              <el-form-item label="教练介绍:" prop="coachIntroduce">
                <el-input type="textarea" v-model="form_i.coachIntroduce" placeholder="请输入教练简介"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </card>

        <!--教练咨询-->
        <!--<card style="margin-top: 20px">-->
        <!--  <div slot="header">-->
        <!--    <span>教练咨询</span>-->
        <!--    <el-button :loading="form_r_btn" style="float: right;" type="primary" @click="submitForm_r()">保存-->
        <!--    </el-button>-->
        <!--  </div>-->
        <!--  <div>-->
        <!--    <el-form :model="form_r" label-width="120px">-->
        <!--      <el-form-item label="咨询方式:" prop="articleTitle">-->
        <!--        <el-radio v-model="form_r.isConsult" :label="!flag">点击立即咨询跳转表单</el-radio>-->
        <!--        <el-radio v-model="form_r.isConsult" :label="flag">点击立即咨询跳转链接</el-radio>-->
        <!--      </el-form-item>-->
        <!--      <el-form-item v-if="form_r.isConsult" label="跳转链接:">-->
        <!--        <el-input v-model="form_r.consultLink" placeholder="请输入跳转链接"></el-input>-->
        <!--      </el-form-item>-->
        <!--    </el-form>-->
        <!--  </div>-->
        <!--</card>-->
      </el-tab-pane>
      <el-tab-pane label="教练课程" name="CoachCourse">
        <coach-course v-if="activeName === 'CoachCourse'" :coachId="coachId" :schoolId="schoolId"></coach-course>
      </el-tab-pane>
      <el-tab-pane label="教练评论" name="CoachComment">
        <coach-comment v-if="activeName === 'CoachComment'" :coachId="coachId"></coach-comment>
      </el-tab-pane>
      <el-tab-pane label="教练咨询" name="CoachConsult">
        <coach-consult v-if="activeName === 'CoachConsult'" :coachId="coachId"></coach-consult>
      </el-tab-pane>
      <!--<el-tab-pane label="学生预约" name="Appointment">-->
      <!--  <appointment v-if="activeName === 'Appointment'" :coachId="coachId"></appointment>-->
      <!--</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
  import {updateCoachApi} from "@/api/coach"
  import RegionSelect from '@/components/RegionSelect'
  import Pagination from '@/components/pagination'
  import CoachComment from './coach_comment'
  import CoachCourse from './coach_course'
  import Appointment from './appointment'
  import CoachConsult from './coach_consult'

  export default {
    name: "CoachDetail",
    components: {CoachComment, RegionSelect, Pagination, CoachCourse, Appointment, CoachConsult},
    data() {
      return {
        activeName: '教练信息',

        coachId: Number,
        schoolId: Number,

        /*教练信息*/
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
          coachIntroduce: {required: true, message: ' ', trigger: 'blur'},
          province: {required: true, message: ' ', trigger: 'change'}
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
        Object.assign(this.$data.form_i, this.$options.data().form_i);
        this.$refs['form_i'].clearValidate()
        // Object.assign(this.$data.form_r, this.$options.data().form_r);
        // this.$refs['form_r'].clearValidate()
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

<style lang="scss">
  #schoolDetail {
    .el-textarea__inner {
      height: 160px;
    }
  }
</style>
