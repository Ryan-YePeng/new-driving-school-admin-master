<template>
  <div id="schoolDetail" style="background-color: white;padding: 10px 20px;border-radius: 5px">
    <el-page-header @back="goBack" content="驾校列表"></el-page-header>
    <el-tabs v-model="activeName" style="margin-top: 20px">
      <el-tab-pane label="驾校信息" name="驾校信息">
        <!--驾校介绍-->
        <card>
          <div slot="header">
            <span>驾校介绍</span>
            <el-button :loading="form_i_btn" style="float: right;" type="primary" @click="submitForm_i()">
              保存
            </el-button>
          </div>
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
            <el-form-item label="支付功能:" prop="isPay">
              <el-radio-group v-model="form_i.isPay">
                <el-radio :label="true">开启</el-radio>
                <el-radio :label="false">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </card>

        <!--驾校图片-->
        <card style="margin-top: 20px">
          <div slot="header">
            <span>驾校图片</span>
            <el-button :loading="form_p_btn" style="float: right;" type="primary" @click="submitForm_p()">保存
            </el-button>
          </div>
          <el-form :model="form_p" :rules="form_p_rules" ref="form_p" label-width="0" hide-required-asterisk>
            <el-form-item prop="trainingPicture">
              <image-uploader-batch v-model="form_p.trainingPicture"/>
            </el-form-item>
          </el-form>
        </card>

        <!--驾校咨询-->
        <!--<card style="margin-top: 20px">-->
        <!--          <div slot="header">-->
        <!--            <span>报名咨询</span>-->
        <!--            <el-button :loading="form_r_btn" style="float: right;" type="primary" @click="submitForm_r()">保存-->
        <!--            </el-button>-->
        <!--          </div>-->
        <!--          <el-form :model="form_r" label-width="120px" :rules="form_r_rules" ref="form_r" hide-required-asterisk>-->
        <!--            <el-form-item label="咨询方式:" prop="articleTitle">-->
        <!--              <el-radio v-model="form_r.isConsult" :label="!flag">点击立即咨询跳转表单</el-radio>-->
        <!--              <el-radio v-model="form_r.isConsult" :label="flag">点击立即咨询跳转链接</el-radio>-->
        <!--            </el-form-item>-->
        <!--            <el-form-item v-if="form_r.isConsult" label="跳转链接:" prop="consultLink">-->
        <!--              <el-input v-model="form_r.consultLink" placeholder="请输入跳转链接"></el-input>-->
        <!--            </el-form-item>-->
        <!--          </el-form>-->
        <!--        </card>-->
      </el-tab-pane>

      <el-tab-pane label="报名咨询" name="SchoolConsult">
        <school-consult v-if="activeName==='SchoolConsult'" :schoolId="schoolId"></school-consult>
      </el-tab-pane>
      <el-tab-pane label="驾校评论" name="SchoolComment">
        <school-comment v-if="activeName==='SchoolComment'" :schoolId="schoolId"></school-comment>
      </el-tab-pane>
      <el-tab-pane label="驾校订单" name="Order">
        <order v-if="activeName==='Order'" :schoolId="schoolId"></order>
      </el-tab-pane>
      <el-tab-pane label="学校课程" name="SchoolCourse">
        <school-course v-if="activeName==='SchoolCourse'" :schoolId="schoolId"></school-course>
      </el-tab-pane>
      <!--<el-tab-pane label="课程优惠卷" name="Voucher">-->
      <!--  <voucher v-if="activeName==='Voucher'" :schoolId="schoolId"></voucher>-->
      <!--</el-tab-pane>-->
      <el-tab-pane label="教练咨询" name="CoachConsult">
        <coach-consult v-if="activeName==='CoachConsult'" :schoolId="schoolId"></coach-consult>
      </el-tab-pane>
      <!--<el-tab-pane label="学生预约" name="Appointment">-->
      <!--  <appointment v-if="activeName==='Appointment'" :schoolId="schoolId"></appointment>-->
      <!--</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
  import UploadCover from './UploadCover'
  import ImageUploaderBatch from './ImageUploaderBatch'
  import RegionSelect from '@/components/RegionSelect'
  import Pagination from '@/components/pagination'
  import SchoolConsult from './school_consult'
  import CoachConsult from './coach_consult'
  import SchoolComment from './school_comment'
  import Appointment from './appointment'
  import Order from './order'
  import Voucher from './voucher'
  import SchoolCourse from './school_course'
  import {updateSchoolApi} from "@/api/school";

  export default {
    name: "SchoolDetail",
    components: {
      RegionSelect, UploadCover, ImageUploaderBatch, SchoolConsult, CoachConsult, SchoolComment,
      Pagination, Appointment,
      Order, Voucher, SchoolCourse
    },
    data() {
      return {
        activeName: '驾校信息',
        schoolId: Number,
        /*驾校介绍*/
        options: [
          {id: 1, value: '总校', label: '总校'},
          {id: 2, value: '分校', label: '分校'},
          {id: 3, value: '报名点', label: '报名点'}
        ],
        form_i_btn: false,
        form_i: {
          headPicture: '',
          schoolFullName: '',
          schoolShortName: '',
          schoolNature: '',
          province: '',
          city: '',
          area: '',
          address: '',
          contactPhone: '',
          schoolIntroduce: '',
          isPay: false
        },
        form_i_rules: {
          headPicture: {required: true, message: '请上传驾校封面', trigger: 'change'},
          schoolFullName: {required: true, message: ' ', trigger: 'blur'},
          schoolShortName: {required: true, message: ' ', trigger: 'blur'},
          schoolNature: {required: true, message: ' ', trigger: 'change'},
          province: {required: true, message: ' ', trigger: 'change'},
          address: {required: true, message: ' ', trigger: 'blur'},
          contactPhone: {required: true, message: ' ', trigger: 'blur'},
          schoolIntroduce: {required: true, message: ' ', trigger: 'blur'},
          isPay: {required: true, message: ' ', trigger: 'change'},
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
        form_r_btn: false,
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
      submitForm_i() {
        let data = {...this.form_i};
        data.schoolId = this.schoolId;
        this.$refs['form_i'].validate((valid) => {
          if (valid) {
            this.form_i_btn = true;
            updateSchoolApi(data).then(() => {
              this.form_i_btn = false;
            }).catch(() => {
              this.form_i_btn = false
            })
          } else {
            return false;
          }
        });
      },

      // 保存多张图片
      submitForm_p() {
        this.$refs['form_p'].validate((valid) => {
          if (valid) {
            this.form_p_btn = true;
            let data = {
              schoolId: this.schoolId,
              trainingPicture: this.form_p.trainingPicture
            };
            updateSchoolApi(data).then(() => {
              this.form_p_btn = false;
            }).catch(() => {
              this.form_p_btn = false
            })
          } else {
            return false;
          }
        })
      },

      // 保存驾校咨询
      submitForm_r() {
        let data = {...this.form_r};
        data.schoolId = this.schoolId;
        if (this.form_r.isConsult) {
          this.$refs['form_r'].validate((valid) => {
            if (valid) {
              this.form_r_btn = true;
              updateSchoolApi(data).then(() => {
                this.form_r_btn = false;
              }).catch(() => {
                this.form_r_btn = false
              })
            } else {
              return false;
            }
          });
        } else {
          data.consultLink = '';
          this.form_r_btn = true;
          updateSchoolApi(data).then(() => {
            this.form_r_btn = false;
          }).catch(() => {
            this.form_r_btn = false
          })
        }
      },

      // 清空数据
      clearForm() {
        Object.assign(this.$data.form_i, this.$options.data().form_i);
        this.$refs['form_i'].clearValidate()
        Object.assign(this.$data.form_p, this.$options.data().form_p);
        this.$refs['form_p'].clearValidate()
        // Object.assign(this.$data.form_r, this.$options.data().form_r);
        // this.$refs['form_r'].clearValidate()
        this.activeName = '驾校信息'
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
