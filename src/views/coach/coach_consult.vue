<template>
  <div id="coach-consult">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>教练咨询列表</span>
      </div>
      <div>
        <el-table v-loading="isLoading" :data="coachConsultList" max-height="100%" style="width: 100%">
          <!--          <el-table-column type="expand">-->
          <!--            <template slot-scope="props">-->
          <!--              <el-form label-position="left" inline class="demo-table-expand">-->
          <!--                <el-form-item label="地区：">-->
          <!--                  <span>{{ props.row.question }}</span>-->
          <!--                </el-form-item>-->
          <!--              </el-form>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
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
          <el-table-column prop="createTime" label="咨询时间" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | formatDateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <!--              <el-button type="primary" @click="addReply(scope.row)" size="mini">回复</el-button>-->
              <el-popover
                      :ref="scope.row.coachConsultId"
                      placement="top"
                      width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.coachConsultId].doClose()">取消</el-button>
                  <el-button :loading="isLoadingButton" type="primary" size="mini"
                             @click.stop="deleteCoachConsult(scope.row.coachConsultId)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" @getNewData="getCoachConsultList"></pagination>
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
        <el-form-item label="回复内容" prop="coachReplyContent">
          <el-input type="textarea" v-model="form.coachReplyContent"></el-input>
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
  import {getCoachConsultListByCoachIdApi, deleteCoachConsultApi} from '@/api/coach'
  import {getCoachReplyByConsultIdApi, addCoachReplyApi} from '@/api/reply'
  import Pagination from '@/components/pagination'

  export default {
    components: {Pagination},
    props: {
      coachId: {
        type: Number,
        default: () => 0
      }
    },
    data() {
      return {
        isLoading: false,
        isLoadingButton: false,
        coachConsultList: [],
        dialogTableVisible: false,
        form: {
          coachConsultId: 0,
          coachReplyContent: ''
        },
        rules: {
          coachReplyContent: {required: true, message: '请输入回复内容', trigger: 'blur'}
        },
        resultObj: {}
      }
    },
    mounted() {
      this.getCoachConsultList()
    },
    methods: {
      // 获得咨询
      getCoachConsultList() {
        this.isLoading = true;
        let pagination = this.$refs.pagination.pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&coachId=${this.coachId}`;
        getCoachConsultListByCoachIdApi(param).then(result => {
          this.isLoading = false;
          let response = result.data.resultParm.coachConsultList;
          this.coachConsultList = response.records;
          pagination.total = response.total
        })
      },

      // 回复
      addReply(obj) {
        this.dialogTableVisible = true;
        this.resultObj = obj
      },

      // 查看回复
      getCoachReply(obj) {
        getCoachReplyByConsultIdApi(obj.coachConsultId).then(result => {
          console.log(result)
        })
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            data.coachConsultId = this.resultObj.coachConsultId;
            addCoachReplyApi(data).then(() => {
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
      deleteCoachConsult(id) {
        this.isLoadingButton = true;
        deleteCoachConsultApi(id)
            .then(() => {
              this.isLoadingButton = false;
              this.$refs[id].doClose();
              this.getCoachConsultList()
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
  #coach-consult {
    .el-textarea__inner {
      min-height: 150px !important;
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

