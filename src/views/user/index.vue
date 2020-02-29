<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
      </div>
      <div>
        <el-input placeholder="搜索注册号码" v-model="phoneText" clearable style="width: 180px" size="mini"
                  @keyup.enter.native="getUserList"></el-input>
        <el-input placeholder="搜索真实姓名" v-model="realNameText" clearable style="width: 180px" size="mini"
                  @keyup.enter.native="getUserList"></el-input>
        <el-select v-model="state" placeholder="搜索状态" size="mini" @change="getUserList">
          <el-option label="正常" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
        <el-button type="success" class="el-icon-search" size="mini" @click="getUserList">搜索</el-button>
        <el-table v-loading="isLoading" :data="userData" max-height="100%" style="width: 100%">
          <el-table-column
                  prop="username"
                  label="账号"
                  :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
                  prop="nickname"
                  label="昵称"
                  :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
                  prop="realName"
                  label="真实姓名"
                  :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
                  prop="gender"
                  label="性别">
          </el-table-column>
          <el-table-column
                  prop="position"
                  label="位置"
                  width="250px"
                  :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="权限">
            <template slot-scope="scope">
              <span v-if="scope.row.authorities[0].authority == 'ROLE_COACH'">教练</span>
              <span v-if="scope.row.authorities[0].authority == 'ROLE_SCHOOL'">驾校</span>
              <span v-if="scope.row.authorities[0].authority == 'ROLE_STUDENT'">学员</span>
              <span v-if="scope.row.authorities[0].authority == 'ROLE_ADMIN'">总管理员</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag type="info" v-if="scope.row.isForbidden==false">正常</el-tag>
              <el-tag type="danger" v-if="scope.row.isForbidden==true">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <el-popover
                      :ref="scope.row.id"
                      placement="top"
                      width="180">
                <p>确定更改用户状态吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                  <el-button :loading="isLoadingButton" type="primary" size="mini"
                             @click.stop="changeUser(scope.row)">确认
                  </el-button>
                </div>
                <el-button v-if="scope.row.isForbidden==false" slot="reference" type="danger" size="mini" @click.stop>
                  禁用
                </el-button>
                <el-button v-if="scope.row.isForbidden==true" slot="reference" type="success" size="mini" @click.stop>
                  启用
                </el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" @getNewData="getUserList"></pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getUserListApi, updateUserApi} from "@/api/user";
  import Pagination from '@/components/pagination'

  export default {
    name: 'UserCount',
    components: {Pagination},
    data() {
      return {
        userData: [],
        isLoading: false,
        realNameText: '',
        phoneText: '',
        state: '0',
        isLoadingButton: false
      }
    },
    mounted() {
      this.getUserList();
    },
    methods: {
      // 获取列表
      getUserList() {
        this.isLoading = true;
        let pagination = this.$refs['pagination'].pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&username=${this.phoneText}&realName=${this.realNameText}&province=&city=&area=&isForbidden=${this.state}`;
        getUserListApi(param).then(result => {
          let response = result.data.resultParm.userList;
          this.userData = response.records;
          this.userData.forEach(item => {
            item['position'] = `${item['province']} ${item['city']} ${item['area']}`;
          });
          pagination.total = response.total;
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        });
      },
      // 禁用和启用
      changeUser(obj) {
        let data = {};
        data.id = obj.id;
        data.isForbidden = !obj.isForbidden;
        this.isLoadingButton = true;
        updateUserApi(data)
            .then(() => {
              this.isLoadingButton = false;
              this.$refs[obj.id].doClose();
              this.getUserList()
            })
            .catch(() => {
              this.isLoadingButton = false;
              this.$refs[obj.id].doClose()
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
