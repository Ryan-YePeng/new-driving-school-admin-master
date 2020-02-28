<template>
  <div id="schoolDetail" style="background-color: white;border-radius: 5px">
    <div style="padding: 10px 0">
      <el-page-header @back="goBack" content="驾校列表"></el-page-header>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增驾校</span>
        <el-button style="float: right" type="primary" @click="submitFormFirst()" :loading="isButtonLoading">提交
        </el-button>
      </div>
      <div>
        <!--驾校账户-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>驾校账户</span>
          </div>
          <div>
            <el-form :model="form_u" :rules="form_u_rules" ref="form_u" label-width="120px" hide-required-asterisk>
              <el-form-item label="账户:" prop="username">
                <el-input v-model="form_u.username" placeholder="请输入一个手机号作为驾校账户"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>

        <!--驾校介绍-->
        <el-card class="box-card" style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>驾校介绍</span>
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
              <el-form-item label="驾校位置:" prop="province">
                <el-cascader
                  size="mini"
                  style="width:260px"
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
            </el-form>
          </div>
        </el-card>

        <!--驾校图片-->
        <el-card class="box-card" style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>驾校图片</span>
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
        <el-card class="box-card" style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>驾校咨询</span>
          </div>
          <div>
            <el-form :model="form_r" label-width="120px" :rules="form_r_rules" ref="form_r">
              <el-form-item label="咨询方式:">
                <el-radio v-model="form_r.isConsult" :label="!flag">点击立即咨询跳转表单</el-radio>
                <el-radio v-model="form_r.isConsult" :label="flag">点击立即咨询跳转链接</el-radio>
              </el-form-item>
              <el-form-item v-if="form_r.isConsult" label="跳转链接:" prop="consultLink">
                <el-input v-model="form_r.consultLink" placeholder="请输入跳转链接"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </el-card>


  </div>
</template>

<script>
  import PictureUploader from '@/components/picture-uploader'
  import {schoolPictureBaseUrl} from "@/utils/path";
  import {
    addSchoolApi,
    uploadHeadPictureApi,
    uploadSchoolPicturesUrl
  } from "@/api/school";

  import {validatePhone} from '@/utils/validate'

  import {regionData} from 'element-china-area-data'
  import {CodeToText} from 'element-china-area-data'

  export default {
    name: "ArticleDetail",
    components: {PictureUploader},
    data() {
      return {
        isButtonLoading: false,
        /*驾校账户*/
        form_u: {
          username: ''
        },
        form_u_rules: {
          username: [{required: true, message: '请输入手机号', trigger: "blur"},
            {validator: validatePhone, trigger: "blur"}],
        },
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
        fileList: [],

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
    watch: {
      selectedOptions(value) {
        if (value.length === 1) {
          this.form_i.province = CodeToText[value[0]];
          this.form_i.city = '';
          this.form_i.area = ''
        }
        if (value.length === 2) {
          this.form_i.province = CodeToText[value[0]];
          this.form_i.city = CodeToText[value[1]];
          this.form_i.area = ''
        }
        if (value.length === 3) {
          this.form_i.province = CodeToText[value[0]];
          this.form_i.city = CodeToText[value[1]];
          this.form_i.area = CodeToText[value[2]]
        }
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
      }
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

      // 多张图片上传成功
      uploadSuccess(response, file, fileList) {
        if (response.status === 200) {
          this.$successMsg('上传成功')
        } else {
          this.$errorMsg('上传失败')
        }
        file.pictureUrl = response.resultParm.message;
      },

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
        let data = {...this.form_u, ...this.form_i, ...this.form_r};

        /*图片*/
        let list = [...this.$refs['SchoolPicture'].uploadFiles];
        let str = '';
        list.forEach(item => {
          str = str + `${item.pictureUrl},`;
        });
        str = str.substr(0, str.length - 1);
        if (!str) {
          this.$errorMsg('请上传至少一张驾校图片');
          return
        }
        data.trainingPicture = str;
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
