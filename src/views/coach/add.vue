<template>
  <card>
    <div slot="header">
      <el-page-header @back="goBack" content="教练列表 - 新增教练" style="float: left"></el-page-header>
      <el-button class="float-right" :loading="isButtonLoading" type="primary" @click="submitForm()">提交</el-button>
    </div>
    <!--驾校账户-->
    <card>
      <div slot="header">
        <span>教练账户</span>
      </div>
      <el-form :model="form" :rules="rules" ref="form_u" label-width="120px">
        <el-form-item label="账户:" prop="username">
          <el-input v-model="form.username" placeholder="请输入一个手机号作为教练账户"></el-input>
        </el-form-item>
      </el-form>
    </card>

    <!--教练信息-->
    <card style="margin-top: 20px">
      <div slot="header">
        <span>教练信息</span>
      </div>
      <el-form :model="form" :rules="rules" ref="form" label-width="120px" hide-required-asterisk>
        <el-form-item label="教练姓名:" prop="realName">
          <el-input v-model="form.realName" placeholder="请输入教练姓名"></el-input>
        </el-form-item>
        <el-form-item label="教练性别:" prop="coachGender">
          <el-radio v-model="form.coachGender" label="男">男</el-radio>
          <el-radio v-model="form.coachGender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="教练位置:" prop="province">
          <region-select
              :province.sync="form.province"
              :city.sync="form.city"
              :area.sync="form.area"
              placeholder="请选择教练位置"/>
        </el-form-item>
        <el-form-item label="教练所属驾校" prop="schoolId">
          <search-select v-model="form.schoolId"/>
        </el-form-item>
        <el-form-item label="教练介绍:" prop="coachIntroduce">
          <el-input type="textarea" v-model="form.coachIntroduce" placeholder="请输入教练简介"></el-input>
        </el-form-item>
      </el-form>
    </card>

    <!--教练咨询-->
    <!--<card style="margin-top: 20px">-->
    <!--  <div slot="header">-->
    <!--    <span>教练咨询</span>-->
    <!--  </div>-->
    <!--  <div>-->
    <!--    <el-form :model="form" :rules="rules" label-width="120px">-->
    <!--      <el-form-item label="咨询方式:" prop="articleTitle">-->
    <!--        <el-radio v-model="form.isConsult" :label="!flag">点击立即咨询跳转表单</el-radio>-->
    <!--        <el-radio v-model="form.isConsult" :label="flag">点击立即咨询跳转链接</el-radio>-->
    <!--      </el-form-item>-->
    <!--      <el-form-item v-if="form.isConsult" label="跳转链接:">-->
    <!--        <el-input v-model="form.consultLink" placeholder="请输入跳转链接"></el-input>-->
    <!--      </el-form-item>-->
    <!--    </el-form>-->
    <!--  </div>-->
    <!--</card>-->
  </card>
</template>

<script>
  import {addCoachApi} from "@/api/coach"
  import RegionSelect from '@/components/RegionSelect'
  import SearchSelect from './SearchSelect'

  export default {
    components: {RegionSelect, SearchSelect},
    data() {
      let validatePhone = (rule, value, callback) => {
        if (value === "") {
          return callback(new Error(" "));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error("请输入正确的手机号"));
          }
        }
      };
      return {
        isButtonLoading: false,
        /*教练信息*/
        form: {
          schoolId: null,
          realName: '',
          coachGender: '男',
          province: '',
          city: '',
          area: '',
          coachIntroduce: '',
          isConsult: false,
          consultLink: ''
        },
        rules: {
          realName: {required: true, message: ' ', trigger: 'blur'},
          username: [{validator: validatePhone, trigger: "blur"}],
          coachIntroduce: {required: true, message: ' ', trigger: 'blur'},
          province: {required: true, message: ' ', trigger: 'change'},
          schoolId: {required: true, message: ' ', trigger: 'change'}
        },

        /*教练咨询*/
        flag: true
      }
    },

    methods: {
      // 提交form
      submitForm() {
        let flag = true;
        this.$refs['form_u'].validateField("username", (valid) => {
          if (!valid) flag = false
        });
        if (flag) return;
        let data = {...this.form};
        if (!this.form.isConsult) {
          data.consultLink = ''
        } else {
          data.consultLink = this.form.consultLink
        }
        data.isConsult = this.form.isConsult;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.isButtonLoading = true;
            addCoachApi(data).then(() => {
              this.isButtonLoading = false;
              this.$emit('update');
              this.$emit('tab');
            }).catch(() => {
              this.isButtonLoading = false
            })
          } else {
            return false;
          }
        });
      },

      // 退出
      goBack() {
        this.$msgBox('确认退出？').then(() => {
          this.$emit('update');
          this.$emit('tab');
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
