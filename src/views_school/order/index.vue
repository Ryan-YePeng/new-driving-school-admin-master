<template>
  <div id="Order" style="background-color: white;padding: 10px 20px;border-radius: 5px">
    <el-page-header @back="goBack" content="驾校列表"></el-page-header>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>订单列表</span>
      </div>
      <div>
        <el-table v-loading="isLoading" :data="formData" max-height="100%">
          <el-table-column
            prop="outTradeNo"
            label='商品订单号'>
          </el-table-column>
          <el-table-column
            prop="realName"
            label='学生姓名'>
          </el-table-column>
          <el-table-column
            prop="contactPhone"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="unitPrice"
            label="单价">
          </el-table-column>
          <el-table-column
            prop="couponPrice"
            label="优惠金额">
          </el-table-column>
          <el-table-column
            prop="actualPrice"
            label="实际价格">
          </el-table-column>
          <el-table-column label="订单状态">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.orderState == 1">支付成功</el-tag>
              <el-tag type="danger" v-if="scope.row.orderState == 0">支付失败</el-tag>
              <el-tag type="warning" v-if="scope.row.orderState == 2">支付中</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <el-popover
                :ref="scope.row.orderId"
                placement="top"
                width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.orderId].doClose()">取消
                  </el-button>
                  <el-button :loading="isLoadingButton" type="primary" size="mini"
                             @click.stop="deleteOrder(scope.row.orderId)">确定
                  </el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" @getNewData="getOrderList"></pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getOrderListApi, deleteOrderApi} from '@/api/order'
  import Pagination from '@/components/pagination'

  export default {
    components: {Pagination},
    data() {
      return {
        formData: [],
        isLoading: false,
        isLoadingButton: false
      }
    },
    computed: {
      schoolId() {
        return this.$store.getters.schoolId
      }
    },
    mounted() {
      this.getOrderList();
    },
    methods: {
      // 获取订单
      getOrderList() {
        this.isLoading = true;
        let pagination = this.$refs['pagination'].pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&schoolId=${this.schoolId}&orderState=`;
        getOrderListApi(param).then(result => {
          let response = result.data.resultParm.orderList;
          this.formData = response.records;
          pagination.total = response.total;
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        });
      },
      // 删除订单
      deleteOrder(id) {
        this.isLoadingButton = true;
        deleteOrderApi(id)
          .then(() => {
            this.isLoadingButton = false;
            this.$refs[id].doClose();
            this.getOrderList()
          })
          .catch(() => {
            this.isLoadingButton = false;
            this.$refs[id].doClose()
          })
      },
      // 退出
      goBack() {
        this.$msgBox('确认退出？').then(() => {
          this.$emit('tab')
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

