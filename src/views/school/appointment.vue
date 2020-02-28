<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>学生预约</span>
      </div>
      <div>
        <el-table v-loading="isLoading" :data="foreSpeakList" max-height="100%" style="width: 100%">
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
        </el-table>
        <pagination ref="pagination" @getNewData="getForeSpeakList"></pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getForeSpeakListApi} from '@/api/school'
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
        foreSpeakList: []
      }
    },
    mounted() {
      this.getForeSpeakList()
    },
    methods: {
      // 获得咨询
      getForeSpeakList() {
        this.isLoading = true;
        let pagination = this.$refs.pagination.pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&schoolId=${this.schoolId}`;
        getForeSpeakListApi(param).then(result => {
          this.isLoading = false;
          let response = result.data.resultParm.ForeSpeakList;
          this.ForeSpeakList = response.records;
          pagination.total = response.total
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

