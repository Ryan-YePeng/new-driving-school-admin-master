<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>驾校评论列表</span>
      </div>
      <div>
        <el-table v-loading="isLoading" :data="schoolCommentList" max-height="100%" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="评论内容：">
                  <span>{{ props.row.schoolCommentContent }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="username"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="schoolCommentContent"
            label="评论内容"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="schoolCommentScore"
            label="评分">
          </el-table-column>
          <el-table-column prop="createDate" label="评论时间" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.createDate | formatDateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="90">
            <template slot-scope="scope">
              <el-popover
                :ref="scope.row.schoolCommentId"
                placement="top"
                width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.schoolCommentId].doClose()">取消</el-button>
                  <el-button :loading="isLoadingButton" type="primary" size="mini"
                             @click.stop="deleteSchoolComment(scope.row.schoolCommentId)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" @getNewData="getSchoolCommentList"></pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getSchoolCommentListApi, deleteSchoolCommentApi} from '@/api/school'
  import Pagination from '@/components/pagination/index'

  export default {
    components: {Pagination},
    data() {
      return {
        isLoading: false,
        isLoadingButton: false,
        schoolCommentList: []
      }
    },
    computed: {
      schoolId() {
        return this.$store.getters.schoolId
      }
    },
    mounted() {
      this.getSchoolCommentList()
    },
    methods: {
      // 获得评论
      getSchoolCommentList() {
        this.isLoading = true;
        let pagination = this.$refs.pagination.pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&schoolId=${this.schoolId}`;
        getSchoolCommentListApi(param).then(result => {
          this.isLoading = false;
          let response = result.data.resultParm.schoolCommentList;
          this.schoolCommentList = response.records;
          pagination.total = response.total
        })
      },
      // 删除评论
      deleteSchoolComment(id) {
        this.isLoadingButton = true;
        deleteSchoolCommentApi(id)
          .then(() => {
            this.isLoadingButton = false;
            this.$refs[id].doClose();
            this.getSchoolCommentList()
          })
          .catch(() => {
            this.isLoadingButton = false;
            this.$refs[id].doClose()
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

