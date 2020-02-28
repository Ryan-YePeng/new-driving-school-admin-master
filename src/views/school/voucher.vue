<template>
  <div id="voucher">
    <el-card class="box-card" style="margin: 0 auto">
      <div slot="header" class="clearfix">
        <span>优惠劵列表</span>
        <el-button style="float: right" type="primary" @click="addPicture">新增</el-button>
      </div>
      <div>
        <el-table :data="formData" max-height="100%" style="width: 100%">
          <el-table-column
                  prop="couponContent"
                  label="描述">
          </el-table-column>
          <el-table-column prop="username" label="优惠卷图片">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="50" :src="baseUrl + scope.row.pictureName">
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
          <el-table-column label="操作" align="center" width="80">
            <el-button style="float: right" type="primary" @click="edit" icon="el-icon-edit"></el-button>
            <template slot-scope="scope">
              <el-popover
                      :ref="scope.row.pictureId"
                      placement="top"
                      width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.pictureId].doClose()">取消</el-button>
                  <el-button :loading="isLoadingButton" type="primary" size="mini"
                             @click.stop="deletePicture(scope.row.pictureId)">确定
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
      <el-form label-width="120px">


        <el-form-item label="上传图片:">
          <el-upload
                  ref="upload"
                  class="carousel-uploader"
                  :action="baseApi+uploadUrl"
                  accept=".jpg,.png,.gif,.jepg,.jpeg"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="uploadSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="carousel-picture" style="width: 250px; height: auto;">
            <i v-else class="el-icon-plus" style="font-size: 70px;line-height: 150px"></i>
          </el-upload>
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

  export default {
    name: 'Voucher',
    props: {
      schoolId: {
        type: Number,
        default: () => 0
      }
    },
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
          schoolCourseId: '',
          beginTime: Date,
          endTime: Date
        },

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
      }
    },
    mounted() {
      this.getCouponBySchoolId();
      this.getSchoolCourseList();
    },
    methods: {
      // 获得图片列表
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
      addPicture() {
        this.dialogTableVisible = true
      },
      // 上传图片成功
      uploadSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.pictureName = res.resultParm.message
      },
      // 修改优惠劵
      edit() {
      },

      // 提交
      submitForm() {
        if (!this.pictureName) {
          this.$warnMsg('请上传图片');
          return
        }
        this.isDialogLoading = true;
        addPictureApi({pictureName: this.pictureName}).then(() => {
          this.isDialogLoading = false;
          this.resetUploadForm();
          this.getPictureList();
        }).catch(() => {
          this.isDialogLoading = false;
        })
      },
      // 删除图片
      deletePicture(id) {
        this.isLoadingButton = true;
        deletePictureApi(id)
            .then(() => {
              this.isLoadingButton = false;
              this.$refs[id].doClose();
              this.getPictureList()
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
        this.imageUrl = '';
        this.pictureName = ''
      },
    }
  }
</script>


<style lang="scss">
  #voucher {
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
