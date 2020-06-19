<template>
  <div id="schoolDetail">
    <!--驾校介绍-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>驾校介绍</span>
        <el-button :loading="form_i_btn" style="float: right;" type="primary" @click="submitForm_i('form_i')">
          保存
        </el-button>
      </div>
      <div>
        <el-form :model="form_i" :rules="form_i_rules" ref="form_i" label-width="120px" hide-required-asterisk>
          <el-form-item label="驾校封面:" prop="headPicture">
            <picture-uploader
                    ref="PictureUploader"
                    :width="'200px'"
                    :height="'150px'"
                    :fixedNumber="[4, 3]"
                    :imageUrl="imageUrl"
                    @getImage="getImageAndUpload"
            ></picture-uploader>
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
          <el-form-item label="驾校位置:">
            <el-cascader
                    size="mini"
                    placeholder="请选择驾校位置位置"
                    :options="optionData"
                    v-model="selectedOptions">
            </el-cascader>
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
      </div>
    </el-card>

    <!--驾校图片-->
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>驾校图片</span>
        <el-button :loading="form_p_btn" style="float: right;" type="primary" @click="submitForm_p()">保存
        </el-button>
      </div>
      <div>
        <el-upload
                ref="SchoolPicture"
                :action="baseApi + uploadUrl"
                :headers=headers
                accept=".jpg,.png,.gif,.jepg,.jpeg"
                :on-success="uploadSuccess"
                list-type="picture-card"
                :file-list="fileList">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
    </el-card>

    <!--驾校咨询-->
    <!--<el-card class="box-card" style="margin-top: 20px">-->
    <!--      <div slot="header" class="clearfix">-->
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
    <!--    </el-card>-->
  </div>
</template>

<script>
  import PictureUploader from '@/components/picture-uploader'
  import {schoolHeadPictureBaseUrl, schoolPictureBaseUrl} from "@/utils/path";
  import {
    getSchoolByUserIdApi,
    updateSchoolApi,
    uploadHeadPictureApi,
    uploadSchoolPicturesUrl
  } from "@/api/school";

  import {regionData} from 'element-china-area-data'
  import {CodeToText} from 'element-china-area-data'
  import {TextToCode} from 'element-china-area-data'

  import Pagination from '@/components/pagination'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: "SchoolDetail",
    components: {
      PictureUploader, Pagination
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
        optionData: regionData,
        selectedOptions: [],
        imageUrl: '',
        position: '',
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
          address: {required: true, message: ' ', trigger: 'blur'},
          contactPhone: {required: true, message: ' ', trigger: 'blur'},
          schoolIntroduce: {required: true, message: ' ', trigger: 'blur'},
          isPay: {required: true, message: ' ', trigger: 'change'}
        },

        /*驾校多张图片*/
        form_p_btn: false,
        fileList: [],

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
      baseApi() {
        return process.env.VUE_APP_BASE_API
      },
      uploadUrl() {
        return uploadSchoolPicturesUrl
      },
      headers() {
        return {'Authorization': this.$store.getters.token}
      },
      pictureUrl() {
        return schoolPictureBaseUrl
      },
      schoolId() {
        return this.$store.getters.schoolId
      }
    },
    mounted() {
      getSchoolByUserIdApi().then(result => {
        let data = result.data.resultParm.school;
        objectEvaluate(data, this.form_i);
        this.selectedOptions = [];
        this.imageUrl = schoolHeadPictureBaseUrl + data.headPicture;
        if (data.province) this.selectedOptions.push(TextToCode[data.province].code);
        if (data.city) this.selectedOptions.push(TextToCode[data.province][data.city].code);
        if (data.area) this.selectedOptions.push(TextToCode[data.province][data.city][data.area].code);
        /*多张图片*/
        let list = data.trainingPicture.split(',');
        this.fileList = [];
        list.forEach(item => {
          this.fileList.push({
            pictureUrl: item,
            url: this.pictureUrl + item
          });
        });
        /*驾校资讯方式*/
        objectEvaluate(data, this.form_r);
      })
    },
    methods: {
      // 上传剪辑后的图片
      getImageAndUpload(name, data, url) { // 文件名 二进制文件 文件本地地址
        this.imageUrl = url;
        let formData = new FormData();
        formData.append('file', data, name);
        uploadHeadPictureApi(formData).then(result => {
          if (result.data.status === 200) {
            this.$refs['PictureUploader'].closeUpload();
            this.$successMsg('上传成功');
            this.form_i.headPicture = result.data.resultParm.message;
          } else {
            this.$errorMsg('上传失败');
          }
        }).catch(() => {
          this.$refs['PictureUploader'].closeUpload();
          this.$errorMsg('上传失败');
        });
      },

      // 提交form_i
      submitForm_i(formName) {
        let data = {...this.form_i};
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
      }
      ,

      // 上传成功
      uploadSuccess(response, file, fileList) {
        if (response.status === 200) {
          this.$successMsg('上传成功')
        } else {
          this.$errorMsg('上传失败')
        }
        file.pictureUrl = response.resultParm.message;
      }
      ,
      // 保存多张图片
      submitForm_p() {
        let list = [...this.$refs['SchoolPicture'].uploadFiles];
        let str = '';
        list.forEach(item => {
          str = str + `${item.pictureUrl},`;
        });
        str = str.substr(0, str.length - 1);
        if (!str) {
          this.$errorMsg('请上传至少一张图片');
          return
        }
        this.form_p_btn = true;
        updateSchoolApi({trainingPicture: str, schoolId: this.schoolId}).then(() => {
          this.form_p_btn = false;
        }).catch(() => {
          this.form_p_btn = false
        })
      }
      ,

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
      ,

      // 清空数据
      clearForm() {
        this.articleId = Number;
        this.imageUrl = '';
        this.$refs['form_i'].resetFields();
        this.$refs['SchoolPicture'].clearFiles();
        this.activeName = '驾校信息'
      }
      ,
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
