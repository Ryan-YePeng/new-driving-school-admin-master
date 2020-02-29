<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>学生预约</span>
      </div>
      <div>
        <el-table v-loading="isLoading" :data="foreSpeakList" max-height="100%" style="width: 100%">
          <el-table-column
                  prop="realName"
                  label="学生姓名">
          </el-table-column>
          <el-table-column
                  prop="contactPhone"
                  label="联系电话">
          </el-table-column>
          <el-table-column label="预约时间" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ scope.row.foreSpeakTime | formatDateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="预约状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.foreSpeakState==true" type="success">已预约</el-tag>
              <el-tag v-if="scope.row.foreSpeakState==false" type="warning">预约中</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template slot-scope="scope">
              <el-popover
                      :ref="scope.row.foreSpeakId"
                      placement="top"
                      width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.foreSpeakId].doClose()">取消</el-button>
                  <el-button :loading="isLoadingButton" type="primary" size="mini"
                             @click.stop="deleteForeSpeak(scope.row.foreSpeakId)">确认
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" size="mini" @click.stop class="el-icon-delete"></el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" @getNewData="getForeSpeakList"></pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getForeSpeakListApi, deleteForeSpeakByIdApi} from '@/api/school'
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
          let response = result.data.resultParm.foreSpeakList;
          this.foreSpeakList = response.records;
          pagination.total = response.total
        })
      },

      // 删除预约
      deleteForeSpeak(id) {
        this.isLoadingButton = true;
        deleteForeSpeakByIdApi(id)
            .then(() => {
              this.isLoadingButton = false;
              this.$refs[id].doClose();
              this.getForeSpeakList()
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

