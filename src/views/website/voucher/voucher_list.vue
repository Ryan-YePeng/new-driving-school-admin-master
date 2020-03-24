<template>
  <div id="voucher">
    <el-card class="box-card" style="margin: 0 auto">
      <div slot="header" class="clearfix">
        <span>优惠劵列表</span>
        <el-button style="float: right" type="primary" @click="add">新增</el-button>
      </div>
      <div>
        <el-table :data="formData" max-height="100%" style="width: 100%">
          <el-table-column prop="username" label="优惠劵图片">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="50" :src="baseUrl + scope.row.couponPicture">
                <img src="../../../assets/noFoundPicture.png"/>
              </el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-popover
                      :ref="scope.row.couponPictureId"
                      placement="top"
                      width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.couponPictureId].doClose()">取消</el-button>
                  <el-button :loading="isLoadingButton" type="primary" size="mini"
                             @click.stop="deleteCoupon(scope.row.couponPictureId)">确定
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
            title="优惠劵列表"
            width="600px"
            append-to-body
            @close="resetUploadForm"
            :close-on-click-modal="false"
            :visible.sync="dialogTableVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" hide-required-asterisk>
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
    getAdminCouponPictureListApi,
    uploadCouponPictureUrl,
    deleteCouponPictureByIdApi,
    addCouponPictureApi
  } from "@/api/voucher_new";

  import {voucherPictureBaseUrl} from '@/utils/path'

  export default {
    name: 'VoucherList',
    data() {
      return {
        formData: [],
        dialogTableVisible: false,
        /*上传文件*/
        uploadTableVisible: false,
        imageUrl: '',
        pictureName: '',

        form: {
          couponPicture: ''
        },
        rules: {
          couponPicture: {required: true, message: '请上传图片', trigger: 'change'}
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
      }
    },
    mounted() {
      this.getAdminCouponPictureList()
    },
    methods: {
      // 获得课程列表
      getAdminCouponPictureList() {
        getAdminCouponPictureListApi().then(result => {
          this.formData = result.data.resultParm.couponPictureList;
        })
      },
      // 添加轮播图
      add() {
        this.dialogTableVisible = true;
      },
      // 上传优惠劵成功
      uploadSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.couponPicture = res.resultParm.message;
        if (res.status === 200) this.$successMsg('上传成功')
      },

      // 提交
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.isDialogLoading = true;
            let data = {...this.form};
            addCouponPictureApi(data).then(() => {
              this.isDialogLoading = false;
              this.getAdminCouponPictureList();
              this.resetUploadForm();
            }).catch(() => {
              this.isDialogLoading = false;
            })
          } else {
            return false;
          }
        });
      },
      // 删除优惠劵
      deleteCoupon(id) {
        this.isLoadingButton = true;
        deleteCouponPictureByIdApi(id)
            .then(() => {
              this.isLoadingButton = false;
              this.$refs[id].doClose();
              this.getAdminCouponPictureList();
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
