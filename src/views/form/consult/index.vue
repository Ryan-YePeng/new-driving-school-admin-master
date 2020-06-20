<template>
  <div id="school-consult">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>报名咨询列表</span>
      </div>
      <div>
        <el-table v-loading="isLoading" :data="schoolConsultList" max-height="100%" style="width: 100%">
          <el-table-column
              prop="realName"
              label="姓名">
          </el-table-column>
          <el-table-column
              prop="username"
              label="手机号">
          </el-table-column>
          <el-table-column
              prop="question"
              label="地区"
              :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="驾校名称" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.school | formatObj('schoolFullName') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="咨询时间" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | formatDateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-popover
                  :ref="scope.row.schoolConsultId"
                  placement="top"
                  width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.schoolConsultId].doClose()">取消</el-button>
                  <el-button :loading="isLoadingButton" type="primary" size="mini"
                             @click.stop="deleteSchoolConsult(scope.row.schoolConsultId)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" @getNewData="getSchoolConsultList"></pagination>
      </div>
    </el-card>
    <el-dialog
        title="回复"
        width="600px"
        append-to-body
        @close="cancel"
        :close-on-click-modal="false"
        :visible.sync="dialogTableVisible">
      <el-form :model="form" :rules="rules" ref="Form" label-width="100px" hide-required-asterisk>
        <el-form-item label="回复内容" prop="schoolReplyContent">
          <el-input type="textarea" v-model="form.schoolReplyContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('Form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getAllSchoolConsultApi, deleteSchoolConsultApi} from '@/api/school'
  import Pagination from '@/components/pagination'

  export default {
    components: {Pagination},
    props: {
      schoolId: {
        type: Number,
        default: () => 0
      }
    },
    data() {
      return {
        isLoading: false,
        isLoadingButton: false,
        schoolConsultList: [],
        dialogTableVisible: false,
        form: {
          schoolConsultId: 0,
          schoolReplyContent: ''
        },
        rules: {
          schoolReplyContent: {required: true, message: '请输入回复内容', trigger: 'blur'}
        },
        resultObj: {}
      }
    },
    mounted() {
      this.getSchoolConsultList()
    },
    methods: {
      // 获得咨询
      getSchoolConsultList() {
        this.isLoading = true;
        let pagination = this.$refs.pagination.pagination;
        let param = `current=${pagination.current}&size=${pagination.size}`;
        getAllSchoolConsultApi(param).then(result => {
          this.isLoading = false;
          let response = result.data.resultParm.schoolConsultList;
          this.schoolConsultList = response.records;
          pagination.total = response.total
        })
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            data.schoolConsultId = this.resultObj.schoolConsultId;
            addSchoolReplyApi(data).then(() => {
              this.cancel()
            })
          } else {
            return false;
          }
        });
      },

      cancel() {
        this.$refs['Form'].resetFields();
        this.dialogTableVisible = false;
        Object.assign(this.$data.form, this.$options.data().form);
        Object.assign(this.$data.resultObj, this.$options.data().resultObj);
      },

      // 删除咨询
      deleteSchoolConsult(id) {
        this.isLoadingButton = true;
        deleteSchoolConsultApi(id)
          .then(() => {
            this.isLoadingButton = false;
            this.$refs[id].doClose();
            this.getSchoolConsultList()
          })
          .catch(() => {
            this.isLoadingButton = false;
            this.$refs[id].doClose()
          })
      }
    }
  }
</script>

<style lang="scss">
  #school-consult {
    .el-textarea__inner {
      min-height: 130px !important;
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

