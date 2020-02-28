<template>
  <div id="phone-list">
    <el-card class="box-card" style="margin: 0 auto">
      <div slot="header" class="clearfix">
        <span>入驻电话列表</span>
        <el-button style="float: right" type="primary" @click="addPhone">新增</el-button>
      </div>
      <div>
        <el-table :data="formData" max-height="100%" style="width: 100%">
          <el-table-column
                  prop="phone"
                  label="电话">
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template slot-scope="scope">
              <el-popover
                      :ref="scope.row.phone"
                      placement="top"
                      width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.phone].doClose()">取消</el-button>
                  <el-button :loading="isLoadingButton" type="primary" size="mini"
                             @click.stop="deletePhone(scope.row.phone)">确定
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
            title="新增电话"
            width="600px"
            append-to-body
            @close="resetUploadForm"
            :close-on-click-modal="false"
            :visible.sync="dialogTableVisible">
      <el-form :model="form" :rules="rules" ref="Form" label-width="100px" hide-required-asterisk>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()" :isloading="isDialogLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getPhoneListApi,
    deletePhoneApi,
    addPhoneApi
  } from '@/api/phone'

  export default {
    data() {
      return {
        formData: [],
        form: {
          phone: ''
        },
        dialogTableVisible: false,
        isDialogLoading: false,
        isLoadingButton: false,
        rules: {
          phone: {required: true, message: '请输入电话', trigger: 'blur'}
        }
      }
    },
    mounted() {
      this.getPhoneList()
    },
    methods: {
      // 获得图片列表
      getPhoneList() {
        getPhoneListApi().then(result => {
          this.formData = result.data.resultParm.phoneList
        })
      },
      // 新增电话
      addPhone() {
        this.dialogTableVisible = true
      },
      // 提交
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            addPhoneApi({phone: this.form.phone}).then(() => {
              this.isDialogLoading = false;
              this.resetUploadForm();
              this.getPhoneList();
            }).catch(() => {
              this.isDialogLoading = false;
            })
          } else {
            return false;
          }
        });
      },
      // 删除电话
      deletePhone(id) {
        this.isLoadingButton = true;
        deletePhoneApi(id)
            .then(() => {
              this.isLoadingButton = false;
              this.$refs[id].doClose();
              this.getPhoneList()
            })
            .catch(() => {
              this.isLoadingButton = false;
              this.$refs[id].doClose()
            })
      },
      // 重置上传表单
      resetUploadForm() {
        this.$refs['Form'].resetFields();
        this.dialogTableVisible = false
      },
    }
  }
</script>


<style lang="scss">
  #phone-list {
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both
    }

    .box-card {
      width: 70%;
    }

    .carousel-uploader-icon {
      line-height: 150px !important;
    }
  }
</style>
