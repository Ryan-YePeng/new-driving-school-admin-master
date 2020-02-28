<template>
  <div>
    <div v-show="isShow">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>驾校列表</span>
        </div>
        <div>
          <el-input placeholder="搜索驾校名" v-model="schoolFullNameText" clearable style="width: 180px" size="mini"
                    @keyup.enter.native="getSchoolList"></el-input>
          <el-cascader
            size="mini"
            clearable
            placeholder="搜索位置"
            :props="{ checkStrictly: true }"
            :options="options"
            v-model="selectedOptions">
          </el-cascader>
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
            <el-table-column label="操作" align="center" width="90">
              <template slot-scope="scope">
                <el-button type="primary" @click="check(scope.row)" size="mini" class="el-icon-zoom-in"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination ref="pagination" @getNewData="getSchoolList"></pagination>
        </div>
      </el-card>
    </div>
    <div v-if="!isShow">
      <order @tab="tab" :schoolId="schoolId" :schoolName="schoolName"></order>
    </div>
  </div>
</template>

<script>
  import {
    getSchoolListApi
  } from "@/api/school";

  import {regionData} from 'element-china-area-data'
  import {CodeToText} from 'element-china-area-data'

  import Pagination from '@/components/pagination'
  import Order from './order'
  import {objectEvaluate} from "@/utils/common";

  export default {
    components: {Pagination, Order},
    data() {
      return {
        flag: '',
        isShow: true,
        schoolData: [],
        isLoading: false,
        schoolFullNameText: '',
        provinceNameText: '',
        cityNameText: '',
        areaNameText: '',
        options: regionData,
        selectedOptions: [],
        schoolId: 0,
        schoolName: ''
      }
    },
    mounted() {
      this.getSchoolList();
    },
    watch: {
      selectedOptions: function (array) {
        array = array.map(item => {
          return CodeToText[item]
        });
        let length = array.length;
        if (length === 0) {
          this.provinceNameText = '';
          this.cityNameText = '';
          this.areaNameText = '';
        } else if (length === 1) {
          this.provinceNameText = array[0];
          this.cityNameText = '';
          this.areaNameText = '';
        } else if (length === 2) {
          this.provinceNameText = '';
          this.cityNameText = array[1];
          this.areaNameText = '';
        } else {
          this.provinceNameText = '';
          this.cityNameText = '';
          this.areaNameText = array[2];
        }
      }
    },
    methods: {
      // 切换
      tab() {
        this.isShow = !this.isShow
      },
      // 获取列表
      getSchoolList() {
        this.flag = 'edit';
        this.isLoading = true;
        let pagination = this.$refs['pagination'].pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&schoolFullName=${this.schoolFullNameText}&provinceName=${this.provinceNameText}&cityName=${this.cityNameText}&areaName=${this.areaNameText}`;
        getSchoolListApi(param).then(result => {
          let response = result.data.resultParm.schoolList;
          this.schoolData = response.records;
          pagination.total = response.total;
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        });
      },

      // 查看驾校
      check(data) {
        this.schoolId = data.schoolId;
        this.schoolName = data.schoolFullName;
        this.isShow = !this.isShow;
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
