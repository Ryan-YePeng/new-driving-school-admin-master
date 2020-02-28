<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>驾校咨询列表</span>
      </div>
      <div>
        <el-table v-loading="isLoading" :data="schoolConsultList" max-height="100%" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="咨询内容：">
                  <span>{{ props.row.question }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
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
            label="咨询内容"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="createTime" label="咨询时间" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | formatDateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
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
  </div>
</template>

<script>
  import {getSchoolConsultListApi, deleteSchoolConsultApi} from '@/api/school'
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
        schoolConsultList: []
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
        let param = `current=${pagination.current}&size=${pagination.size}&schoolId=${this.schoolId}`;
        getSchoolConsultListApi(param).then(result => {
          this.isLoading = false;
          let response = result.data.resultParm.schoolConsultList;
          this.schoolConsultList = response.records;
          pagination.total = response.total
        })
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

