<template>
  <div id="schoolDetail">
    <!--驾校介绍-->
    <card>
      <div slot="header">
        <span>驾校介绍</span>
        <el-button :loading="form_i_btn" style="float: right;" type="primary" @click="submitForm_i('form_i')">
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
          <el-select v-model="form_i.schoolNature" placeholder="请选择驾校性质" size="mini">
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
    </card>

    <!--驾校图片-->
    <card style="margin-top: 20px">
      <div slot="header">
        <span>驾校图片</span>
        <el-button :loading="form_p_btn" style="float: right;" type="primary" @click="submitForm_p()">保存</el-button>
      </div>
      <el-form :model="form_p" :rules="form_p_rules" ref="form_p" label-width="0" hide-required-asterisk>
        <el-form-item prop="trainingPicture">
          <image-uploader-batch v-model="form_p.trainingPicture"/>
        </el-form-item>
      </el-form>
    </card>

    <!--驾校咨询-->
    <!--<card style="margin-top: 20px">-->
    <!--      <div slot="header">-->
    <!--        <span>报名咨询</span>-->
    <!--        <el-button :loading="form_r_btn" style="float: right;" type="primary" @click="submitForm_r()">保存-->
    <!--        </el-button>-->
    <!--      </div>-->
    <!--      <div>-->
    <!--        <el-form :model="form_r" label-width="120px" :rules="form_r_rules" ref="form_r" hide-required-asterisk>-->
    <!--          <el-form-item label="咨询方式:" prop="articleTitle">-->
    <!--            <el-radio v-model="form_r.isConsult" :label="!flag">点击立即咨询跳转表单</el-radio>-->
    <!--            <el-radio v-model="form_r.isConsult" :label="flag">点击立即咨询跳转链接</el-radio>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item v-if="form_r.isConsult" label="跳转链接:" prop="consultLink">-->
    <!--            <el-input v-model="form_r.consultLink" placeholder="请输入跳转链接"></el-input>-->
    <!--          </el-form-item>-->
    <!--        </el-form>-->
    <!--      </div>-->
    <!--    </card>-->
  </div>
</template>

<script>
  import UploadCover from './UploadCover'
  import ImageUploaderBatch from './ImageUploaderBatch'
  import RegionSelect from '@/components/RegionSelect'
  import Pagination from '@/components/pagination'
  import {objectEvaluate} from "@/utils/common";
  import {getSchoolByUserIdApi, updateSchoolApi} from "@/api/school";

  export default {
    name: "SchoolDetail",
    components: {
      UploadCover, ImageUploaderBatch, Pagination, RegionSelect
    },
    data() {
      return {
        activeName: '驾校信息',
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
          schoolIntroduce: ''
        },
        form_i_rules: {
          headPicture: {required: true, message: '请上传驾校封面', trigger: 'change'},
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
    computed: {
      schoolId() {
        return this.$store.getters.schoolId
      }
    },
    mounted() {
      getSchoolByUserIdApi().then(result => {
        let data = result.data.resultParm.school;
        /*驾校信息*/
        objectEvaluate(data, this.form_i);
        /*多张图片*/
        objectEvaluate(data, this.form_p);
        /*驾校资讯方式*/
        objectEvaluate(data, this.form_r);
      })
    },
    methods: {
      // 提交form_i
      submitForm_i(formName) {
        let data = {...this.form_i};
        data.schoolId = this.schoolId;
        this.$refs[formName].validate((valid) => {
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
            let data = {
              schoolId: this.schoolId,
              trainingPicture: this.form_p.trainingPicture
            };
            this.form_p_btn = true;
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
