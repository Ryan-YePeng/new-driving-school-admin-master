<template>
  <card>
    <div slot="header">
      <el-input placeholder="搜索姓名" v-model="searchName" clearable style="width: 150px" size="mini"
                @keyup.enter.native="getCoachApply"></el-input>
      <el-input placeholder="搜索手机号" v-model="searchPhone" clearable style="width: 150px" size="mini"
                @keyup.enter.native="getCoachApply"></el-input>
      <el-select v-model="searchState" placeholder="搜索审核状态" clearable size="mini" @change="getCoachApply"
                 style="width: 150px">
        <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button type="success" class="el-icon-search" size="mini" @click="getCoachApply"></el-button>
    </div>
    <el-table v-loading="isLoading" :data="coachInData">
      <el-table-column
          prop="realName"
          label="真实姓名">
      </el-table-column>
      <el-table-column
          prop="coachGender"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="username"
          label="手机号">
      </el-table-column>
      <el-table-column
          prop="idNumber"
          label="身份证号"
          :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
          prop="position"
          label="位置"
          :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state==1" type="success" size="mini">已通过</el-tag>
          <el-tag v-else-if="scope.row.state==2" type="warning" size="mini">审核中</el-tag>
          <el-tag v-else="scope.row.state==0" type="danger" size="mini">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" class="el-icon-zoom-in" @click="checkApply(scope.row)"
                     size="mini"></el-button>
          <el-button type="warning" class="el-icon-close" @click="rejectApply(scope.row.coachId)"
                     size="mini" :disabled="scope.row.state==0"></el-button>
          <el-button type="success" class="el-icon-check" @click="passApply(scope.row.coachId)"
                     size="mini" :disabled="scope.row.state==1"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="pagination" @getNewData="getCoachApply"></pagination>
    <coach-in-detail ref="CoachInDetail"></coach-in-detail>
  </card>
</template>

<script>
  import Pagination from '@/components/pagination'
  import CoachInDetail from './detail'
  import {
    getCoachApplyApi,
    rejectCoachApplyApi,
    passCoachApplyApi
  } from "@/api/coach_apply";
  import {objectEvaluate} from "@/utils/common";

  export default {
    components: {Pagination, CoachInDetail},
    data() {
      return {
        coachInData: [],
        isLoading: false,
        isLoadingButton: false,
        searchName: '',
        searchPhone: '',
        searchState: '',
        options: [
          {id: 1, label: '审核中', value: '2'},
          {id: 2, label: '未通过', value: '0'},
          {id: 3, label: '已通过', value: '1'}
        ]
      }
    },
    mounted() {
      this.getCoachApply()
    },
    methods: {
      // 获得教练入驻列表
      getCoachApply() {
        this.isLoading = true;
        let pagination = this.$refs.pagination.pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&realName=${this.searchName}&username=${this.searchPhone}&state=${this.searchState}`;
        getCoachApplyApi(param).then(result => {
          this.isLoading = false;
          let response = result.data.resultParm.coacheList;
          this.coachInData = response.records;
          this.coachInData.forEach(item => {
            item['position'] = `${item['province']} ${item['city']} ${item['area']}`;
          });
          pagination.total = response.total;
        })
      },
      // 查看详情
      checkApply(data) {
        let _this = this.$refs['CoachInDetail'];
        _this.dialogTableVisible = true;
        objectEvaluate(data, _this.form);
      },
      // 通过审核
      passApply(id) {
        this.$msgBox("确认通过该教练申请").then(() => {
          passCoachApplyApi(id).then(() => {
            this.getCoachApply()
          })
        })
      },
      // 拒绝审核
      rejectApply(id) {
        this.$msgBox("确认拒绝该教练申请").then(() => {
          rejectCoachApplyApi(id).then(() => {
            this.getCoachApply()
          })
        })
      }
    }
  }
</script>
