<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>填表用户列表</span>
    </div>
    <div>
      <el-table v-loading="isLoading" :data="userList" max-height="100%" style="width: 100%">
        <el-table-column
                prop="name"
                label="姓名">
        </el-table-column>
        <el-table-column
                prop="phone"
                label="手机号">
        </el-table-column>
        <el-table-column prop="createTime" label="填表时间" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | formatDateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-popover
                    :ref="scope.row.userId"
                    placement="top"
                    width="180">
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.userId].doClose()">取消</el-button>
                <el-button :loading="isLoadingButton" type="primary" size="mini"
                           @click.stop="deleteUser(scope.row.userId)">确定
                </el-button>
              </div>
              <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <pagination ref="pagination" @getNewData="getUserList"></pagination>
    </div>
  </el-card>
<!--  <div id="voucher-user-list">-->
  <!--  </div>-->
</template>

<script>
  import {getCouponUserListApi, deleteCouponUserByIdApi} from '@/api/voucher_new'
  import Pagination from '@/components/pagination'

  export default {
    name: 'UserList',
    components: {Pagination},
    data() {
      return {
        isLoading: false,
        isLoadingButton: false,
        userList: [],
        dialogTableVisible: false,
        resultObj: {}
      }
    },
    mounted() {
      this.getUserList()
    },
    methods: {
      getUserList() {
        this.isLoading = true;
        let pagination = this.$refs.pagination.pagination;
        let param = `current=${pagination.current}&size=${pagination.size}`;
        getCouponUserListApi(param).then(result => {
          this.isLoading = false;
          let response = result.data.resultParm.couponUserList.records;
          this.userList = response.records;
          pagination.total = response.total
        })
      },

      // 删除咨询
      deleteUser(id) {
        this.isLoadingButton = true;
        deleteCouponUserByIdApi(id)
            .then(() => {
              this.isLoadingButton = false;
              this.$refs[id].doClose();
              this.getUserList()
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
  #voucher-user-list {
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

