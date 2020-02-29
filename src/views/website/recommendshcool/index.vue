<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>驾校列表</span>
      </div>
      <div>
        <el-input placeholder="搜索驾校名" v-model="schoolFullNameText" clearable style="width: 180px" size="mini"
                  @keyup.enter.native="getSchoolList"></el-input>
        <el-button type="success" class="el-icon-search" size="mini" @click="getSchoolList">搜索</el-button>
        <el-table v-loading="isLoading" :data="schoolData" max-height="100%" style="width: 100%">
          <el-table-column
                  prop="schoolFullName"
                  label="驾校全称"
                  :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
                  prop="schoolNature"
                  label="驾校性质">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="详细地址"
                  :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
                  prop="realName"
                  label="联系人">
          </el-table-column>
          <el-table-column
                  prop="contactPhone"
                  label="联系电话"
                  :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
                  prop="username"
                  label="注册号码"
                  :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <el-popover
                      :ref="scope.row.schoolId"
                      placement="top"
                      width="180">
                <p>确定取消该推荐驾校吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.schoolId].doClose()">取消</el-button>
                  <el-button :loading="isLoadingButton" type="primary" size="mini"
                             @click.stop="cancelSchool(scope.row.schoolId)">确认
                  </el-button>
                </div>
                <el-button slot="reference" type="warning" size="mini" @click.stop class="el-icon-delete">取消推荐
                </el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <pagination ref="pagination" @getNewData="getSchoolList"></pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getSchoolListApi} from "@/api/school";
  import {schoolDisRecommendApi} from "@/api/school";
  import Pagination from '@/components/pagination'

  export default {
    name: 'RecommendSchool',
    components: {Pagination},
    data() {
      return {
        schoolData: [],
        isLoading: false,
        schoolFullNameText: '',
        isLoadingButton: false
      }
    },
    mounted() {
      this.getSchoolList();
    },
    methods: {
      // 获取列表
      getSchoolList() {
        this.isLoading = true;
        let pagination = this.$refs['pagination'].pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&schoolFullName=${this.schoolFullNameText}&provinceName=&cityName=&areaName=&isRecommend=1`;
        getSchoolListApi(param).then(result => {
          let response = result.data.resultParm.schoolList;
          this.schoolData = response.records;
          pagination.total = response.total;
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        });
      },
      // 取消推荐
      cancelSchool(id) {
        this.isLoadingButton = true;
        schoolDisRecommendApi(id)
            .then(() => {
              this.isLoadingButton = false;
              this.$refs[id].doClose();
              this.getSchoolList()
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
