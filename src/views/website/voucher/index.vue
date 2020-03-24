<template>
  <user-list></user-list>
<!--  <div class="voucher">-->
  <!--    <el-tabs v-model="activeName" type="card">-->
  <!--      <el-tab-pane label="优惠劵" name="first">-->
  <!--        <voucher-list></voucher-list>-->
  <!--      </el-tab-pane>-->
  <!--      <el-tab-pane label="填表用户" name="second">-->
  <!--        <user-list></user-list>-->
  <!--      </el-tab-pane>-->
  <!--    </el-tabs>-->
  <!--  </div>-->
</template>

<script>
  // import VoucherList from './voucher_list'
  import UserList from './user_list'

  export default {
    name: "Voucher",
    components: {UserList},
    data() {
      return {
        activeName: 'first'
      }
    }
  }
</script>

<style scoped>
  .voucher {
    background: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 0 1px rgba(127, 127, 127, 0.3) inset;
  }
</style>
