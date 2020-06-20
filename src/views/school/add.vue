<template>
  <card>
    <div slot="header">
      <el-page-header style="float: left" @back="goBack" content="驾校列表 - 新增驾校"></el-page-header>
      <el-button class="float-right" type="primary" @click="submitFormFirst()" :loading="isButtonLoading">提交
      </el-button>
    </div>
    <!--驾校账户-->
    <card>
      <div slot="header">
        <span>驾校账户</span>
      </div>
      <div>
        <el-form :model="form_u" :rules="form_u_rules" ref="form_u" label-width="120px" hide-required-asterisk>
          <el-form-item label="账户:" prop="username">
            <el-input v-model="form_u.username" placeholder="请输入一个手机号作为驾校账户"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </card>

    <!--驾校介绍-->
    <card style="margin-top: 20px">
      <div slot="header">
        <span>驾校介绍</span>
      </div>
      <div>
        <el-form :model="form_i" :rules="form_i_rules" ref="form_i" label-width="120px" hide-required-asterisk>
          <el-form-item label="驾校封面:" prop="headPicture">
            <upload-cover v-model="form_i.headPicture"/>
          </el-form-item>
          <el-form-item label="驾校全称:" prop="schoolFullName">
            <el-input v-model="form_i.schoolFullName" placeholder="请输入驾校全称"></el-input>
          </el-form-item>
          <el-form-item label="驾校简称:" prop="schoolShortName">
            <el-input v-model="form_i.schoolShortName" placeholder="请输入驾校简称"></el-input>
          </el-form-item>
          <el-form-item label="驾校性质:" prop="schoolNature">
            <el-select v-model="form_i.schoolNature" placeholder="请选择驾校性质">
              <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="驾校位置:" prop="province">
            <region-select
                :province.sync="form_i.province"
                :city.sync="form_i.city"
                :area.sync="form_i.area"
                placeholder="请选择驾校位置位置"/>
          </el-form-item>
          <el-form-item label="详细地址:" prop="address">
            <el-input v-model="form_i.address" placeholder="请输入驾校详细地址"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" prop="contactPhone">
            <el-input v-model="form_i.contactPhone" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="驾校简介:" prop="schoolIntroduce">
            <el-input type="textarea" v-model="form_i.schoolIntroduce" placeholder="请输入驾校简介"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </card>

    <!--驾校图片-->
    <card style="margin-top: 20px">
      <div slot="header">
        <span>驾校图片</span>
      </div>
      <el-form :model="form_p" :rules="form_p_rules" ref="form_p" label-width="0" hide-required-asterisk>
        <el-form-item prop="trainingPicture">
          <image-uploader-batch v-model="form_p.trainingPicture"/>
        </el-form-item>
      </el-form>
    </card>

    <!--驾校咨询-->
    <!--<card style="margin-top: 20px">-->
    <!--  <div slot="header">-->
    <!--    <span>报名咨询</span>-->
    <!--  </div>-->
    <!--  <div>-->
    <!--    <el-form :model="form_r" label-width="120px" :rules="form_r_rules" ref="form_r">-->
    <!--      <el-form-item label="咨询方式:">-->
    <!--        <el-radio v-model="form_r.isConsult" :label="!flag">点击立即咨询跳转表单</el-radio>-->
    <!--        <el-radio v-model="form_r.isConsult" :label="flag">点击立即咨询跳转链接</el-radio>-->
    <!--      </el-form-item>-->
    <!--      <el-form-item v-if="form_r.isConsult" label="跳转链接:" prop="consultLink">-->
    <!--        <el-input v-model="form_r.consultLink" placeholder="请输入跳转链接"></el-input>-->
    <!--      </el-form-item>-->
    <!--    </el-form>-->
    <!--  </div>-->
    <!--</card>-->
  </card>
</template>

<script>
  import ImageUploaderBatch from './ImageUploaderBatch'
  import UploadCover from './UploadCover'
  import RegionSelect from '@/components/RegionSelect'
  import {addSchoolApi} from "@/api/school";
  import {validatePhone} from '@/utils/validate'

  export default {
    name: "AddSchool",
    components: {UploadCover, ImageUploaderBatch, RegionSelect},
    data() {
      return {
        isButtonLoading: false,
        /*驾校账户*/
        form_u: {
          username: ''
        },
        form_u_rules: {
          username: [
            {required: true, message: '请输入手机号', trigger: "blur"},
            {validator: validatePhone, trigger: "blur"}
          ]
        },

        /*驾校介绍*/
        options: [
          {id: 1, value: '总校', label: '总校'},
          {id: 2, value: '分校', label: '分校'},
          {id: 3, value: '报名点', label: '报名点'}
        ],
        form_i: {
          headPicture: '',
          schoolFullName: '',
          schoolShortName: '',
          schoolNature: '总校',
          province: '',
          city: '',
          area: '',
          address: '',
          contactPhone: '',
          schoolIntroduce: ''
        },
        form_i_rules: {
          headPicture: {required: true, message: '请上传封面', trigger: 'change'},
          schoolFullName: {required: true, message: ' ', trigger: 'blur'},
          schoolShortName: {required: true, message: ' ', trigger: 'blur'},
          schoolNature: {required: true, message: ' ', trigger: 'change'},
          province: {required: true, message: ' ', trigger: 'change'},
          address: {required: true, message: ' ', trigger: 'blur'},
          contactPhone: {required: true, message: ' ', trigger: 'blur'},
          schoolIntroduce: {required: true, message: ' ', trigger: 'blur'}
        },

        /*驾校多张图片*/
        form_p_btn: false,
        form_p: {
          trainingPicture: ''
        },
        form_p_rules: {
          trainingPicture: {required: true, message: '请上传至少一张驾校图片', trigger: 'change'}
        },

        /*驾校资讯类型*/
        form_r: {
          isConsult: false,
          consultLink: ''
        },
        form_r_rules: {
          consultLink: {required: true, message: ' ', trigger: 'blur'}
        },
        flag: true
      }
    },
    methods: {
      // 提交
      submitFormFirst() {
        this.$refs['form_u'].validate((valid) => {
          if (valid) {
            this.submitFormSecond()
          } else {
            return false;
          }
        });
      },
      submitFormSecond() {
        this.$refs['form_i'].validate((valid) => {
          if (valid) {
            this.submitFormThird()
          } else {
            return false;
          }
        });
      },
      submitFormThird() {
        this.$refs['form_p'].validate((valid) => {
          if (valid) {
            this.submitFormForth()
          } else {
            return false;
          }
        });
      },
      submitFormForth() {
        if (this.form_r.isConsult) {
          this.$refs['form_r'].validate((valid) => {
            if (valid) {
              this.submitForm()
            } else {
              return false;
            }
          });
        } else {
          this.form_r.consultLink = '';
          this.submitForm()
        }
      },
      submitForm() {
        let data = {...this.form_u, ...this.form_i, ...this.form_p, ...this.form_r};
        /*提交*/
        this.isButtonLoading = true;
        addSchoolApi(data).then(() => {
          this.isButtonLoading = false;
          this.$emit('update');
          this.$emit('tab')
        }).catch(() => {
          this.isButtonLoading = false
        })
      },

      // 退出
      goBack() {
        this.$msgBox('确认退出？').then(() => {
          this.$emit('update');
          this.$emit('tab')
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
