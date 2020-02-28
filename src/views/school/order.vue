<template>
  <div id="Order" style="background-color: white;border-radius: 5px">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>驾校订单</span>
        <el-select style="float: right" v-model="orderState" placeholder="搜索文章类型" clearable size="mini"
                   @change="getOrderList">
          <el-option label="支付成功" value="1"></el-option>
          <el-option label="支付中" value="2"></el-option>
          <el-option label="支付失败" value="0"></el-option>
        </el-select>
      </div>
      <div>
        <el-table v-loading="isLoading" :data="formData" max-height="100%">

          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="商品订单号">
                  <span>{{ props.row.outTradeNo }}</span>
                </el-form-item>
                <el-form-item label="学生姓名">
                  <span>{{ props.row.realName }}</span>
                </el-form-item>
                <el-form-item label="学校名称">
                  <span>{{ props.row.schoolName }}</span>
                </el-form-item>
                <el-form-item label="课程类型">
                  <span>{{ props.row.schoolCourseType }}</span>
                </el-form-item>
                <el-form-item label="课程名称">
                  <span>{{ props.row.schoolCourseName }}</span>
                </el-form-item>
                <el-form-item label="联系电话">
                  <span>{{ props.row.contactPhone }}</span>
                </el-form-item>
                <el-form-item label="单价">
                  <span>{{ props.row.unitPrice }}</span>
                </el-form-item>
                <el-form-item label="优惠金额">
                  <span>{{ props.row.couponPrice }}</span>
                </el-form-item>
                <el-form-item label="实际价格">
                  <span>{{ props.row.actualPrice }}</span>
                </el-form-item>
                <el-form-item label="支付方式">
                  <span>{{ props.row.payment }}</span>
                </el-form-item>
                <el-form-item label="订单状态">
                  <el-tag type="success" v-if="props.row.orderState == 1">支付成功</el-tag>
                  <el-tag type="danger" v-if="props.row.orderState == 0">支付失败</el-tag>
                  <el-tag type="warning" v-if="props.row.orderState == 2">支付中</el-tag>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.createTime | formatDateTime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column
                  width="200"
                  prop="outTradeNo"
                  label='商品订单号'>
          </el-table-column>
          <el-table-column
                  prop="realName"
                  label='学生姓名'>
          </el-table-column>
          <el-table-column
                  prop="schoolCourseName"
                  label="课程名称">
          </el-table-column>
          <el-table-column
                  prop="contactPhone"
                  label="联系电话">
          </el-table-column>
          <el-table-column
                  prop="actualPrice"
                  label="实际价格">
          </el-table-column>
          <el-table-column
                  prop="payment"
                  label="支付方式">
          </el-table-column>
          <el-table-column label="订单状态">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.orderState == 1">支付成功</el-tag>
              <el-tag type="danger" v-if="scope.row.orderState == 0">支付失败</el-tag>
              <el-tag type="warning" v-if="scope.row.orderState == 2">支付中</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | formatDateTime }}</span>
            </template>
          </el-table-column>
          <!--          <el-table-column label="操作" align="center" width="80">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-popover-->
          <!--                      :ref="scope.row.orderId"-->
          <!--                      placement="top"-->
          <!--                      width="180">-->
          <!--                <p>确定删除本条数据吗？</p>-->
          <!--                <div style="text-align: right; margin: 0">-->
          <!--                  <el-button size="mini" type="text" @click="$refs[scope.row.orderId].doClose()">取消-->
          <!--                  </el-button>-->
          <!--                  <el-button :loading="isLoadingButton" type="primary" size="mini"-->
          <!--                             @click.stop="deleteOrder(scope.row.orderId)">确定-->
          <!--                  </el-button>-->
          <!--                </div>-->
          <!--                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" @click.stop/>-->
          <!--              </el-popover>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
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
    name: 'Order',
    components: {Pagination},
    props: {
      schoolId: {
        type: Number,
        default: () => 0
      }
    },
    data() {
      return {
        formData: [],
        isLoading: false,
        isLoadingButton: false,
        orderState: ''
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
        let param = `current=${pagination.current}&size=${pagination.size}&schoolId=${this.schoolId}&orderState=${this.orderState}`;
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

