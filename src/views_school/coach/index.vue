<template>
  <div>
    <div v-show="isShow">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>教练列表</span>
        </div>
        <div>
          <el-input placeholder="搜索姓名" v-model="searchName" clearable style="width: 180px" size="mini"
                    @keyup.enter.native="getCoachList"></el-input>
          <el-input placeholder="搜索手机号" v-model="searchPhone" clearable style="width: 180px" size="mini"
                    @keyup.enter.native="getCoachList"></el-input>
          <el-input placeholder="搜索驾校" v-model="searchSchool" clearable style="width: 180px" size="mini"
                    @keyup.enter.native="getCoachList"></el-input>
          <el-button type="success" class="el-icon-search" size="mini" @click="getCoachList">搜索</el-button>
          <el-table v-loading="isLoading" :data="coachData" max-height="100%" style="width: 100%">
            <el-table-column
                    prop="realName"
                    label="教练名">
            </el-table-column>
            <el-table-column
                    prop="coachGender"
                    label="性别">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="电话">
            </el-table-column>
            <el-table-column
                    prop="schoolFullName"
                    :show-overflow-tooltip="true"
                    label="所属驾校">
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-button type="primary" @click="edit(scope.row)" size="mini" class="el-icon-zoom-in"></el-button>
                <el-popover
                        :ref="scope.row.coachId"
                        placement="top"
                        width="180">
                  <p>确定删除本条数据吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs[scope.row.coachId].doClose()">取消</el-button>
                    <el-button :loading="isLoadingButton" type="primary" size="mini"
                               @click.stop="deleteCoach(scope.row.coachId)">确定
                    </el-button>
                  </div>
                  <el-button slot="reference" type="danger" size="mini" @click.stop class="el-icon-delete"></el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <pagination ref="pagination" @getNewData="getCoachList"></pagination>
        </div>
      </el-card>
    </div>
    <div v-show="!isShow && flag==='edit'">
      <coach-detail ref="CoachDetail" @tab="tab" @update="getCoachList"></coach-detail>
    </div>
  </div>
</template>

<script>
  import CoachDetail from './detail'

  import {
    getCoachListApi,
    deleteCoachApi
  } from "@/api/coach";

  import Pagination from '@/components/pagination'
  import {objectEvaluate} from "@/utils/common";

  import {TextToCode} from 'element-china-area-data'

  export default {
    components: {Pagination, CoachDetail},
    data() {
      return {
        flag: '',
        isShow: true,
        coachData: [],
        isLoading: false,
        isLoadingButton: false,
        searchTitle: '',
        searchType: '',
        options: [],

        searchName: '',
        searchPhone: '',
        searchSchool: ''
      }
    },
    mounted() {
      this.getCoachList();
    },
    methods: {
      // 切换
      tab() {
        this.isShow = !this.isShow
      },
      // 获取列表
      getCoachList() {
        this.flag = 'edit';
        this.isLoading = true;
        let pagination = this.$refs['pagination'].pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&realName=${this.searchName}&username=${this.searchPhone}&schoolFullName=${this.searchSchool}`;
        getCoachListApi(param).then(result => {
          let response = result.data.resultParm.coachList;
          this.coachData = response.records;
          pagination.total = response.total;
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
      },
      // 删除教练
      deleteCoach(id) {
        this.isLoadingButton = true;
        deleteCoachApi(id)
            .then(() => {
              this.isLoadingButton = false;
              this.$refs[id].doClose();
              this.getCoachList()
            })
            .catch(() => {
              this.isLoadingButton = false;
              this.$refs[id].doClose()
            })
      },
      // 修改教练
      edit(data) {
        try {
          this.flag = 'edit';
          let _this = this.$refs['CoachDetail'];
          _this.coachId = data.coachId;
          _this.schoolId = data.schoolId;
          objectEvaluate(data, _this.form_i);
          _this.selectedOptions = [];
          if (data.province) _this.selectedOptions.push(TextToCode[data.province].code);
          if (data.city) _this.selectedOptions.push(TextToCode[data.province][data.city].code);
          if (data.area) _this.selectedOptions.push(TextToCode[data.province][data.city][data.area].code);

          /*驾校咨询*/
          objectEvaluate(data, _this.form_r);
        } finally {
          this.tab()
        }
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
