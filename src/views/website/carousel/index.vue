<template>
  <div id="carouselPicture">
    <card ref="Card" style="width: 70%;margin: 0 auto">
      <div slot="header">
        <span>轮播图列表</span>
        <el-button style="float: right" type="primary" @click="addPicture">新增</el-button>
      </div>
      <el-table :data="formData" max-height="100%" style="width: 100%">
        <el-table-column prop="username" label="图片">
          <template slot-scope="scope">
            <el-avatar shape="square" :size="50" :src="baseApi + scope.row.pictureName">
              <img src="../../../assets/noFoundPicture.png"/>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="80">
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
    </card>
    <el-dialog
        title="上传轮播图"
        width="600px"
        append-to-body
        @close="resetUploadForm"
        :close-on-click-modal="false"
        :visible.sync="dialogTableVisible">
      <el-form :model="form" :rules="rules" ref="Form" label-width="120px">
        <el-form-item label="上传图片:" prop="pictureName">
          <upload-carousel v-model="form.pictureName"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()" :loading="isDialogLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getPictureListApi, deletePictureApi, addPictureApi} from '@/api/carousel_picture'
  import UploadCarousel from './UploadCarousel'

  export default {
    name: 'Carousel',
    data() {
      return {
        formData: [],
        dialogTableVisible: false,
        isDialogLoading: false,
        isLoadingButton: false,
        form: {
          pictureName: ''
        },
        rules: {
          pictureName: {required: true, message: '请上传图片', trigger: 'change'}
        }
      }
    },
    components: {UploadCarousel},
    computed: {
      baseApi() {
        return process.env.VUE_APP_BASE_API
      },
    },
    mounted() {
      this.getPictureList()
    },
    methods: {
      // 获得图片列表
      getPictureList() {
        this.$refs.Card.start();
        getPictureListApi().then(result => {
          this.$refs.Card.stop();
          this.formData = result.data.resultParm.pictureList
        })
      },
      // 添加轮播图
      addPicture() {
        this.dialogTableVisible = true
      },
      // 提交
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            this.isDialogLoading = true;
            addPictureApi({pictureName: this.form.pictureName}).then(() => {
              this.isDialogLoading = false;
              this.resetUploadForm();
              this.getPictureList();
            }).catch(() => {
              this.isDialogLoading = false;
            })
          } else {
            return false;
          }
        });
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
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].clearValidate()
      }
    }
  }
</script>
