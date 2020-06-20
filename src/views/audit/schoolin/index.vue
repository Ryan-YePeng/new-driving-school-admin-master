<template>
  <card>
    <div slot="header">
      <el-input placeholder="搜索姓名" v-model="searchName" clearable style="width: 150px" size="mini"
                @keyup.enter.native="getSchoolApply"></el-input>
      <el-input placeholder="搜索手机号" v-model="searchPhone" clearable style="width: 150px" size="mini"
                @keyup.enter.native="getSchoolApply"></el-input>
      <el-input placeholder="搜索驾校全称" v-model="searchSchool" clearable style="width: 150px" size="mini"
                @keyup.enter.native="getSchoolApply"></el-input>
      <el-select v-model="searchState" placeholder="搜索审核状态" clearable size="mini" @change="getSchoolApply"
                 style="width: 150px">
        <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button type="success" class="el-icon-search" size="mini" @click="getSchoolApply"></el-button>
    </div>
    <el-table v-loading="isLoading" :data="schoolInData" max-height="100%" style="width: 100%">
      <el-table-column
          prop="realName"
          label="真实姓名">
      </el-table-column>
      <el-table-column
          prop="username"
          label="手机号"
          :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
          prop="schoolNature"
          label="驾校性质">
      </el-table-column>
      <el-table-column
          prop="schoolFullName"
          label="驾校全称"
          :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
          prop="schoolShortName"
          label="驾校简称">
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
          <el-button type="warning" class="el-icon-close" @click="rejectApply(scope.row.schoolId)"
                     size="mini" :disabled="scope.row.state==0"></el-button>
          <el-button type="success" class="el-icon-check" @click="passApply(scope.row.schoolId)"
                     size="mini" :disabled="scope.row.state==1"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="pagination" @getNewData="getSchoolApply"></pagination>
    <school-in-detail ref="SchoolInDetail"></school-in-detail>
  </card>
</template>

<script>
  import {objectEvaluate} from '@/utils/common'
  import Pagination from '@/components/pagination'
  import SchoolInDetail from './detail'
  import {
    getSchoolApplyApi,
    passSchoolApplyApi,
    rejectSchoolApplyApi
  } from "@/api/school_apply";

  export default {
    components: {Pagination, SchoolInDetail},
    data() {
      return {
        schoolInData: [],
        isLoading: false,
        isLoadingButton: false,
        searchName: '',
        searchPhone: '',
        searchSchool: '',
        searchState: '',
        options: [
          {id: 1, label: '审核中', value: '2'},
          {id: 2, label: '未通过', value: '0'},
          {id: 3, label: '已通过', value: '1'}
        ]
      }
    },
    mounted() {
      this.getSchoolApply()
    },
    methods: {
      // 获取驾校入驻列表
      getSchoolApply() {
        this.isLoading = true;
        let pagination = this.$refs.pagination.pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&realName=${this.searchName}&username=${this.searchPhone}&schoolFullName=${this.searchSchool}&state=${this.searchState}`;
        getSchoolApplyApi(param).then(result => {
          this.isLoading = false;
          let response = result.data.resultParm.schoolList;
          this.schoolInData = response.records;
          this.schoolInData.forEach(item => {
            item['position'] = `${item['province']} ${item['city']} ${item['area']}`;
          });
          pagination.total = response.total;
        })
      },
      // 查看详情
      checkApply(data) {
        let _this = this.$refs['SchoolInDetail'];
        _this.dialogTableVisible = true;
        objectEvaluate(data, _this.form);
      },
      // 通过审核
      passApply(id) {
        this.$msgBox("确认通过该驾校申请").then(() => {
          passSchoolApplyApi(id).then(() => {
            this.getSchoolApply()
          })
        })
      },
      // 拒绝审核
      rejectApply(id) {
        this.$msgBox("确认拒绝该驾校申请").then(() => {
          rejectSchoolApplyApi(id).then(() => {
            this.getSchoolApply()
          })
        })
      }
    }
  }
</script>
