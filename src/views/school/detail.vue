<template>
  <div id="schoolDetail" style="background-color: white;padding: 10px 20px;border-radius: 5px">
    <el-page-header @back="goBack" content="驾校列表"></el-page-header>
    <el-tabs v-model="activeName" style="margin-top: 20px">
      <el-tab-pane label="驾校信息" name="驾校信息">
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
        <el-card class="box-card" style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>驾校咨询</span>
            <el-button :loading="form_r_btn" style="float: right;" type="primary" @click="submitForm_r()">保存
            </el-button>
          </div>
          <div>
            <el-form :model="form_r" label-width="120px" :rules="form_r_rules" ref="form_r" hide-required-asterisk>
              <el-form-item label="咨询方式:" prop="articleTitle">
                <el-radio v-model="form_r.isConsult" :label="!flag">点击立即咨询跳转表单</el-radio>
                <el-radio v-model="form_r.isConsult" :label="flag">点击立即咨询跳转链接</el-radio>
              </el-form-item>
              <el-form-item v-if="form_r.isConsult" label="跳转链接:" prop="consultLink">
                <el-input v-model="form_r.consultLink" placeholder="请输入跳转链接"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>

        <!--驾校课程-->
        <el-card class="box-card" style="margin-top: 20px">
          <div slot="header" class="clearfix">
            <span>驾校课程</span>
            <el-button style="float: right;" type="primary" @click="addSchoolCourse()">
              新增
            </el-button>
          </div>
          <div>
            <el-table v-loading="isLoading" :data="form_Data" max-height="100%">
              <el-table-column
                prop="schoolCourseName"
                label="班型名称">
              </el-table-column>
              <el-table-column
                prop="schoolCourseType"
                label="驾照类型">
              </el-table-column>
              <el-table-column
                prop="schoolCoursePrice"
                label="费用">
              </el-table-column>
              <el-table-column label="操作" align="center" width="200">
                <template slot-scope="scope">
                  <el-button type="primary" class="el-icon-edit" @click="editSchoolCourse(scope.row)"
                             size="mini"></el-button>
                  <el-popover
                    :ref="scope.row.schoolCourseId"
                    placement="top"
                    width="180">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="$refs[scope.row.schoolCourseId].doClose()">取消
                      </el-button>
                      <el-button :loading="isLoadingButton" type="primary" size="mini"
                                 @click.stop="deleteCourse(scope.row.schoolCourseId)">确定
                      </el-button>
                    </div>
                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
            <pagination ref="pagination" @getNewData="getC"></pagination>
          </div>
        </el-card>

        <!--驾校课程添加框-->
        <el-dialog :title="title" width="600px" append-to-body @close="cancelCourse" :close-on-click-modal="false"
                   :visible.sync="dialogTableVisible">
          <el-form :model="form_c" :rules="form_c_rules" ref="form_c" label-width="120px" hide-required-asterisk>
            <el-form-item label="班型名称:" placeholder="请输入班型名称" prop="schoolCourseName">
              <el-input v-model="form_c.schoolCourseName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="驾照类型:">
              <el-select v-model="form_c.schoolCourseType" placeholder="请选择驾照类型">
                <el-option
                  v-for="item in courseTypeOptions"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="费用:" prop="schoolCoursePrice">
              <el-input-number v-model="form_c.schoolCoursePrice" :min="1" :max="99999" label="描述文字"></el-input-number>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm_c('form_c')" :isloading="form_c_btn">确 定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="驾校咨询" name="驾校咨询">
        <school-consult v-if="activeName==='驾校咨询'" :schoolId="schoolId"></school-consult>
      </el-tab-pane>
      <el-tab-pane label="驾校评论" name="驾校评论">
        <school-comment v-if="activeName==='驾校评论'" :schoolId="schoolId"></school-comment>
      </el-tab-pane>
      <el-tab-pane label="教练咨询" name="教练咨询">
        <coach-consult v-if="activeName==='教练咨询'" :schoolId="schoolId"></coach-consult>
      </el-tab-pane>
      <el-tab-pane label="学生预约" name="学生预约">
        <appointment v-if="activeName==='学生预约'" :schoolId="schoolId"></appointment>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import PictureUploader from '@/components/picture-uploader'
  import {schoolPictureBaseUrl} from "@/utils/path";
  import {
    getDrivingTypeListApi,
    getSchoolCourseListApi,
    updateSchoolApi,
    uploadHeadPictureApi,
    uploadSchoolPicturesUrl,
    addSchoolCourseApi,
    updateSchoolCourseApi,
    deleteSchoolCourseApi,

  } from "@/api/school";

  import {regionData} from 'element-china-area-data'
  import {CodeToText} from 'element-china-area-data'

  import Pagination from '@/components/pagination'
  import {objectEvaluate} from "@/utils/common";

  import SchoolConsult from './school_consult'
  import CoachConsult from './coach_consult'
  import SchoolComment from './school_comment'
  import Appointment from './appointment'

  export default {
    name: "SchoolDetail",
    components: {
      SchoolConsult, CoachConsult, SchoolComment,
      PictureUploader, Pagination, Appointment
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
          schoolIntroduce: ''
        },
        form_i_rules: {
          headPicture: {required: true, message: '请上传驾校封面', trigger: 'change'},
          schoolFullName: {required: true, message: ' ', trigger: 'blur'},
          schoolShortName: {required: true, message: ' ', trigger: 'blur'},
          schoolNature: {required: true, message: ' ', trigger: 'change'},
          address: {required: true, message: ' ', trigger: 'blur'},
          contactPhone: {required: true, message: ' ', trigger: 'blur'},
          schoolIntroduce: {required: true, message: ' ', trigger: 'blur'}
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
        flag: true,

        /*驾校课程*/
        title: '',
        dialogTableVisible: false,
        schoolCourseId: Number,
        form_c_btn: false,
        isLoading: false,
        isLoadingButton: false,
        form_Data: [],
        form_c: {
          schoolCourseName: '',
          schoolCourseType: 'A1',
          schoolCoursePrice: 1
        },
        courseTypeOptions: [],
        form_c_rules: {
          schoolCourseName: {required: true, message: ' ', trigger: 'blur'},
          schoolCoursePrice: {type: 'number', required: true, message: ' ', trigger: 'change'},

        }

      }
    },
    mounted() {
      this.getDrivingTypeList()
    },
    computed: {
      baseApi() {
        return process.env.BASE_API
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
        // this.fileName = name;
        // this.file = data;
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
        data.schoolId = this.schoolId;
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

      // 上传成功
      uploadSuccess(response, file, fileList) {
        if (response.status === 200) {
          this.$successMsg('上传成功')
        } else {
          this.$errorMsg('上传失败')
        }
        file.pictureUrl = response.resultParm.message;
      },
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

      // 获得驾校课程类型
      getDrivingTypeList() {
        getDrivingTypeListApi().then(result => {
          this.courseTypeOptions = result.data.resultParm.drivingTypeList
        })
      },


      // 获得驾校课程
      getSchoolCourseList(id) {
        this.isLoading = true;
        let pagination = this.$refs.pagination.pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&schoolId=${id}`;
        getSchoolCourseListApi(param).then(result => {
          this.isLoading = false;
          let response = result.data.resultParm.schoolCourseList;
          this.form_Data = response.records;
          pagination.total = response.total;
        })
      },

      // 添加学校课程
      addSchoolCourse() {
        this.title = '添加课程';
        this.dialogTableVisible = true;
      },

      // 分页获得数据中介
      getC() {
        this.getSchoolCourseList(this.schoolId)
      },

      // 编辑
      editSchoolCourse(data) {
        this.title = '编辑课程';
        this.dialogTableVisible = true;
        this.schoolCourseId = data.schoolCourseId;
        objectEvaluate(data, this.form_c)
      },

      // 删除
      deleteCourse(id) {
        this.isLoadingButton = true;
        deleteSchoolCourseApi(id)
          .then(() => {
            this.isLoadingButton = false;
            this.$refs[id].doClose();
            this.getSchoolCourseList(this.schoolId)
          })
          .catch(() => {
            this.isLoadingButton = false;
            this.$refs[id].doClose()
          })
      },

      // 提交
      submitForm_c(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {...this.form_c};
            data.schoolId = this.schoolId;
            if (this.title === '添加课程') {
              this.form_c_btn = true;
              addSchoolCourseApi(data).then(() => {
                this.form_c_btn = false;
                this.getSchoolCourseList(this.schoolId);
                this.cancelCourse()
              }).catch(() => {
                this.form_c_btn = false;
              })
            } else {
              data.schoolCourseId = this.schoolCourseId;
              updateSchoolCourseApi(data).then(() => {
                this.form_c_btn = false;
                this.getSchoolCourseList(this.schoolId);
                this.cancelCourse()
              }).catch(() => {
                this.form_c_btn = false;
              })
            }
          } else {
            return false;
          }
        });
      },

      // 关闭课程表单
      cancelCourse() {
        this.dialogTableVisible = false;
        this.$refs['form_c'].resetFields();
        this.form_c.schoolCourseName = '';
        this.form_c.schoolCourseType = 'A1';
        this.form_c.schoolCoursePrice = 1
      },

      // 清空数据
      clearForm() {
        this.articleId = Number;
        this.imageUrl = '';
        this.$refs['form_i'].resetFields();
        this.$refs['SchoolPicture'].clearFiles();
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
