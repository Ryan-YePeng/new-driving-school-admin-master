<template>
  <div id="voucher">
    <el-card class="box-card" style="margin: 0 auto">
      <div slot="header" class="clearfix">
        <span>优惠劵列表</span>
        <el-button style="float: right" type="primary" @click="add">新增</el-button>
      </div>
      <div>
        <el-table :data="formData" max-height="100%" style="width: 100%">
          <el-table-column
                  prop="couponContent"
                  label="描述">
          </el-table-column>
          <el-table-column prop="username" label="优惠卷优惠劵">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="50" :src="baseUrl + scope.row.couponPicture">
                <img src="../../assets/noFoundPicture.png"/>
              </el-avatar>
            </template>
          </el-table-column>
          <el-table-column
                  prop="couponPrice"
                  label="优惠金额">
          </el-table-column>
          <el-table-column
                  prop="schoolCourseName"
                  label="课程名称">
          </el-table-column>
          <el-table-column label="开始时间">
            <template slot-scope="scope">
              <span>{{ scope.row.beginTime | formatDateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束时间">
            <template slot-scope="scope">
              <span>{{ scope.row.endTime | formatDateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button type="primary" @click="edit(scope.row)" icon="el-icon-edit" size="mini"></el-button>
              <el-popover
                      :ref="scope.row.couponId"
                      placement="top"
                      width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.couponId].doClose()">取消</el-button>
                  <el-button :loading="isLoadingButton" type="primary" size="mini"
                             @click.stop="deleteCoupon(scope.row.couponId)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog
            :title="title + '优惠劵'"
            width="600px"
            append-to-body
            @close="resetUploadForm"
            :close-on-click-modal="false"
            :visible.sync="dialogTableVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" hide-required-asterisk>
        <el-form-item label="描述" prop="couponContent">
          <el-input v-model="form.couponContent"></el-input>
        </el-form-item>
        <el-form-item label="优惠劵图片:" prop="couponPicture">
          <el-upload
                  ref="upload"
                  style="text-align: center"
                  class="carousel-uploader"
                  :action="baseApi+uploadUrl"
                  accept=".jpg,.png,.jepg,.jpeg"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="uploadSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="carousel-picture" style="width: 250px; height: auto;">
            <i v-else class="el-icon-plus" style="font-size: 70px;line-height: 150px;"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="优惠金额:" prop="couponPrice">
          <el-input-number v-model="form.couponPrice" :min="0.01" :precision="2"
                           :max="9999.99"></el-input-number>
        </el-form-item>
        <el-form-item label="课程名称" prop="schoolCourseId">
          <el-select v-model="form.schoolCourseId" placeholder="请选择活动区域">
            <el-option
                    v-for="item in courseList"
                    :key="item.schoolCourseId"
                    :label="item.schoolCourseName"
                    :value="item.schoolCourseId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="beginTime">
          <el-date-picker
                  v-model="form.beginTime"
                  type="datetime"
                  placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
                  v-model="form.endTime"
                  type="datetime"
                  placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')" :isloading="isDialogLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getCouponBySchoolIdApi,
    updateCouponApi,
    addCouponApi,
    deleteCouponApi,
    uploadCouponPictureUrl,
    getSchoolCourseListApi,
  } from "@/api/voucher";

  import {voucherPictureBaseUrl} from '@/utils/path'
  import {formatDateTime, objectEvaluate} from "@/utils/common";

  export default {
    name: 'Voucher',
    data() {
      return {
        formData: [],
        dialogTableVisible: false,
        /*上传文件*/
        uploadTableVisible: false,
        imageUrl: '',
        pictureName: '',

        title: '新增',

        form: {
          couponContent: '',
          couponPicture: '',
          couponPrice: 1,
          schoolCourseId: null,
          beginTime: '',
          endTime: ''
        },
        rules: {
          couponContent: {required: true, message: ' ', trigger: 'blur'},
          couponPicture: {required: true, message: '请上传图片', trigger: 'change'},
          couponPrice: {type: 'number', required: true, message: ' ', trigger: 'change'},
          schoolCourseId: {type: 'number', required: true, message: ' ', trigger: 'change'},
          beginTime: {required: true, message: ' ', trigger: 'blur'},
          endTime: {required: true, message: ' ', trigger: 'blur'},
        },
        couponId: 0,
        courseList: [],

        isDialogLoading: false,
        isLoadingButton: false
      }
    },
    computed: {
      baseUrl() {
        return voucherPictureBaseUrl
      },
      baseApi() {
        return process.env.VUE_APP_BASE_API
      },
      uploadUrl() {
        return uploadCouponPictureUrl
      },
      headers() {
        return {'Authorization': this.$store.getters.token}
      },
      schoolId() {
        return this.$store.getters.schoolId
      }
    },
    mounted() {
      this.getCouponBySchoolId();
      this.getSchoolCourseList();
    },
    methods: {
      // 获得优惠劵列表
      getCouponBySchoolId() {
        getCouponBySchoolIdApi(this.schoolId).then(result => {
          this.formData = result.data.resultParm.couponList
        })
      },
      // 获得课程列表
      getSchoolCourseList() {
        getSchoolCourseListApi(this.schoolId).then(result => {
          this.courseList = result.data.resultParm.courseList;
        })
      },
      // 添加轮播图
      add() {
        this.dialogTableVisible = true;
        this.title = '新增';
      },
      // 上传优惠劵成功
      uploadSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.couponPicture = res.resultParm.message
      },
      // 修改优惠劵
      edit(obj) {
        this.title = '编辑';
        objectEvaluate(obj, this.form);
        this.couponId = obj.couponId;
        this.imageUrl = this.baseUrl + obj.couponPicture;
        this.dialogTableVisible = true;
      },

      // 提交
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.isDialogLoading = true;
            let data = {...this.form};
            data.beginTime = formatDateTime(data.beginTime);
            data.endTime = formatDateTime(data.endTime);
            if (this.title === '新增') {
              addCouponApi(data).then(() => {
                this.isDialogLoading = false;
                this.getCouponBySchoolId();
                this.resetUploadForm();
              }).catch(() => {
                this.isDialogLoading = false;
              })
            } else {
              data.couponId = this.couponId;
              updateCouponApi(data).then(() => {
                this.isDialogLoading = false;
                this.getCouponBySchoolId();
                this.resetUploadForm();
              }).catch(() => {
                this.isDialogLoading = false;
              })
            }
          } else {
            return false;
          }
        });
      },
      // 删除优惠劵
      deleteCoupon(id) {
        this.isLoadingButton = true;
        deleteCouponApi(id)
            .then(() => {
              this.isLoadingButton = false;
              this.$refs[id].doClose();
              this.getCouponBySchoolId();
              this.resetUploadForm()
            })
            .catch(() => {
              this.isLoadingButton = false;
              this.$refs[id].doClose()
            })
      },
      // 重置上传表单
      resetUploadForm() {
        this.dialogTableVisible = false;
        this.$refs['upload'].clearFiles();
        this.$refs['form'].resetFields();
        Object.assign(this.$data.form, this.$options.data().form);
        this.imageUrl = '';
        this.pictureName = ''
      },
    }
  }
</script>


<style lang="scss">
  #voucher {
    .carousel-uploader {
      text-align: center !important;
    }

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
  }
</style>
